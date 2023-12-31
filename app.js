const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurants.json").results;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
// 使用 static files
app.use(express.static("public"));

// 設定路由
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  res.render("index", { restaurants: restaurants });
});

// 查詢路由
app.get("/search", (req, res) => {
  const keyword = req.query.keyword?.trim();
  const matchRestaurants = keyword
    ? restaurants.filter((rr) =>
        Object.values(rr).some((property) => {
          if (typeof property === "string") {
            return property
              .toLocaleLowerCase()
              .includes(keyword.toLocaleLowerCase());
          }
          return false;
        })
      )
    : restaurants;
  res.render("index", { restaurants: matchRestaurants, keyword });
});

// 設定動態路由
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((rr) => rr.id.toString() === id);
  res.render("show", { restaurant });
});

// 設定執行伺服器時， CLI 要執行的動作
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
