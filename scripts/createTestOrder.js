const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createTestOrder() {
  console.log('Creating test order...\n');
  
  // Sample order data
  const testOrder = {
    userId: 'test-user-123',
    userName: 'Test User',
    userEmail: 'test@example.com',
    stallId: 'wHkXYYGk8RNeBcb5rM5yRMINSPw1', // Replace with actual stall ID
    stallName: 'Lazeez Kathi Rolls',
   items: [
  {
    item: 'Cheese Dip',
    price: 40,
    prepTime: 1,  // Very short prep time
    quantity: 1
  }
],
    totalAmount: 600,
    status: 'preparing',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    orderNumber: `ORD-${Date.now()}`
  };
  
  try {
    // Create the order
    const orderRef = await db.collection('orders').add(testOrder);
    
    console.log('✅ Test order created successfully!');
    console.log(`Order ID: ${orderRef.id}`);
    console.log(`Order Number: ${testOrder.orderNumber}`);
    console.log(`\nOrder Details:`);
    console.log(`  - Stall: ${testOrder.stallName}`);
    console.log(`  - Items: ${testOrder.items.length}`);
    console.log(`  - Total Prep Time: ${testOrder.items.reduce((sum, item) => sum + item.prepTime, 0)} minutes`);
    console.log(`  - Status: ${testOrder.status}`);
    console.log(`\n📋 Expected behavior:`);
    console.log(`  1. Cloud Function "scheduleOrderReminder" should trigger automatically`);
    console.log(`  2. A Cloud Task will be scheduled for ${testOrder.items.reduce((sum, item) => sum + item.prepTime, 0) + 5} minutes from now`);
    console.log(`  3. After the prep time, order status will change to "ready_for_pickup"`);
    console.log(`\n🔍 Monitor the order:`);
    console.log(`  - Firebase Console: https://console.firebase.google.com/project/otp-demo-clean/firestore/data/orders/${orderRef.id}`);
    console.log(`  - Function Logs: Run "firebase functions:log" in your terminal`);
    console.log(`\n⏰ Check back in ${testOrder.items.reduce((sum, item) => sum + item.prepTime, 0) + 5} minutes to see if status changed!`);
    
    return orderRef.id;
  } catch (error) {
    console.error('❌ Error creating test order:', error);
    throw error;
  }
}

// Run the test
createTestOrder()
  .then(() => {
    console.log('\n✨ Test order creation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Failed to create test order:', error);
    process.exit(1);
  });