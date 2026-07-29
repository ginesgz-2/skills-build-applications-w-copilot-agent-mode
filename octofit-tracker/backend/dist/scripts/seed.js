import './../config/database.js';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
console.log('Seed the octofit_db database with test data');
async function seedDatabase() {
    try {
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ada Lovelace',
                email: 'ada@example.com',
                role: 'Captain',
                fitnessLevel: 'Advanced',
            },
            {
                name: 'Grace Hopper',
                email: 'grace@example.com',
                role: 'Coach',
                fitnessLevel: 'Intermediate',
            },
            {
                name: 'Katherine Johnson',
                email: 'katherine@example.com',
                role: 'Member',
                fitnessLevel: 'Beginner',
            },
        ]);
        await Team.insertMany([
            {
                name: 'Trail Blazers',
                focus: 'Endurance',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Sprint Squad',
                focus: 'Power',
                members: [users[2]._id],
            },
        ]);
        await Activity.insertMany([
            { name: 'Morning Run', duration: '30m', type: 'Cardio' },
            { name: 'Strength Circuit', duration: '45m', type: 'Strength' },
            { name: 'Yoga Flow', duration: '20m', type: 'Recovery' },
        ]);
        await LeaderboardEntry.insertMany([
            { name: 'Ada', score: 1250, streak: 8 },
            { name: 'Grace', score: 1180, streak: 5 },
            { name: 'Katherine', score: 1040, streak: 3 },
        ]);
        await Workout.insertMany([
            { name: 'HIIT Circuit', difficulty: 'Intermediate', duration: '35m', focus: 'Fat Loss' },
            { name: 'Mobility Flow', difficulty: 'Beginner', duration: '20m', focus: 'Recovery' },
            { name: 'Tempo Run', difficulty: 'Advanced', duration: '40m', focus: 'Cardio' },
        ]);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
