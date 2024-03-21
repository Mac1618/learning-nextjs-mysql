import { dbConnection } from '@/lib/dbConnection';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
	try {
		const products = await dbConnection({
			query: 'SELECT * FROM products',
			values: [],
		});

		return NextResponse.json({ data: products });
		// Catch errors
	} catch (error) {
		return NextResponse.json({ error: error.message });
	}
};
