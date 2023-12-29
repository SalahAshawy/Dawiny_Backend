import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from '../routes/authRoutes';
import doctorRoutes from '../routes/doctorRoutes';
import pharmacyRoutes from '../routes/pharmacyRoutes';
import userRoutes from '../routes/userRouter';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

console.log(process.env.MONGO_URL);

 mongoose.connect("mongodb+srv://salahahsawy2018:TUas5SG4GEfOeeEP@cluster0.thfd01f.mongodb.net/shop").then(()=>{
   console.log('DB connceted successfully ');
 }).catch((err)=>{
   console.log(err);
 });


app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
