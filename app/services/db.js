const pg = require('pg');
const { database_connection } = require('../config/config');

const pool = new pg.Pool({
    connectionString:database_connection,
    max: 30,
    idleTimeoutMillis: 30000,
    ssl: false
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

async function query(sql, values) {
    const {rows, fields} = await pool.query(sql, values)
    return rows
}

module.exports = {
    query
}