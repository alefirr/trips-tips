import mongoose from 'mongoose';
const { Schema } = mongoose;

const CountrySchema = Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  imgUrl: { type: String, default: '' },
  code: { type: String },
  currency: { type: String },
  continent: { type: Schema.Types.ObjectId, ref: 'Continent' },
});
export default mongoose.model('Country', CountrySchema);
