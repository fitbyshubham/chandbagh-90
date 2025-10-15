const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to download this

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Read the restaurants JSON file
const restaurantsData = JSON.parse(fs.readFileSync('./restaurants.json', 'utf8'));

async function uploadRestaurants() {
  console.log('Starting restaurant data upload...');
  
  const batch = db.batch();
  let count = 0;
  
  for (const restaurant of restaurantsData.restaurants) {
    // Create a document ID from the restaurant name (lowercase, spaces replaced with hyphens)
    const docId = restaurant.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    console.log(`Adding restaurant: ${restaurant.name} (ID: ${docId})`);
    
    const restaurantRef = db.collection('restaurants').doc(docId);
    
    batch.set(restaurantRef, {
      name: restaurant.name,
      stallId: restaurant.stallId,
      image_url: restaurant.image_url,
      categories: restaurant.categories,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    count++;
    
    // Firestore batch limit is 500 operations
    if (count % 500 === 0) {
      console.log(`Committing batch of ${count} documents...`);
      await batch.commit();
    }
  }
  
  // Commit remaining documents
  if (count % 500 !== 0) {
    await batch.commit();
  }
  
  console.log(`✅ Successfully uploaded ${count} restaurants!`);
  console.log('\nRestaurant IDs created:');
  restaurantsData.restaurants.forEach(r => {
    const docId = r.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    console.log(`  - ${r.name}: ${docId}`);
  });
}

// Run the upload
uploadRestaurants()
  .then(() => {
    console.log('\n✨ Upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error uploading restaurants:', error);
    process.exit(1);
  });