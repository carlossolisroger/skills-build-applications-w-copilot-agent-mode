import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0, default: 0 },
    calories: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

activitySchema.index({ user: 1, date: -1 });

export default model('Activity', activitySchema);
