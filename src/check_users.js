const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config();

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: { type: String, select: true },
    role: String
});

const User = mongoose.model('User', UserSchema);

async function check() {
    try {
        console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            const pHash = u.password || 'MISSING';
            const isHashed = pHash.startsWith('$2a$') || pHash.startsWith('$2b$');
            console.log(`- ${u.email} (${u.role}): ${isHashed ? 'HASHED' : 'PLAIN'} [${pHash.substring(0, 10)}...]`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error('Error:', err);
    }
}

check();
