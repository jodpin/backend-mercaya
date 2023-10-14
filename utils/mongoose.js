import mongoose from 'mongoose'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const MONGODB_URI = process.env['MONGODB_URI']

export async function connectToDB(){
  try{
    await mongoose.connect(MONGODB_URI)
    console.log('mongoDB connected')
  }catch(err){
    console.log(err)

  }
  
}
