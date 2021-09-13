const pg = require('pg');

// I don't totally understand this, I just copied it over from previous assignments
// I see that the next line configures database connection parameters
const config = {
    database: 'weekend-to-do-app', 
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 30000 
  };

// declaring variable 'pool' to export, assigned to a call for a new pg method .Pool with input config
  const pool = new pg.Pool(config);

//   on pool connect event, returning sucess message to console log?
  pool.on("connect", () => {
    console.log("connected to postgres");
  });
  
//   on pool error event, returing error message to the log, with specific error?
  pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
  });
  
//   exporting pool as module?
  module.exports = pool;