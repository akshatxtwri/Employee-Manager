console.log("DATABASE_URL:", process.env.DATABASE_URL);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL , 
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    //this returns a promise

    .then(() => console.log('Db connection established'))
    .catch( (error) => {console.log("issues in db connection");
        console.error(error.message);
        process.exit(1); // this will terminate the node process if there is any error in db connection
    });
}

export default dbConnect;
