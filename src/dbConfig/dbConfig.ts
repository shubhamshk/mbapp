import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log('MongoDb Connected Successfully')
        })

        connection.on('error',(err)=>{
            console.log("Connection Error , db not connected" + err)
            process.exit()
        })
        
    } catch (error) {
        console.log("something went wrong with connection");
        console.log(error);
        
    }
    
}