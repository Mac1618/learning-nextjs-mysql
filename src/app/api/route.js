import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
	try {
		const dbconnection = await mysql.createConnection({
			host: process.env.DB_HOST,
			database: process.env.DB_DATABASE,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			// socketPath: process.env.DB_SOCKETPATH,
		});

		const query = 'SELECT idproducts, name FROM products';
		const value = [];
		const [result] = await dbconnection.execute(query, value);

		return NextResponse.json({ data: result });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
