import express from "express";
import path from "path";
import router from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./utils/connectToMongoDB.util";
import apiError from "./middlewares/apiError.middleware";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use((req, _, next) => {
  const accessToken = req.cookies.accessToken;

  try {
    const data = verify(
      accessToken,
      "60c011f29ac46ed8195c2ef4afc44ee8c34fdba9d576846e2a631e6ea4376817"
    ) as any;

    (req as any).userId = data.userId;
  } catch {}
  next();
});

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
