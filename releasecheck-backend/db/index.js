const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Increase time to wait for a connection (default is often too short)
  connectionTimeoutMillis: 60000, // 10 seconds
  // How long a client can sit idle in the pool
  idleTimeoutMillis: 60000, 
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
