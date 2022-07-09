const mongoose = require("mongoose");

//https://www.mongodb.com/community/forums/t/option-usecreateindex-is-not-supported/123048
const connectDatabase = () => {
  mongoose
    .connect(process.env.URL_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
