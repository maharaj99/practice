const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://Redprism:1234@cluster0.etnq3hr.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
