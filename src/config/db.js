import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://admin:pzHjHH73LzXcUSrF@demo-projects-data-sour.gnsvyon.mongodb.net/notebook?retryWrites=true&w=majority&appName=demo-projects-data-source',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;

export default db;
