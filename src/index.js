import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
    res.send("Hello World!");
})

// mongoose.connect("mongodb://localhost:27017/notebook-api", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//     console.log("Connected successfully");
// }); 

app.listen(3000, () => console.log("Server started on port 3000"));