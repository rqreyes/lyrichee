const mongoose = require('mongoose');

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to database');
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
