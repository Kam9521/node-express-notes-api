require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bssbwly.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Połączono z MongoDB");
    return client.db(process.env.MONGO_DB).collection("notes");
  } catch (error) {
    console.error("❌ Błąd połączenia z MongoDB:", error);
  }
}

module.exports = connectDB;
