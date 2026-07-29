import './config/database.js';
import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
const app = express();
app.use(express.json());
const port = Number(process.env.PORT ?? 8000);
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
function sendPayload(res, data) {
    res.json({ apiUrl: getApiBaseUrl(), data });
}
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: getApiBaseUrl() });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User.find({}).lean();
        sendPayload(res, users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
});
app.post('/api/users/', async (req, res) => {
    try {
        const newUser = await User.create({
            name: typeof req.body?.name === 'string' ? req.body.name : 'New User',
            email: typeof req.body?.email === 'string' ? req.body.email : 'new@example.com',
            role: typeof req.body?.role === 'string' ? req.body.role : 'Member',
            fitnessLevel: typeof req.body?.fitnessLevel === 'string' ? req.body.fitnessLevel : 'Beginner',
        });
        sendPayload(res, newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create user' });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team.find({}).populate('members').lean();
        sendPayload(res, teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch teams' });
    }
});
app.post('/api/teams/', async (req, res) => {
    try {
        const newTeam = await Team.create({
            name: typeof req.body?.name === 'string' ? req.body.name : 'New Team',
            focus: typeof req.body?.focus === 'string' ? req.body.focus : 'General',
            members: Array.isArray(req.body?.members) ? req.body.members : [],
        });
        sendPayload(res, newTeam);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create team' });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity.find({}).lean();
        sendPayload(res, activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities' });
    }
});
app.post('/api/activities/', async (req, res) => {
    try {
        const newActivity = await Activity.create({
            name: typeof req.body?.name === 'string' ? req.body.name : 'New Activity',
            duration: typeof req.body?.duration === 'string' ? req.body.duration : '15m',
            type: typeof req.body?.type === 'string' ? req.body.type : 'General',
        });
        sendPayload(res, newActivity);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create activity' });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await LeaderboardEntry.find({}).lean();
        sendPayload(res, leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard' });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout.find({}).lean();
        sendPayload(res, workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch workouts' });
    }
});
app.post('/api/workouts/', async (req, res) => {
    try {
        const newWorkout = await Workout.create({
            name: typeof req.body?.name === 'string' ? req.body.name : 'New Workout',
            difficulty: typeof req.body?.difficulty === 'string' ? req.body.difficulty : 'Beginner',
            duration: typeof req.body?.duration === 'string' ? req.body.duration : '20m',
            focus: typeof req.body?.focus === 'string' ? req.body.focus : 'General',
        });
        sendPayload(res, newWorkout);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to create workout' });
    }
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
}
export { app, getApiBaseUrl };
