import mongoose from 'mongoose';
import { db } from '../../../constants';

export const mongodb = {
  connect: async () => {
    mongoose.connect(
      `mongodb+srv://${db.USER}:${db.PASSWORD}@${db.HOST}/${db.NAME}?retryWrites=true&w=majority`
    );
  },
  disconnect: async () => {
    mongoose.disconnect();
  },
};
