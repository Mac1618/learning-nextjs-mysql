import { dbConnection } from '@/lib/dbConnection';
import { NextRequest, NextResponse } from 'next/server';

// GET REQUEST
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

// POST REQUEST
export const POST = async (req) => {
	try {
		const reqBody = await req.json();
		const { name } = reqBody;
		let message;

		// QUERY to add a product
		const newProduct = await dbConnection({
			query: 'INSERT INTO products (name) VALUES (?)',
			values: [name],
		});

		// Automatically get a new Id in mysql
		// This is the method to know the status to query
		if (newProduct.insertId) {
			message = 'success';
		} else {
			message = 'error';
		}

		const product = {
			productId: newProduct.insertId,
			productName: name,
		};

		// Response Message
		return NextResponse.json({ message: message, products: product });

		// Catch error
	} catch (error) {
		return NextResponse.json({ error: error.message });
	}
};

// UPDATE REQUEST
export const PUT = async (req) => {
	try {
		const reqBody = await req.json();
		const { idproducts, name } = reqBody;
		let message;

		// Update Query
		const updateProduct = await dbConnection({
			query: 'UPDATE products SET name = ? WHERE idproducts = ?',
			// 		1st "?", 2nd "?"
			values: [name, idproducts],
		});

		// Updated product status
		const result = updateProduct.affectedRows;
		if (result) {
			message = 'success';
		} else {
			message = 'error';
		}

		// Updated product data
		const product = {
			idproducts: idproducts,
			productName: name,
		};

		// Next Response
		return NextResponse.json({ message: message, product: product });

		// Catch error
	} catch (error) {
		return NextResponse.json({ error: error.message });
	}
};
