import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.DB_MONGO_URI, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to DB ▶️');
    }
});


export default mongoose;