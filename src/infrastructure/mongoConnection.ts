import mongoose from 'mongoose'

export default async function() {
  return mongoose.connect(
    process.env.MONGO_URL || 'mongodb://localhost/twinte',
    {}
  )
}
