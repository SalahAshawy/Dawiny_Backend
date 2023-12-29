import { model, Schema, Document } from 'mongoose';

interface Pharmacy extends Document {
  name: string;
  description: string;
  location: string;
  image: string;
}

const pharmacySchema = new Schema<Pharmacy>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
});

export default model<Pharmacy>('Pharmacy', pharmacySchema);
