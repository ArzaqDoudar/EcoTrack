import express from 'express';
import admin from 'firebase-admin';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Initialize Firebase Admin SDK with the service account key
import serviceAccount from './advanced-software-55b6f-firebase-adminsdk-nkk71-e761ad4df0.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger UI
const swaggerDocument = YAML.load('./swagger.yaml'); // Update the path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route to send FCM alert
app.post('/send-alert', (req, res) => {
  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  // Construct the FCM payload
  const payload = {
    notification: {
      title,
      body,
    },
  };

  // Send the FCM message
  admin.messaging().sendToDevice(token, payload)
    .then((response) => {
      console.log('FCM Alert Sent:', response);
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error('Error sending FCM Alert:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
