import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import apiError from "./middlewares/apiError.middleware";
import deserializeUser from "./middlewares/deserializeUser";
import router from "./routes";
import connectToMongoDB from "./utils/connectToMongoDB.util";
import deployToProduction from "./utils/deployToProduction.util";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(deserializeUser);
app.use("/api", router);
app.use(apiError);

deployToProduction(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  connectToMongoDB();
});
