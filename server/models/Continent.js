import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContinentSchema = Schema({
  name: { type: String, required: true },
  text: { type: String },
  imgUrl: { type: String, default: '' },
});
export default mongoose.model('Continent', ContinentSchema);
