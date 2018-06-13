var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  // TODO: Add links to index.html so users can navigate
  res.sendFile(__dirname + '/static/html/index.html');
});

app.get('/skills', function (req, res) {
  var skills = fs.readFileSync('./data.json');
  skills = JSON.parse(skills);
  // TODO: Render this array of skills into an EJS template
  res.render('skills', {skills: skills});
});

// TODO: Add GET route that returns static page containing a form
app.get('/skills/new', function (req, res) {
  res.sendFile(__dirname + '/static/html/new.html');
});

// TODO: Add POST route that writes new skill to the file, redirects to skills index
app.post('/skills', function (req, res) {
  // read the data file
  var skills = fs.readFileSync('./data.json');
  // turn it into an object (parse)
  skills = JSON.parse(skills);
  // add the new skill to the array (push)
  skills.push({ name: req.body.name, level: req.body.level });
  // write the object back to the file
  fs.writeFileSync('./data.json', JSON.stringify(skills));
  // redirect to skills list page 
  res.redirect('/skills');
});
// TODO: Form should have action='/skills' and method='POST'

app.listen(process.env.PORT || 3000);