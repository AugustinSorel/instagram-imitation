import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

app.get("/health-check", (req, res) => {
  res.sendStatus(200);
});

// test
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
