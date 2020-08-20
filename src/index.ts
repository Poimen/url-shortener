import './configuration/env';
import { startServer } from './server';
import { connectToDatabase } from './database/mongodbConnector';

connectToDatabase();
startServer();
