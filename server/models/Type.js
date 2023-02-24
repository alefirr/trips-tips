import mongoose from 'mongoose';
const { Schema } = mongoose;

const TypeSchema = Schema({
  name: { type: String, required: true },
});
export default mongoose.model('Type', TypeSchema);
