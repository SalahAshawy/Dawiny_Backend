import { model, Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});

export default model<User>('User', userSchema);
