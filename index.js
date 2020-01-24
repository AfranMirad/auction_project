const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
const config = require('./config/database');
let Bid = require('./models/bid')
//Database Connection
mongoose.connect(config.database);
let db = mongoose.connection;
db.once('open', function () {
  console.log('Connected to MongoDB');
});
db.on('error', function (err) {
  console.log(err);
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.post('/', function (request, response) {
  const user_name = request.body.user_name;
  const bid_price = request.body.bid_price;
  //const bid_date = request.body.bid_date;
  //const deadline = request.body.deadline;
  //response.json({ user_name: user_name, bid_price: bid_price, bid_date: bid_date, deadline: deadline })

  let bid = new Bid();
  bid.user_name = user_name;
  bid.bid_price = bid_price;
  bid.bid_date = new Date();
  bid.deadline = new Date();
  bid.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      response.json({ message: "İşlem Başarılı" });
    }
  });
});

app.get('/', function (request, response) {
  Bid.find({}, function (error, bids) {
    if (error) {
      console.log(error);
    } else {
      response.json({ message: bids });
    }
  })
});


app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})
