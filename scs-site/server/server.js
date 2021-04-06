const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, '..', 'build')));


const PORT = 3001;
app.get('/entries', (req, res) => {

   
  });

app.post('/newpost', (req, res) => {

})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
