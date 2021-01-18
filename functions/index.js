const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');

const express = require('express');
const { createApi } = require('unsplash-js');

// Firebase
const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp();
const db = firebaseAdmin.firestore();

// ExpressJS
const cors = require('cors')({
  origin: [
    'http://localhost:3000',
    'https://wemo-image-repository.web.app',
  ],
});
const app = express();
app.use(cors);

const unsplash = createApi({
  accessKey: functions.config().unsplash.access_key,
  fetch: nodeFetch,
});

const handleResponseError = (result, res) => {
  if (result.errors) {
    res.statusMessage = result.errors[0];
    res.status(400).end();
  }
};

const handleServerError = (error, res) => {
  console.log(error);
  res.statusMessage = 'A server error occurred';
  res.status(500).end();
};

exports.api = functions.https.onRequest(app);

app.get('/image', (req, res) => {
  const searchQuery = req.query.search;
  unsplash.search
    .getPhotos({ query: searchQuery })
    .then(result => {
      handleResponseError(result, res);
      res.json(result.response);
      res.end();
    })
    .catch(err => handleServerError(err, res));
});

app.get('/store', (req, res) => {
  db.collection('images')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()
    .then(storeImages => {
      let images = [];
      storeImages.forEach(doc => {
        images.push({
          id: doc.id,
          thumbnail: doc.data().thumbnail,
        });
      });
      res.json(images);
      res.end();
    })
    .catch(err => handleServerError(err, res));
});

app.post('/store', (req, res) => {
  if (req.body.id.trim() === '') {
    return res.status(400).json({ id: 'Image id must not be empty' });
  }
  if (req.body.thumbnail.trim() === '') {
    return res
      .status(400)
      .json({ thumbnail: 'Image thumbnail must not be empty' });
  }
  const { id, thumbnail } = req.body;
  const newStoreImage = { thumbnail, createdAt: new Date().toISOString() };
  db.collection('images')
    .doc(id)
    .set(newStoreImage)
    .then(doc => {
      return res.json(doc);
    })
    .catch(err => {
      handleServerError(err, res);
    });
});

app.delete('/store/:image_id', (req, res) => {
  const imageId = req.params.image_id;

  db.collection('images')
    .doc(imageId)
    .delete()
    .then(response => handleResponseError(response, res))
    .catch(err => handleServerError(err));
});
