const express = require('express')
const app = express()
const port = 3000

// 設定路由
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.send('listing restaurants')
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