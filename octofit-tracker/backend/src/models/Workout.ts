import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'recovery'],
      required: true,
    },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, min: 1, required: true },
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
