const express = require("express");
const app = express();
const multer = require("multer");

//Define storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//upload object
const upload = multer({
  storage: storage,
  limits: { fileSize: 10240 },
});

// process /get request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// process /upload post request with error message
app.post("/upload", (req, res) => {
    upload.single("file")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            //res.end("Error uploading file.");
            res.status(500).send("Error uploading file.");
        }else if(err) {
            res.status(500).end("Unknown error Contact Admin");
        }
    console.log("post got");
    res.send("File uploaded");
    })
});

// server instance
app.listen(3000, () => console.log("Listening on port 3000"));
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
