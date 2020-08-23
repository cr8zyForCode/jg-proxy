const express = require("express");
const app = express();
const port = 8888;
const axios = require("axios");
const parser = require("body-parser");

app.listen(port, () => console.log(`Listening At Port ${port}`));
app.use("/rooms/:roomId", express.static("public"));

// reviews server
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get("/reviews/users", (req, res) => {
  axios
    .get("http://13.52.214.87:3003/reviews/users")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.get("/reviews/houses", (req, res) => {
  axios
    .get("http://13.52.214.87:3003/reviews/houses")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.get("/reviews", (req, res) => {
  axios
    .get("http://13.52.214.87:3003/reviews")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.get("/reviews/comments", (req, res) => {
  axios
    .get("http://13.52.214.87:3003/reviews/comments")
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

// gallery server

app.get("/properties/:id", (req, res) => {
  let room_id = req.params.id;
  axios
    .get(`http://18.191.221.206:3001/properties/${room_id}`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// calendar server

app.get("/rooms/:room_id/reservation", (req, res) => {
  let queryParams = req.params.room_id;
  axios
    .get(`http://3.134.88.239:3002/rooms/${queryParams}/reservation`)
    .then((data) => {
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
    .post(
      `http://3.134.88.239:3002/rooms/${queryParams}/reservation`,
      reservation
    )
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

// image carousel server

app.get("/suggestedListings", (req, res) => {
  axios
    .get("http://52.32.67.233:3004/suggestedListings")
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
