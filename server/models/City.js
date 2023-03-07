import mongoose from 'mongoose';
const { Schema } = mongoose;

const CitySchema = Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String, default: '' },
  population: { type: Number },
  isCapital: { type: Boolean, default: false, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
});
export default mongoose.model('City', CitySchema);
