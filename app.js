var express = require('express');
var app = express();
var api = require('api');
var bodyParser = require('body-parser');
var mysql = require('mysql');
// var expressWs = require('express-ws')(app);
// var customWss = expressWs.getWss('/');
// app.use('/api', api); // redirect API calls
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/bs', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jq', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/css')); // redirect CSS bootstrap
// app.use(express.static('/'));
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port     : 3306,
    database : 'vietnam'
  });

// var ipip = '192.168.1.114'
var ipip = '192.168.43.223'
app.all(('/*'), (req, res, next)=>{
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers","X-Requested-With");
next();
})

//데이터 확인 페이지
app.get('/aa',(req,res)=>{
  console.log('a');
  res.sendfile('index.html');
})

connection.connect(function(err) {
if (err) throw err;
console.log("con!");
})
//스마트팜 토양습도확인
app.get('/get_ph', function(req,res){
  // var humid = "asdf"
  connection.query('SELECT * FROM aqua_ph order by id desc limit 1',(err , rows)=>{
    console.log('con?')
    res.send(rows)
  });
  // console.log(humid);
  // res.send(humid);

})


//스마트팜 토양습도확인
app.get('/get_humid', function(req,res){
  // var humid = "asdf"
  connection.query('SELECT * FROM smart_soil_humid order by id desc limit 1',(err , rows)=>{
    console.log('con?')
    res.send(rows)
  });
  // console.log(humid);
  // res.send(humid);

})

//접속테스트용
app.get('/a', (req,res) => {
    console.log(req.query.id);
    console.log("접속온당");
    if(req.query.id) res.send("값 O")
    res.send("값 X");
});

//아쿠아포닉스 ph 데이터 저장
app.get('/aqua_ph', (req,res) => {
  console.log('test');
  ph = req.query.ph;
  ph_date = req.query.ph_date;
  if(req.query.ph && req.query.ph_date){
    console.log(req.query);
    
    console.log('ph : '+req.query.ph);
    console.log('date : '+req.query.ph_date);
    connection.query('insert into aqua_ph (ph, date) values(?,?)',  
    [ph,ph_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
  else res.send("fail");
});



//스마트팜 토양습도저장
app.get('/smart_humid', (req,res) => {
    console.log('test');
    humid = req.query.humid;
    humid_date = req.query.humid_date;
    if(req.query.humid && req.query.humid_date){
      console.log(req.query);
      
      console.log('humid : '+req.query.humid);
      console.log('humid_date : '+req.query.humid_date);
      connection.query('insert into smart_soil_humid (humid, date) values(?,?)',  
      [humid,humid_date],
      (err, rows) => {
          if(err) console.log(err);
      })
      res.send("ok")
    }
    else res.send("fail");
});





app.listen(3000);