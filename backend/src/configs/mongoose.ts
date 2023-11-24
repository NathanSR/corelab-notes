import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "uri-mongo"

mongoose.connect(MONGO_URI)
    .then(resp => console.log("Conectado MongoDB!"))
    .catch(err => console.log("Erro Mongo!", err.message))

mongoose.Promise = global.Promise;

export default mongoose
