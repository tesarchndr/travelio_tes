const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());

//connect database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect db"))
  .catch((err) => {
    console.log(`gagal connect, ${err.message}`);
    process.exit();
  });

const favorite = require("./app/controllers/favorite.controller");

app.get("/", favorite.findAll);
app.post("/", favorite.create);
app.delete("/:id", favorite.delete);

const port = 3123;
app.listen(port, () => console.log("jalaannnn"));
