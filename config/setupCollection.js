require('dotenv').config();
const connectDB = require('./db');
const mongoose = require('mongoose');
const models = require('../models');  // import all models

async function setupCollections() {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return;
  }

  try {
    for (const modelName in models) {
      const model = models[modelName];
      if (model && model.createCollection) {
        await model.createCollection();
        console.log(`${model.modelName} collection created or already exists.`);
      }
    }
  } catch (error) {
    console.error('Error creating collections:', error);
  } finally {
    await mongoose.disconnect();
  }
}

setupCollections();