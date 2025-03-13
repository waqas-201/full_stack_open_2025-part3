const express = require("express");
var morgan = require("morgan");
var cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3001;
app.use(express.json());

morgan.token("postBody", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status - :response-time ms - Body: :postBody"));

const phoneBook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, responce) => {
  responce.send(phoneBook);
});


app.get("/info", (req, res) => {
  const reqTime = new Date();
  console.log(reqTime.toString());

  res.send(`phonebook has info of ${phoneBook.length} peopels  ${reqTime}`);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).end();
  }
  const person = phoneBook.find((person) => id === person.id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).end();
  }

  const filterdPersons = phoneBook.filter((person) => person.id !== id);
  if (!filterdPersons) {
    res.status(404).end();
  }

  res.json(filterdPersons);
});

app.post("/api/persons/", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name and number are missing " });
  }

  const isPersoneExists = phoneBook.find((person) => name === person.name);
  if (isPersoneExists) {
    return res.status(400).json({ error: "name already Exists" });
  }
  const id = Math.floor(Math.random(1000000) * 10000);
  const person = { id: String(id), name, number };
  const result = phoneBook.concat(person);
  res.json(result);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



import React from "react";
import Course from "./component/Course";

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
};



