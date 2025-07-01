const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://kamil:Programista2025@cluster0.bssbwly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const dbName = "notesDB";

async function connectDB() {
  await client.connect();
  console.log("✅ Połączono z MongoDB Atlas");
  return client.db(dbName).collection("notes");
}

module.exports = connectDB;
