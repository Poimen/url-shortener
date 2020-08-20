import mongoose from 'mongoose';
import config from '@/configuration/config';

const mongoConnectionString = (collection: string) => `mongodb://${config.mongodbIP}/${collection}?retryWrites=true`;

function connectionError(err: string) {
  console.error('Failed to connect to mongodb');
  console.error(err);

  process.exit(1);
}

function connectionEstablished() {
  console.log('connected to mongodb');
  dbConnectionHealthy = true;
}

export function connectToDatabase() {
  const connectionString = mongoConnectionString('shorts');
  const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  mongoose.connect(connectionString, options);
  mongoose.connection.on('error', connectionError);
  mongoose.connection.once('open', connectionEstablished);
}

export let dbConnectionHealthy: boolean = false;
