const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://malikyounus33:${password}@cluster0.3bpqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("phonebook", personSchema);

const person = new Person({
  name: "waqas",
  number: "wqeh7831613",
});

person.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});
