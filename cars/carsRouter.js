const express = require("express");

// This grants database access using Knex
const db = require("../data/dbConfig.js");

const router = express.Router();

// This POST creates a new car
router.post("/", (request, response) => {
  db("cars")
    .insert(request.body, "id")
    .then(ids => {
      return getById(ids[0]).then(inserted => {
        response.status(201).json(inserted);
      });
    })
    .catch(error => {
      console.log("This is error in router.post: ", error);
      response.status(500).json({ error: "Error adding car" });
    });
});

// This GET retrieves a list of all cars
router.get("/", (request, response) => {
  db.select("*")
    .from("cars")
    .then(cars => {
      console.log("This is cars from router.get: ", cars);
      response.status(200).json(cars);
    })
    .catch(error => {
      console.log("This is error from router.get: ", error);
      response.status(500).json({ error: "Error retrieving cars" });
    });
});

// This GET retrieves a specified car
router.get("/:id", (request, response) => {
  const id = request.params.id;
  db.select("*")
    .from("cars")
    .where({ id: id })
    .then(car => {
      console.log("This is car from router.get(id): ", car);
      response.status(200).json(car);
    })
    .catch(error => {
      console.log("This is error in router.get(id): ", error);
      response.status(500).json({ error: "Error retrieving car" });
    });
});

// This PUT updates a specified car
router.put("/:id", (request, response) => {
  const id = request.params.id;
  db("cars")
    .where({ id: id })
    .update(request.body)
    .then(count => {
      console.log("This is count: ", count);
      return getById(id).then(updated => {
        response.status(200).json(updated);
      });
    })
    .catch(error => {
      console.log("This is error in router.put: ", error);
      response.status(500).json({ error: "Error updating car" });
    });
});

// This DELETE sends a specified car to the lava pits
router.delete("/:id", (request, response) => {
  const id = request.params.id;
  db("cars")
    .where({ id: id })
    .del()
    .then(count => {
      response
        .status(200)
        .json({ message: "This car now sits in a black hole" });
    })
    .catch(error => {
      console.log("This is error from router.delete: ", error);
      response.status(500).json({ error: "Error obliterating car" });
    });
});

module.exports = router;

function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}
