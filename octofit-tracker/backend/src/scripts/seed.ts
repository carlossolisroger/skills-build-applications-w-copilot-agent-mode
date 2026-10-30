import mongoose from 'mongoose';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data.
 */
export async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Mona the Octocat', email: 'mona@example.com', bio: 'Trail running enthusiast' },
      { name: 'Ada Lovelace', email: 'ada@example.com', bio: 'Strength and mobility fan' },
      { name: 'Grace Hopper', email: 'grace@example.com', bio: 'Cyclist and team captain' },
    ]);
    const teams = await Team.insertMany([
      {
        name: 'Octocats',
        description: 'A team for active, curious builders.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Code Runners',
        description: 'Steady miles and friendly competition.',
        members: [users[2]._id],
      },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { $set: { team: teams[0]._id } } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { $set: { team: teams[0]._id } } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { $set: { team: teams[1]._id } } } },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'run', durationMinutes: 35, distanceKm: 5.2, calories: 340 },
      { user: users[1]._id, type: 'strength', durationMinutes: 45, calories: 280 },
      { user: users[2]._id, type: 'cycle', durationMinutes: 60, distanceKm: 18.4, calories: 510 },
    ]);
    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 520, period: 'weekly' },
      { user: users[1]._id, team: teams[0]._id, points: 410, period: 'weekly' },
      { user: users[2]._id, team: teams[1]._id, points: 610, period: 'weekly' },
    ]);
    await Workout.insertMany([
      {
        title: 'Starter Interval Run',
        description: 'Alternate easy jogging with short, brisk intervals.',
        category: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 25,
        equipment: [],
      },
      {
        title: 'Full-Body Basics',
        description: 'Build strength with controlled bodyweight movements.',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        equipment: ['exercise mat'],
      },
      {
        title: 'Recovery Flow',
        description: 'A gentle mobility sequence for post-training recovery.',
        category: 'recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        equipment: ['exercise mat'],
      },
    ]);
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

const isMainModule =
  process.argv[1] !== undefined &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMainModule) {
  await seedDatabase();
}
