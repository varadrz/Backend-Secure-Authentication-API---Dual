const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Seed: Connected to MongoDB');

        const presetUsers = [
            {
                email: 'simple@example.com',
                password: 'password123',
                role: 'user'
            },
            {
                email: 'admin@gmail.com',
                password: 'admin',
                role: 'admin'
            }
        ];

        for (const u of presetUsers) {
            const exists = await User.findOne({ email: u.email });
            if (!exists) {
                await User.create(u);
                console.log(`Seed: Created user ${u.email}`);
            } else {
                console.log(`Seed: User ${u.email} already exists`);
            }
        }

        console.log('Seed: Finished successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seed ERROR:', err);
        process.exit(1);
    }
};

seedUsers();
