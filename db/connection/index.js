const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    process.env.DB_NAME,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected successfully to server");
      }
    }
  );
};

module.exports = connectDB;
