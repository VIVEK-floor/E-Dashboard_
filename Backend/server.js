const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/artisanhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.get('/', (req, res) => res.send('API Running'));


const users = [
  {id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin'},
  {id: 2, email: 'artisan@example.com', password: 'artisan123', role: 'artisan'}
];

app.post('/api/login', (req, res) => {
  const {email, password} = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if(user) {
    res.json({user});
  } else {
    res.status(401).json({error: 'Invalid credentials'});
  }
});


const products = [
  {id: 1, name: 'Handmade Pot', artisan: 'John', price: 25, stock: 10},
  {id: 2, name: 'Woven Basket', artisan: 'Sarah', price: 35, stock: 5},
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));