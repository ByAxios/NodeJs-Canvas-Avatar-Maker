const express = require("express");
let http = require("http");
const app = express();
const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const port = 4000;
let server = http.createServer(app);


//middlewre
app.use(express.json());

app.get('/:name?', function (req, res) {
  const queries = req.query.name;

  let arr = queries.split(" ");

  let name = arr[0].charAt(0).toUpperCase();
  let surname = arr[1].charAt(0).toUpperCase();

  const width = 300;
  const height = 300;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  loadImage("./coffe.jpg").then((image) => {
    context.drawImage(image, 0, 0);

    registerFont('comic.ttf', { family: 'Comic Sans' })
    context.font = "55pt Comic Sans";
    context.textAlign = 'center';
    context.fillText(name + surname, 148, 250);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
    res.sendFile(__dirname + '/image.png');
  });

});


server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});
