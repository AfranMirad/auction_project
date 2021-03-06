const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const bidModel = require('./models/bid')
app.use(bodyParser.json());
app.use(cors())
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

//Teklif verilen fiyatları güncellemek için kullanılmaktadır.
app.post('/:id', function (request, response) {
  let bid = {};
  bid.bid_price = request.body.bid_price;
  bid.bid_date = new Date();
  let query = { _id: request.params.id }

  Bid.update(query, bid, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      response.json({ message: "İşlem Başarılı" });
    }
  });
});
//İlk çalıştırılacağı ortamarda kaydedilen ilk verilerdir.
app.get('/add', function (request, response) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  let bid = new bidModel();
  bid.user_name = "ali";
  bid.bid_price = 0;
  bid.bid_date = new Date();
  bid.deadline = tomorrow;
  bid.save(function (error) {
    if (error) {
      console.log(error);
      return;
    } else {
      let bid = new bidModel();
      bid.user_name = "veli";
      bid.bid_price = 0;
      bid.bid_date = new Date();
      bid.deadline = tomorrow;
      bid.save(function (error) {
        if (error) {
          console.log(error);
          return;
        } else {
          let bid = new bidModel();
          bid.user_name = "kazım";
          bid.bid_price = 0;
          bid.bid_date = new Date();
          bid.deadline = tomorrow;
          bid.save(function (error) {
            if (error) {
              console.log(error);
              return;
            } else {

            }
          });
        }
      });
    }
  });
});
//Uygulamada yeni bir açık artırma yapıldığında çağrılan 
//metodun içerisinde teklifler 0 olarak güncellenir.
app.get('/delete', function (request, response) {

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  Bid.find({}, function (err, bids) {
    if (err) {
      console.log(err);
    } else {
      bids.forEach(bid => {
        let biduser = {};
        biduser.bid_price = 0;
        biduser.deadline = tomorrow;
        let query = { _id: bid._id }
        Bid.update(query, biduser, function (err) {
          if (err) {
            console.log(err);
            return;
          } else {
          }
        });
      });
    }
  });
});
//Kaydedilen verilerden sonra çağrılan metoddur. Verileri yazar.
app.get('/', function (request, response) {
  Bid.find({}, function (error, bids) {
    if (error) {
      console.log(error);
    } else {
      response.json(bids);
    }
  })
});


app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})
