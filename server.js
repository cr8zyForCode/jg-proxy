const express = require("express");
const app = express();
const port = 8888;
const axios = require("axios");
const parser = require("body-parser");
const cors = require("cors");


app.listen(port, () => console.log(`Listening At Port ${port}`));
app.use("/rooms/:roomId", express.static("public"));

// reviews server
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

//get request goes to the load balancer. for public files

// app.get("/reviews/users", (req, res) => {
//   axios
//     .get("http://13.52.214.87:3003/reviews/users")
//     .then((data) => {
//       res.status(200).send(data.data);
//     })
//     .catch(() => {
//       res.status(404);
//     });
// });

// app.get("/reviews/houses", (req, res) => {
//   axios
//     .get("http://13.52.214.87:3003/reviews/houses")
//     .then((data) => {
//       res.status(200).send(data.data);
//     })
//     .catch(() => {
//       res.status(404);
//     });
// });

// app.get("/reviews", (req, res) => {
//   axios
//     .get("http://13.52.214.87:3003/reviews")
//     .then((data) => {
//       res.status(200).send(data.data);
//     })
//     .catch(() => {
//       res.status(404);
//     });
// });

// app.get("/reviews/comments", (req, res) => {
//   axios
//     .get("http://13.52.214.87:3003/reviews/comments")
//     .then((data) => {
//       res.status(200).send(data.data);
//     })
//     .catch(() => {
//       res.status(404);
//     });
// });

// // gallery server
//`http://54.67.118.99/properties/${queryParams}/`
//`http://54.215.247.145/properties/${room_id}`
// app.get("/properties/:id", (req, res) => {
//   // let room_id = String(req.params.id);
//   let queryParams = String(req.params.id);

//   axios
//     .get(`http://54.67.118.99/properties/${queryParams}`)
//     .then((response) => {
//       console.log('hello nim', response.data)
//       res.status(200).send(response.data);
//     })
//     .then(() => {
//       // let queryParams = req.params.id;
//       // let room_id = req.params.id;
//       // axios
//       //   .get(`http://54.215.247.145/properties/${room_id}`)
//       //   .then((data) => {
//       //     res.status(200).send(data.data);
//       //   })
//       //   .catch(() => {
//       //     res.status(404);
//       //   });
//     })
//     .catch((err) => {
//       console.log('there is an error')
//       res.status(400).send(err);
//     });
// });

// app.get("/properties/:id/images", (req, res) => {
//   let id = String(req.params.id);
//   axios
//     .get(`http://54.67.118.99/properties/${id}/images`)
//     .then((data) => {
//       console.log('images', data)
//       res.status(200).send(data.data);
//     })
//     .catch(() => {
//       console.log('error');
//       res.status(404);
//     });
// })
//WORKING SOLUTION FOR CALENDAR
// let queryParams = req.params.id;
// let room_id = req.params.id;
// axios
//   .get(`http://54.215.247.145/properties/${room_id}`)
//   .then((data) => {
//     res.status(200).send(data.data);
//   })
//   .catch(() => {
//     res.status(404);
//   });

// // calendar server

app.get("/properties/:id", (req, res) => {
  let queryParams = req.params.id;
  axios
    .get(`http://54.215.247.145/properties/${queryParams}`)
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

app.post("/reservations/:id", (req, res) => {
  let queryParams = req.params.room_id;
  let reservation = {
    check_in: req.body.check_in,
    check_out: req.body.check_out,
  };

  axios
    .post(
      `http://54.67.118.99/reservations/${queryParams}`,
      reservation
    )
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch(() => {
      res.status(404);
    });
});

// // image carousel server

// app.get("/suggestedListings", (req, res) => {
//   axios
//     .get("http://52.32.67.233:3004/suggestedListings")
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });
