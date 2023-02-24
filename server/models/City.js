import mongoose from 'mongoose';
const { Schema } = mongoose;

const CitySchema = Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  imgUrl: { type: String, default: '' },
  population: { type: Number },
  isCapital: { type: Boolean },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
});
export default mongoose.model('City', CitySchema);
