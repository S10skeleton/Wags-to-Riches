const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createConnection({
    host: 'your_host',
    user: 'your_user',
    password: 'your_password',
    database: 'PetAdoptionDB'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as ID ' + connection.threadId);
});

// Insert data into Breeds
const breeds = [
    ['Golden Retriever', 'Dog'],
    ['Siamese', 'Cat']
];

const users = [
    ['John Doe', 'New York, NY', 'johndoe@email.com', '555-1234', 'Full-time', 'Experienced', 'Companionship', 'Active', 'Willing to train', 'House', 'Alone', true, 'Looking to adopt a dog for companionship and outdoor activities.'],
    ['Jane Smith', 'Los Angeles, CA', 'janesmith@email.com', '555-5678', 'Part-time', 'First Time', 'Family Pet', 'Moderate', 'Prefer trained pet', 'Apartment', 'With Family', false, 'Want a friendly cat to grow with our family.']
];

const userPreferences = [
    [1, 'Dog', 1, 'Large', 'Adult', 'High', 'Needs to be good with children'],
    [2, 'Cat', 2, 'Medium', 'Kitten', 'Low', 'Preferably hypoallergenic']
];

const currentPets = [
    [1, 'Dog', 1, '5 years', 'Friendly with other dogs, very active'],
    [2, 'Cat', 2, '2 years', 'Calm and independent, good with children']
];

// Function to insert data
const insertData = (table, data) => {
    data.forEach(row => {
        const query = `INSERT INTO ${table} VALUES (NULL, ${row.map(item => `'${item}'`).join(', ')});`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log(`${table} entry added:`, results.insertId);
        });
    });
};

// Execute insertions
insertData('Breeds', breeds);
insertData('Users', users);
insertData('UserPreferences', userPreferences);
insertData('CurrentPets', currentPets);

// Close the connection
connection.end();
