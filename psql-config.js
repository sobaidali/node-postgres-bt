const { Pool } = require('pg');

//database connection string    
const connectionString = 'postgresql://conbailey:pass@localhost:5432/recipebookdb'
// pools will use environment variables
// for connection information
const pool = new Pool({ connectionString });

module.exports = { pool };