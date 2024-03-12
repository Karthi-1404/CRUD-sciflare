import mongoose from 'mongoose'

// Replace <connection_string> with your MongoDB connection string
const uri = 'mongodb+srv://karthi:Karthi1496@cluster0.lady0ar.mongodb.net/react?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// console.log('db',db);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports = db