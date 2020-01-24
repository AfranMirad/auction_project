var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.post('/', function(request, response) {
  const fiyat = request.body.fiyat;
  console.log(fiyat);
  response.json({ fiyat: fiyat })
//  response.send("tests"+fiyat);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
