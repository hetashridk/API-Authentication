import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const APIURL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const Username = "HetashriK";
const Password = "HK";
const APIKey = "b65f2150-6375-4e29-baad-016abaa00914";
const Token = "d0972a43-aa27-4cf3-9f94-9ed56acad04d";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(APIURL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(APIURL + "/all?page=2",
      {
        auth: {
          username: Username,
          password: Password,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(APIURL + "/filter", {
      params: {
        score: 5,
        apiKey: APIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

const config = {
  headers: { Authorization: `Bearer ${Token}` },
};

app.get("/token", async (req, res) => {
  try {
    const result = await axios.get(APIURL + "/secrets/1", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
