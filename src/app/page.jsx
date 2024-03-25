'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Components
import Cards from './_components/Cards';
import Header from './_components/Header';

const Home = () => {
	const [products, setProducts] = useState([]);
	const getProducts = async () => {
		try {
			const response = await axios.get('/api/products');
			console.log(response.data.data);
			return setProducts(response.data.data);

			// Catch error
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<main className="w-full min-h-screen py-[3%] px-[25%] bg-[#E3E9FF]">
			<Header />
			<Cards products={products} />
		</main>
	);
};

export default Home;
