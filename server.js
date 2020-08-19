const express = require("express");
const app = express();
const port = 1010;
const axios = require("axios");
const parser = require("body-parser");

app.listen(port, () => console.log(`Listening At Port ${port}`));
app.use(express.static("public"));

// reviews server
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get("/reviews/users", (req, res) => {
  axios
    .get("http://localhost:3003/reviews/users")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.get("/reviews/houses", (req, res) => {
  axios
    .get("http://localhost:3003/reviews/houses")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.get("/reviews", (req, res) => {
  axios
    .get("http://localhost:3003/reviews")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.get("/reviews/comments", (req, res) => {
  axios
    .get("http://localhost:3003/reviews/comments")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

// gallery server

app.get("/properties/:id", (req, res) => {
  let id = req.params.id;
  axios
    .get(`http://localhost:3001/properties/${id}`)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

// calendar server

app.get("/rooms/:room_id/reservation", (req, res) => {
  let queryParams = req.params.room_id;
  axios
    .get(`http://localhost:3002/rooms/${queryParams}/reservation`)
    .then((data) => {
      console.log("Here in calendar");
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.post("/rooms/:room_id/reservation", (req, res) => {
  let queryParams = req.params.room_id;

  let reservation = {
    check_in: req.body.check_in,
    check_out: req.body.check_out,
  };

  axios
    .post(`http://localhost:3002/rooms/${queryParams}/reservation`, reservation)
    .then((data) => {
      console.log("Here in calendar");
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

// image carousel server

app.get("/suggestedListings", (req, res) => {
  app.get("http://localhost:3004/suggestedListings");
  axios
    .get(`http://localhost:3004/suggestedListings`)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});
