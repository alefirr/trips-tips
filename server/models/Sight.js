import mongoose from 'mongoose';
const { Schema } = mongoose;

const SightSchema = Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  img: { type: String, default: '' },
  type: { type: Schema.Types.ObjectId, ref: 'Type' },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
});
export default mongoose.model('Sight', SightSchema);
