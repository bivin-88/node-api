const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectWithRetry = require('./db');
const Bear = require('./app/models/bear');

const app = express();
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
const router = express.Router();

router.use((req, res, next) => {
  console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/bears')
  .post((req, res) => {
    const bear = new Bear();
    bear.name = req.body.name;
    bear.save(err => {
      if (err) res.send(err);
      res.json({ message: 'Bear created!' });
    });
  })
  .get((req, res) => {
    Bear.find((err, bears) => {
      if (err) res.send(err);
      res.json(bears);
    });
  });

router.route('/bears/:bear_id')
  .get((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) res.send(err);
      res.json(bear);
    });
  })
  .put((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) res.send(err);
      bear.name = req.body.name;
      bear.save(err => {
        if (err) res.send(err);
        res.json({ message: 'Bear updated!' });
      });
    });
  })
  .delete((req, res) => {
    Bear.remove({ _id: req.params.bear_id }, err => {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

app.use('/api', router);

// CONNECT to MongoDB and START SERVER
  connectWithRetry()
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/api`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

