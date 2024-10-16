
import mongoose from "mongoose"
mongoose.connect(process.env.DB!).catch((err: any) => {
  console.log(`${err} Error connecting to db`);
});
const db = mongoose.connection;

db.on("open", function () {
  console.log("Mongoose connection open");
});
