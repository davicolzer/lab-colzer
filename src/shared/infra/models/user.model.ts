import { model, Schema } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
}


const UserSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

export const User = model('User', UserSchema);