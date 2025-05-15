const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get('/api/analytics', async (req, res) => {
  const snapshot = await db.collection('analytics').doc('stats').get();
  res.json(snapshot.data());
});