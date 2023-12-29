import { model, Schema, Document } from 'mongoose';

interface Doctor extends Document {
  name: string;
  description: string;
  specialization: string;
  clinicLocation: string;
  image: string;
  nationalIdImage: string;
  appointmentFees: number;
}

const doctorSchema = new Schema<Doctor>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  specialization: { type: String, required: true },
  clinicLocation: { type: String, required: true },
  image: { type: String, required: true },
  nationalIdImage: { type: String, required: true },
  appointmentFees: { type: Number, required: true },
});

export default model<Doctor>('Doctor', doctorSchema);
