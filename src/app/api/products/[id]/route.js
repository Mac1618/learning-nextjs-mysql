import { dbConnection } from '@/lib/dbConnection';
import { NextRequest, NextResponse } from 'next/server';

//DELETE REQUEST
export const DELETE = async (request, { params }) => {
	try {
		// Grabbing the params id
		const idproducts = params.id;
		console.log(idproducts);
		let message;

		// Delete Query
		const deleteProduct = await dbConnection({
			query: 'DELETE FROM products WHERE idproducts = ?',
			values: [idproducts],
		});

		// Deleted product status
		const result = deleteProduct.affectedRows;
		if (result) {
			message = 'success';
		} else {
			message = 'error';
		}

		// Next Response
		return NextResponse.json({ message: message, idproducts: idproducts });

		// Catch error
	} catch (error) {
		return NextResponse.json({ erroroaosdo: error.message });
	}
};
