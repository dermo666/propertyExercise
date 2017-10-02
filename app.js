const express = require('express');
const bodyParser = require('body-parser');

const responseFilter = require('./response-filter');

const app = express();

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Could not decode request: ' + err
  });
});

app.post('/', (req, res) => {
  let result = {
    response: responseFilter(req.body.payload)
  };

  res.status(200).json(result);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('app listening on port 3000!');
});
