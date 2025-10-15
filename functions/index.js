const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onRequest } = require('firebase-functions/v2/https');

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Initialize Cloud Tasks
let client;
try {
  const { CloudTasksClient } = require('@google-cloud/tasks');
  client = new CloudTasksClient();
} catch (error) {
  console.error('Failed to initialize Cloud Tasks:', error);
  console.error('Make sure to run: npm install @google-cloud/tasks in the functions directory');
}

// Name of the queue (create this in Google Cloud Console)
const LOCATION_ID = 'us-central1'; // Replace with your preferred location
const PROJECT_ID = process.env.GCLOUD_PROJECT; // Automatically set by Firebase
const QUEUE_ID = 'order-reminders'; // Must match the queue name you create

// --- Scheduled Task Function ---
exports.sendOrderReadyReminder = onRequest(async (req, res) => {
  const { orderId, stallName } = req.body;
  
  console.log(`Processing reminder for order ID: ${orderId}`);
  
  try {
    const orderDoc = await db.collection('orders').doc(orderId).get();
    
    if (!orderDoc.exists) {
      console.error(`Order document ${orderId} not found.`);
      res.status(404).send('Order not found');
      return;
    }
    
    const orderData = orderDoc.data();
    
    await db.collection('orders').doc(orderId).update({
      status: 'ready_for_pickup',
      reminderSentAt: new Date()
    });
    
    console.log(`Order ${orderId} status updated to 'ready_for_pickup'`);
    res.status(200).send(`Reminder processed for order ${orderId}`);
  } catch (error) {
    console.error('Error processing reminder:', error);
    res.status(500).send('Error processing reminder');
  }
});

// --- Trigger Function ---
exports.scheduleOrderReminder = onDocumentCreated('orders/{orderId}', async (event) => {
  const orderData = event.data.data();
  const orderId = event.params.orderId;
  
  console.log(`New order created: ${orderId}`);
  
  if (!orderData || orderData.status !== 'preparing') {
    console.log('Order is not in preparing status, skipping reminder scheduling');
    return null;
  }
  
  if (!client) {
    console.error('Cloud Tasks client not initialized');
    return null;
  }
  
  try {
    // Calculate estimated preparation time
    let totalPrepTime = 0;
    if (orderData.items && Array.isArray(orderData.items)) {
      orderData.items.forEach(item => {
        totalPrepTime += (item.prepTime || 10); // Default to 10 minutes if not specified
      });
    } else {
      totalPrepTime = 15; // Default total prep time
    }
    
    // Add 5 minutes buffer
    const reminderDelayMinutes = totalPrepTime + 5;
    const reminderDelaySeconds = reminderDelayMinutes * 60;
    
    console.log(`Scheduling reminder for ${reminderDelayMinutes} minutes from now`);
    
    // Get the function URL (actual deployed function URL)
    const functionUrl = 'https://us-central1-otp-demo-clean.cloudfunctions.net/sendOrderReadyReminder';
    
    // Create Cloud Task
    const parent = client.queuePath(PROJECT_ID, LOCATION_ID, QUEUE_ID);
    
    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url: functionUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        body: Buffer.from(
          JSON.stringify({
            orderId: orderId,
            stallName: orderData.stallName || 'Unknown Stall',
          })
        ).toString('base64'),
      },
      scheduleTime: {
        seconds: Math.floor(Date.now() / 1000) + reminderDelaySeconds,
      },
    };
    
    const [response] = await client.createTask({ parent, task });
    
    console.log(`Task created: ${response.name}`);
    
    // Update order with scheduled reminder info
    await db.collection('orders').doc(orderId).update({
      reminderScheduled: true,
      reminderScheduledFor: new Date(Date.now() + reminderDelaySeconds * 1000),
      estimatedPrepTime: totalPrepTime,
    });
    
    return { success: true, taskName: response.name };
  } catch (error) {
    console.error('Error scheduling reminder:', error);
    
    // Update order to indicate scheduling failed
    await db.collection('orders').doc(orderId).update({
      reminderScheduled: false,
      reminderScheduleError: error.message,
    });
    
    return { success: false, error: error.message };
  }
});

// --- Optional: Manual trigger for testing ---
exports.testOrderReminder = onRequest(async (req, res) => {
  const { orderId } = req.query;
  
  if (!orderId) {
    res.status(400).send('Missing orderId parameter');
    return;
  }
  
  try {
    await db.collection('orders').doc(orderId).update({
      status: 'ready_for_pickup',
      reminderSentAt: new Date(),
    });
    
    res.status(200).send(`Test reminder sent for order ${orderId}`);
  } catch (error) {
    console.error('Error sending test reminder:', error);
    res.status(500).send('Error sending test reminder');
  }
});