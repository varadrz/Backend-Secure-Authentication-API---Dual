const mongoose = require('mongoose');
require('dotenv').config();

const dropUsernameIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.collection('users');

        // List indexes to see if 'username_1' exists
        const indexes = await collection.listIndexes().toArray();
        console.log('Current indexes:', indexes.map(i => i.name));

        const hasUsernameIndex = indexes.some(i => i.name === 'username_1' || i.key.username);

        if (hasUsernameIndex) {
            console.log('Dropping username index...');
            await collection.dropIndex('username_1');
            console.log('Index dropped successfully');
        } else {
            console.log('No username index found');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error dropping index:', err);
        process.exit(1);
    }
};

dropUsernameIndex();
