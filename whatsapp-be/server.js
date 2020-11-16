// *** IMPORTS ***
import express from "express";
import mongoose from "mongoose"; // client connecting to db
// import Messages from "./dbMessages.js";
import Rooms from "./dbRooms.js";
// import Pusher from "pusher";
import cors from "cors";

// *** APP CONFIG ***
const app = express();
const port = process.env.PORT || 9000;

// const pusher = new Pusher({
//   appId: "1094157",
//   key: "447ac9a1d3bfa749aae4",
//   secret: "c897bfb7251018302900",
//   cluster: "us3",
//   encrypted: true,
// });

// *** MIDDLEWARE ***
app.use(express.json());
app.use(cors());

// ** replaced with CORS **
// app.use((req, res, next) => {
//   // allow CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// *** DB CONFIG ***
const connection_url =
  "mongodb+srv://admin:OEWCMPeCQNevAX5w@cluster0.qyahb.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// db.once("open", () => {
//   console.log("DB connected");

//   const msgCollection = db.collection("messagecontents");
//   const changeStream = msgCollection.watch();

//   changeStream.on("change", (change) => {
//     console.log("A Change Occurred", change);

//     if (change.operationType === "insert") {
//       const messageDetails = change.fullDocument;
//       pusher.trigger("messages", "inserted", {
//         name: messageDetails.name,
//         message: messageDetails.message,
//         timestamp: messageDetails.timestamp,
//         received: messageDetails.received,
//       });
//     } else {
//       console.log("Error triggering Pusher");
//     }
//   });
// });

// *******ROOMS************
db.once("open", () => {
  console.log("DB connected");

  const roomCollection = db.collection("rooms");
  // const changeStream = roomCollection.watch();

  // changeStream.on("change", (change) => {
  //   console.log("A Change Occurred", change);

  //   if (change.operationType === "insert") {
  //     const messageDetails = change.fullDocument;
  //     pusher.trigger("messages", "inserted", {
  //       name: messageDetails.name,
  //       message: messageDetails.message,
  //       timestamp: messageDetails.timestamp,
  //       received: messageDetails.received,
  //     });
  //   } else {
  //     console.log("Error triggering Pusher");
  //   }
  // });
});
// *******************

// *** API ROUTES ***
app.get("/", (req, res) => res.status(200).send("hello world"));

// NEW ROOM
app.post("/rooms/new", (req, res) => {
  const dbRoom = req.body;

  Rooms.create(dbRoom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// GET ROOMS
app.get("/rooms", (req, res) => {
  Rooms.aggregate([
    {
      $lookup: {
        from: "messagecontents",
        localField: "name",
        foreignField: "room",
        as: "messages",
      },
    },
  ]).exec((err, result) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send({
        error: false,
        data: result,
      });
    }
  });
});

app.get("/rooms/all", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// GET ROOM BY ID
// app.get("/rooms/:_id", (req, res) => {
//   Rooms.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.get("/messages/sync", (req, res) => {
//   Messages.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.post("/messages/new", (req, res) => {
//   const dbMessage = req.body;

//   Messages.create(dbMessage, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

// *** LISTENER ***
app.listen(port, () => console.log(`Listening on localhost:${port}`));

/////////////////////////////////////////////////////////////////////////////////

// *** IMPORTS ***
// import express from "express";
// import mongoose from "mongoose"; // client connecting to db
// import Messages from "./dbMessages.js";
// import Pusher from "pusher";
// import cors from "cors";

// *** APP CONFIG ***
// const app = express();
// const port = process.env.PORT || 9000;

// const pusher = new Pusher({
//   appId: "1094157",
//   key: "447ac9a1d3bfa749aae4",
//   secret: "c897bfb7251018302900",
//   cluster: "us3",
//   encrypted: true,
// });

// *** MIDDLEWARE ***
// app.use(express.json());
// app.use(cors());

// ** replaced with CORS **
// app.use((req, res, next) => {
//   // allow CORS headers
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// *** DB CONFIG ***
// const connection_url =
//   "mongodb+srv://admin:OEWCMPeCQNevAX5w@cluster0.qyahb.mongodb.net/whatsappdb2?retryWrites=true&w=majority";
// mongoose.connect(connection_url, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.once("open", () => {
//   console.log("DB connected");

//   const msgCollection = db.collection("messagecontents");
//   const changeStream = msgCollection.watch();

//   changeStream.on("change", (change) => {
//     console.log("A Change Occurred", change);

//     if (change.operationType === "insert") {
//       const messageDetails = change.fullDocument;
//       pusher.trigger("messages", "inserted", {
//         name: messageDetails.name,
//         message: messageDetails.message,
//         timestamp: messageDetails.timestamp,
//         received: messageDetails.received,
//       });
//     } else {
//       console.log("Error triggering Pusher");
//     }
//   });
// });

// *** API ROUTES ***
// app.get("/", (req, res) => res.status(200).send("hello world"));

// app.get("/messages/sync", (req, res) => {
//   Messages.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.post("/messages/new", (req, res) => {
//   const dbMessage = req.body;

//   Messages.create(dbMessage, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

// *** LISTENER ***
// app.listen(port, () => console.log(`Listening on localhost:${port}`));
