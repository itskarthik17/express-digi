import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

let coffeeData = [];
let nextId = 1;

app.post("/coffee", (req, res) => {
  const { name, price } = req.body;
  const newCoffee = { id: nextId++, name, price };
  coffeeData.push(newCoffee);
  res.status(201).send(newCoffee);
});

app.get("/coffee", (req, res) => {
  res.status(200).send(coffeeData);
});

app.get("/coffee/:id", (req, res) => {
  const coffee = coffeeData.find((c) => c.id === parseInt(req.params.id));
  if (!coffee) {
    return res.status(404).send("Coffee Not FOund");
  }
  res.status(200).send(coffee);
});

app.put("/coffee/:id", (req, res) => {
  const coffee = coffeeData.find((c) => c.id === parseInt(req.params.id));
  if (!coffee) {
    return res.status(404).send("Coffee Not FOund");
  }

  const { name, price } = req.body;
  coffee.name = name;
  coffee.price = price;
  res.status(200).send(coffee);
});

app.delete("/coffee/:id", (req, res) => {
  const coffeeIndex = coffeeData.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (coffeeIndex === -1) {
    return res.status(404).send("coffee Not Found");
  }
  coffeeData.splice(coffeeIndex, 1);
  return res.status(200).send("Deleted Successfully");
});

app.listen(port, () => {
  console.log(`server is running in ${port}.....`);
});
