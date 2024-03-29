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
function get_time() {
  var time = new Date();
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var date = y+"-"+m+"-"+d+"-";
  return date;
}

//데이터 확인 페이지
app.get('/',(req,res)=>{
  console.log('a');
  res.sendfile('index.html');
})

app.get('/aqua',(req,res)=>{
  console.log('a');
  res.sendfile('aqua.html');
})


connection.connect(function(err) {
if (err) throw err;
console.log("con!");
})

/**
 * 
 * 클라이언트와 http통신하는 곳
 */

//박테리아통 데이터넣기
app.get('/aqua_bio_data',(req,res)=>{
  var date = get_time();
  var aqua_date = date + req.query.date;
  var aqua_ec = req.query.ec;
  var aqua_do = req.query.do;
  var aqua_wtemp = req.query.wtemp;
  var aqua_ph = req.query.ph;
  connection.query('insert into aqua_bio (ph, do, wtemp, ec, date) values(?,?,?,?,?)',
  [aqua_ph,aqua_do,aqua_ph,aqua_wtemp,aqua_ec, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
})

//물고기통 데이터넣기
app.get('/aqua_fish_data',(req,res)=>{
  var date = get_time();
  var aqua_date = date + req.query.date;
  var aqua_ec = req.query.ec;
  var aqua_do = req.query.do;
  var aqua_wtemp = req.query.wtemp;
  var aqua_ph = req.query.ph;
  connection.query('insert into aqua_fish (ph, do, wtemp, ec, date) values(?,?,?,?,?)',
  [aqua_ph,aqua_do,aqua_ph,aqua_wtemp,aqua_ec, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  });
  res.send("ok");
})

//스마트팜 데이터 넣기
app.get('/smart_humid_temp_A', (req, res) => {
  var date = get_time();
  humid_date = date  + req.query.date;
  humid = req.query.humid;
  temp = req.query.temp;

  if(humid && temp && humid_date){
    console.log(req.query);
    
    console.log('humid : '+ humid);
    console.log('humid_date : '+ temp);
    console.log('humid_date : '+ humid_date);
    connection.query('insert into smartfarm_a (humid,temp,date) values(?,?,?)',  
    [humid,temp, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
});

app.get('/smart_humid_temp_b', (req, res) => {
  var date = get_time();
  humid_date = date  + req.query.date;
  humid = req.query.humid;
  temp = req.query.temp;

  if(humid && temp && humid_date){
    console.log(req.query);
    
    console.log('humid : '+ humid);
    console.log('humid_date : '+ temp);
    console.log('humid_date : '+ humid_date);
    connection.query('insert into smartfarm_b (humid,temp,date) values(?,?,?)',  
    [humid,temp, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
  else res.send("fail");
});



/**
 * 
 * 받아온 데이터 보여줘
 */

//스마트팜a 대기온도확인
app.get('/get_smart_a', function(req,res){
  connection.query('SELECT * FROM smartfarm_a order by id desc limit 1',(err , rows)=>{
    res.send(rows)
  });
})

app.get('/get_smart_b', function(req,res){
  connection.query('SELECT * FROM smartfarm_b order by id desc limit 1',(err , rows)=>{
    res.send(rows)
  });
})

app.get('/get_aqau_bio', function(req,res){
  connection.query('SELECT * FROM aqua_bio order by id desc limit 1',(err, rows)=>{
    res.send(rows)
  })
})

app.get('/get_aqau_fish', function(req,res){
  connection.query('SELECT * FROM aqua_fish order by id desc limit 1',(err, rows)=>{
    res.send(rows)
  })
})

//접속테스트용
app.get('/test', (req,res) => {
    console.log(req.query.id);
    console.log("접속온당");
    if(req.query.id) res.send("값 O")
    res.send("값 X");
})


app.listen(3000);