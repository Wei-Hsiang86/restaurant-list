const express = require('express')
const { engine } = require('express-handlebars');
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
// 使用 static files
app.use(express.static('public'));

// 設定路由
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index')
})

// 設定動態路由
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  res.send(`read restaurant: ${id}`);
});

// 設定執行伺服器時， CLI 要執行的動作
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})