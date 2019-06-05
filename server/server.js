const express = require('express');
const fs = require('fs');
const cart = require('./cart')
const app = express();

app.use(express.json());
app.use('/', express.static('public'));

app.get('/api/catalog', (req, res) => {
  fs.readFile('server/db/catalog.json', 'utf8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  })
});

app.get('/api/basket', (req, res) => {
  fs.readFile('server/db/basket.json', 'utf8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  })
});
app.post('/api/cart', (req, res) => {
  fs.readFile('server/db/basket.json', 'utf8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: 'Can`t read file'}));
    } else {
      let newCart = cart.add(JSON.parse(data), req);
      fs.writeFile('server/db/basket.json', newCart, (err) =>{
        if(err){
          res.send(JSON.stringify({result: 0, text: 'Can`t write file'}));
        } else {
          res.send(JSON.stringify({result: 1, text: 'Success'}))
        }
      })
    }
  })
});
app.put('/api/cart/:id', (req, res) => {
  fs.readFile('server/db/basket.json', 'utf8', (err, data) => {
    if(err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: 'Can`t read file'}));
    } else {
      let newCart = cart.change(JSON.parse(data), req);
      fs.writeFile('server/db/basket.json', newCart, (err) =>{
        if(err){
          res.send(JSON.stringify({result: 0, text: 'Can`t write file'}));
        } else {
          res.send(JSON.stringify({result: 1, text: 'Success'}))
        }
      })
    }
  })
});
app.delete('/api/cart/:id', (req, res) => {
  fs.readFile('server/db/basket.json', 'utf8', (err, data) => {
    if(err) {
      res.send(JSON.stringify({result: 0, text: 'can`t read file'}));
    } else {
      let newCart = cart.del(JSON.parse(data), req);
      fs.writeFile('server/db/basket.json', newCart, (err) => {
        if(err){
          res.send(JSON.stringify({result: 0, text: 'Can`t write file'}));
        } else {
          res.send(JSON.stringify({result: 1, text: 'success!'}))
        }
      })
    }
  })
})

app.listen(3000, () => console.log("express started!"));