const express = require('express');

const carsRouter = require("./cars/carsRouter");

const server = express();

server.use(express.json());

server.use('/api/cars', carsRouter);

server.get("/", (request, response) => {
    response.send("Let's go");
  });

module.exports = server;