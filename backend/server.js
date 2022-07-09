const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Bajando el server debido a una excepción no atrapada`);

  process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecing to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server corriendo en http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Bajando el server debido a un rechazo de promesa no manejada`);

  server.close(() => {
    process.exit(1);
  });
});
