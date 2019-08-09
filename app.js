var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
// var expressWs = require('express-ws')(app);
// var customWss = expressWs.getWss('/');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dnjs2310!@',
    port     : 3306,
    database : 'test1'
  });
app.all(('/*'), (req, res, next)=>{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers","X-Requested-With");
next();
});
connection.connect(function(err) {
if (err) throw err;
console.log("con!");
})


app.get('/get_humid', function(req,res){
  // var humid = "asdf"
  connection.query('SELECT * FROM SMARTFARMTEST order by No desc limit 1',(err , rows)=>{
    res.send(rows)
  });
  // console.log(humid);
  // res.send(humid);

})

app.get('/a', (req,res) => {
    console.log(req.query.id);
    if(req.query.id) res.send("값 O")
    res.send("값 X");
});


app.post('/humid_p', function(req, res, next) {
    console.log(req.body);

    var humid = req.body.humid;
    var humid_date = req.body.humid_date;
    connection.beginTransaction( (err)=>{
      if(err) console.log(err);
      connection.query('insert into humid (humid, humid_date) values(?,?)',
      [humid,humid_date],
      (err, rows) => {
        if(err){
          console.log(err);
          connection.rollback(()=>{
            console.error('rollback');           
          })
        }
      }
      )
    })
    res.send("ok");
});





app.get('/humid', (req,res) => {
    console.log('test');
    humid = req.query.humid;
    humid_date = req.query.humid_date;
    console.log('humid : '+req.query.humid);
    console.log('humid_date : '+req.query.humid_date);
    if(req.query.humid && req.query.humid_date){
      connection.query('insert into humid (humid, humid_date) values(?,?)',
      [humid,humid_date],
      (err, rows) => {
          if(err) console.log(err);
      })
      res.send("ok")
    }
    else res.send("fail");
});



app.get('/humid2', (req,res) => {
  console.log('test');
  humid = req.query.humid;
  console.log('humid : '+req.query.humid);
  // console.log('humid_date : '+req.query.humid_date);
  if(req.query.humid){
    connection.query('insert into smartfarmtest (humid) values(?)',
    [humid],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
  else res.send("fail");
});



app.listen(3000);