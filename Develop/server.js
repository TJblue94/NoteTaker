const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app =  express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
//MIDDLEWARE

app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, contents) {
    var words = JSON.parse(contents);
    res.send(words);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json',(err, data) => {
    // Check for error
    if (err) throw err;
    // Handle data gathering for json update
    let json = JSON.parse(data);

    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    }
    // Add data to existing json array
    json.push(note);

    // Write updated json to array 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      // Check for error
      if (err) throw err;
      res.send('200');
    });
  });
});

app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('db/db.json',(err, data) => {
    // Check for error
    if (err) throw err;
    let deleteId = req.params.id;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    json = json.filter((note) => 
      note.id != deleteId
    );

    // Write updated json to array 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      if (err) throw err;
      res.send('200');
    });
  });

})


app.listen(PORT, function() {
  console.log("Uhhhhhh hello!? " + PORT);
});
