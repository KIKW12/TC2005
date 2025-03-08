const db = require('./util/database');
async function testConnection() {
    try {
        const [result] = await db.execute('SELECT 1 + 1 AS solution');
        console.log('Database connection successful!');
        console.log('Test query result:', result[0].solution);
        
        // Check if our tables exist
        const [tables] = await db.execute('SHOW TABLES');
        console.log('Tables in database:', tables.map(t => Object.values(t)[0]).join(', '));
        
    } catch (error) {
        console.error('Database connection failed!');
        console.error('Error:', error.message);
        console.error('Check your database configuration in util/database.js');
    } finally {
        process.exit();
    }
}

testConnection();