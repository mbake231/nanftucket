// server/index.js
//var cords = require('./data/ack_scon_enrich.json');
var cords = require('./data/ack_scon_enrich_dedupe_ranked.json');

const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/cords", (req, res) => {

    res.header("Content-Type",'application/json');
  res.send(JSON.stringify(cords));
  });


  app.get("/ack", (req, res) => {
    
  if(req.query.id && req.query.id.length==5)
   for (var i =0; i<cords.features.length;i++)
      if(cords.features[i].properties.id===req.query.id){
        res.send(JSON.stringify(cords.features[i])); 
      }
      res.end();
    });
