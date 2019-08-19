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
  var m = time.getMonth();
  var d = time.getDay();
  var date = y+"-"+m+"-"+d+"-";
  return date;
}

//데이터 확인 페이지
app.get('/',(req,res)=>{
  console.log('a');
  res.sendfile('index.html');
})


connection.connect(function(err) {
if (err) throw err;
console.log("con!");
})

/**
 * 
 * 클라이언트와 http통신하는 곳
 */

//스마트팜 대기습도
app.get('/smart_humid', (req,res) => {
  humid = req.query.humid;
  humid_date = req.query.humid_date;
  if(humid  && humid_date){
    console.log(req.query);
    
    console.log('humid : '+humid);
    console.log('humid_date : '+humid_date);
    connection.query('insert into smartfarm_humid (humid, date) values(?,?)',  
    [humid,humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
  else res.send("fail");
});

app.get('/smart_humid_temp_A', (req, res) => {
  var date = get_time();
  humid_date = date  + req.query.humid_date;
  humid = req.query.humid;
  temp = req.query.temp;

  if(humid && temp && humid_date){
    console.log(req.query);
    
    console.log('humid : '+ humid);
    console.log('humid_date : '+ temp);
    console.log('humid_date : '+ humid_date);
    connection.query('insert into smartfarm_humid_A (humid, date) values(?,?)',  
    [humid, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    connection.query('insert into smartfarm_temp_A (temp, date) values(?,?)',  
    [temp, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
  else res.send("fail");
});
app.get('/aqua_fish_data',(req,res)=>{
  var date = get_time();
  var aqua_date = date + req.query.date;
  var aqua_ec = req.query.ec;
  var aqua_do = req.query.do;
  var aqua_temp = req.query.wtemp;
  var aqua_ph = req.query.ph;
  connection.query('insert into aqua_fish_ec (ec, date) values(?,?)',
  [aqua_ec, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
  connection.query('insert into aqua_fish_wtemp (wtemp, date) values(?,?)',  
  [aqua_temp, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
  connection.query('insert into aqua_fish_do (do, date) values(?,?)',
  [aqua_do, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
  connection.query('insert into aqua_fish_ph (ph, date) values(?,?)',  
  [aqua_ph, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
})
app.get('/aqua_bio_data',(req,res)=>{
  var date = get_time();
  var aqua_date = date + req.query.date;
  var aqua_ec = req.query.ec;
  var aqua_do = req.query.do;
  var aqua_temp = req.query.wtemp;
  var aqua_ph = req.query.ph;
  connection.query('insert into aqua_bio_ec (ec, date) values(?,?)',
  [aqua_ec, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
  connection.query('insert into aqua_bio_wtemp (wtemp, date) values(?,?)',  
  [aqua_temp, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
  connection.query('insert into aqua_bio_do (do, date) values(?,?)',
  [aqua_do, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
  connection.query('insert into aqua_bio_ph (ph, date) values(?,?)',  
  [aqua_ph, aqua_date],
  (err, rows) => {
      if(err) console.log(err);
  })
})
app.get('/smart_humid_temp_B', (req, res) => {
  var date = get_time();
  humid_date = date  + req.query.humid_date;
  humid = req.query.humid;
  temp = req.query.temp;

  if(humid && temp && humid_date){
    console.log(req.query);
    
    console.log('humid : '+ humid);
    console.log('humid_date : '+ temp);
    console.log('humid_date : '+ humid_date);
    connection.query('insert into smartfarm_humid_B (humid, date) values(?,?)',  
    [humid, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    connection.query('insert into smartfarm_temp_B (temp, date) values(?,?)',  
    [temp, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    res.send("ok")
  }
  else res.send("fail");
});

app.get('/smart_humid_temp', (req, res) => {
  var date = get_time();
  
  humid_date = y+"-"+m+"-"+d+"-"+req.query.humid_date;
  
  humid = req.query.humid;
  temp = req.query.temp;
  
  if(humid && temp && humid_date){
    console.log(req.query);
    
    console.log('humid : '+ humid);
    console.log('humid_date : '+ temp);
    console.log('humid_date : '+ humid_date);
    connection.query('insert into smartfarm_humid (humid, date) values(?,?)',  
    [humid, humid_date],
    (err, rows) => {
        if(err) console.log(err);
    })
    connection.query('insert into smartfarm_temp (temp, date) values(?,?)',  
    [temp, humid_date],
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

//스마트팜 대기온도확인
app.get('/get_smarttemp', function(req,res){
  var json = new Object();
  connection.query('SELECT * FROM smartfarm_humid_A order by id desc limit 1',(err , rows)=>{
    // res.send(rows.humid)
    json.humid = rows.humid;
  });
  connection.query('SELECT * FROM smartfarm_temp_B order by id desc limit 1',(err , rows)=>{
    // res.send(rows.temp)
    json.humid = rows.temp;
  });
  return JSON.parse(json);
})
// 스마트팜 대기 온&습도
app.get('/get_smartfarmair', function(req,res){
  connection.query('SELECT * FROM smartfarm_temp order by id desc limit 1',(err , rows)=>{
    res.send(rows)
  });
  
})
//스마트팜 대기습도확인
app.get('/get_smarthumid', function(req,res){
  connection.query('SELECT * FROM smartfarm_humid order by id desc limit 1',(err , rows)=>{
    res.send(rows)
  });
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


app.listen(3000);