exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate() // truncate resets id back to 1
    .then(function() {
      const cars = [
        {
          VIN: "123456789",
          Make: "Mazda",
          Model: "RX-8",
          Mileage: 123456,
          Transmission: "Manual",
          Title: "Clean"
        },
        {
          VIN: "987654321",
          Make: "Mazda",
          Model: "RX-7",
          Mileage: 76654,
          Transmission: "Manual",
          Title: "Salvage"
        },
        {
          VIN: "678054321",
          Make: "Mazda",
          Model: "Miata",
          Mileage: 45676,
          Transmission: "Manual",
          Title: "Clean"
        }
      ];
      // Inserts seed entries
      return knex("cars").insert(cars);
    });
};

// To make this file:
// knex seed:make 001-cars

// To implement file:
// knex migrate:latest
// knex seed:run