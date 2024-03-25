const express = require('express');
const path = require('path');
const PORT = 4000;
const HOST = '0.0.0.0';
const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const app = express();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')));
// 절대 경로
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
  console.log(`${req.method} ${req.baseUrl}${req.url}`);
})

app.get('/', (req,res) => {
  res.render('index', {
    imageTitle: 'it is a animal nong jang',
  })
})
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}...`)