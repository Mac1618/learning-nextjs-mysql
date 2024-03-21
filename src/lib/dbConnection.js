import mysql from 'mysql2/promise';

export const dbConnection = async ({ query, values }) => {
	// Connection to mysql server
	const ConnectDB = await mysql.createConnection({
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		// socketPath: process.env.DB_SOCKETPATH,
	});

  try {
    // Execute query
    const [result] = await ConnectDB.execute(query, values);
    ConnectDB.end();
    return result;

  // Catch error  
  } catch (error) {
    throw new Error(error.message);
  }
};
