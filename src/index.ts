import express from "express";
import path from "path";
import router from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./utils/connectToMongoDB.util";
import apiError from "./middlewares/apiError.middleware";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", router);
app.use(apiError);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  connectToMongoDB();
});
