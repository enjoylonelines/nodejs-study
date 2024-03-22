const express = require('express');
const PORT = 4000;
const HOST = '0.0.0.0';
const Users = [
  { 
    id: 0,
    nama: 'Jack',
  },
  {
    id: 1,
    name: 'Jennifer',
  }
]

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
})
app.get('/users', (req, res) => {
  res.send(Users);
})
app.post('/users', (req,res) => {
  if(!req.body.name) {
    return res.status(400).json({
      error: "Missing user name",
    })
  }

  const newUser = {
    name: req.body.name,
    id: Users.length
  }
  Users.push(newUser);
  res.json(newUser); 
})
app.get('/users/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const user = Users[userId];
  console.log(user)
  if(user) app.send(res.json(user));
  else res.sendStatus(404);
})

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}...`)