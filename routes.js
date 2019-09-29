const express = require("express");
const fs = require("fs");
const multer = require("multer");

const upload = multer({ dest: __dirname + "/public/images" });
const router = express.Router();

router.get("/", (req, res) => {
  res.render("main/index");
});

router.post("/submit", upload.single("file"), (req, res) => {
  const fileName = req.file.originalname;
  const staticUrl = "/public/images/" + Date.now() + "-" + fileName;
  const saveDir = __dirname + staticUrl;

  fs.rename(req.file.path, saveDir, err => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      const { body } = req;

      body.picture = staticUrl;
      body.fileName = fileName;

      res.render("main/profile", { body });
    }
  });
});

module.exports = router;
