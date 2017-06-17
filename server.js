var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:data", function (request, response) {
  response.send(processData(request.params.data));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function processData(data){
  var date;
  if (isNaN(parseInt(data))){
    date = new Date(data);
  } else {
    date = new Date(parseInt(data) * 1000);
  }
  var obj = { unix: null, natural: null }
  if (isNaN(date.getTime())){
    return obj
  }
  obj.unix = date.getTime() / 1000;
  obj.natural = date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
  return obj;
}