import axios from 'axios';
import { useEffect, useState } from 'react';

// Icons
import { Pencil, Plus, Trash2 } from 'lucide-react';

const Cards = ({ products }) => {
	const [product, setProduct] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAddProduct = async () => {
		try {
			setLoading(true);
			const response = await axios.post('/api/products', {
				name: product,
			});

			setProduct('');
			return console.log(response);

			// Catch error
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const [deleteLoading, setDeleteLoading] = useState(false);
	const handleDeleteProduct = async (idproducts) => {
		try {
			setDeleteLoading(true);
			const response = await axios.delete(`/api/products/${idproducts}`);

			return console.log(response);

			// Catch error
		} catch (error) {
			return console.error(error);
		} finally {
			setDeleteLoading(false);
		}
	};

	const [showUpdateField, setShowUpdateField] = useState({
		name: '',
		idproducts: 0,
		toggle: false,
	});
	const [UpdateLoading, setUpdateLoading] = useState(false);
	const handleUpdateProduct = async () => {
		console.log(showUpdateField);
		try {
			setUpdateLoading(true);

			if (showUpdateField.name === '' || showUpdateField.idproducts === 0) {
				throw new Error('No value for update field');
			}

			const response = await axios.put('/api/products', {
				name: showUpdateField.name,
				idproducts: showUpdateField.idproducts,
			});

			setShowUpdateField({
				name: '',
				idproducts: 0,
				toggle: false,
			});

			return console.log(response);

			// Catch error
		} catch (error) {
			return console.log(error);
		} finally {
			setUpdateLoading(false);
		}
	};

	return (
		<section className="relative bg-[#FFFFFF] h-[50vh] shadow-all-sides px-[10%] py-[3%]">
			{showUpdateField.toggle ? (
				<div className="w-full flex justify-between items-center mb-5">
					<input
						type="text"
						className="w-[50%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={(e) => setShowUpdateField({ ...showUpdateField, name: e.target.value })}
					/>

					<button
						onClick={handleUpdateProduct}
						className="w-auto px-3 py-2 flex justify-between items-center rounded shadow-md text-white bg-green-500"
					>
						<Plus width={20} height={20} />
						<p className="text-xs">{UpdateLoading ? 'Loading...' : 'Update'}</p>
					</button>
				</div>
			) : (
				<div className="w-full flex justify-between items-center mb-5">
					<input
						type="text"
						className="w-[50%] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={(e) => setProduct(e.target.value)}
					/>

					<button
						onClick={handleAddProduct}
						className="w-auto px-3 py-2 flex justify-between items-center rounded shadow-md text-white bg-[#AF81ED]"
					>
						<Plus width={20} height={20} />
						<p className="text-xs">{loading ? 'Loading...' : 'New Task'}</p>
					</button>
				</div>
			)}
			<div className="h-[80%] overflow-scroll no-scrollbar">
				{/* SAMPLE DATA */}
				<div className="w-full flex justify-between items-center py-1 px-[3%] hover:rounded-full hover:bg-gray-300 cursor-pointer">
					<div className="flex gap-3">
						<input type="checkbox" className="accent-red-500" />
						<p>Earphones</p>
					</div>
					<div className="flex gap-4">
						<Pencil width={20} height={20} className="text-green-500" />
						<Trash2 width={20} height={20} className="text-red-500" />
					</div>
				</div>

				{/* MAP ALL PRODUCTS */}
				{products.map((item, index) => {
					return (
						<div
							key={index}
							className="w-full flex justify-between items-center py-1 px-[3%] hover:rounded-full hover:bg-gray-300 cursor-pointer"
						>
							<div className="flex gap-3">
								<input type="checkbox" className="accent-red-500" />
								<p>{item.name}</p>
							</div>
							<div className="flex gap-4">
								<Pencil
									onClick={() =>
										setShowUpdateField({
											...showUpdateField,
											toggle: !showUpdateField.toggle,
											idproducts: item.idproducts,
										})
									}
									width={20}
									height={20}
									className="text-green-500"
								/>

								{deleteLoading ? (
									<h4>Loading...</h4>
								) : (
									<Trash2
										width={20}
										onClick={() => handleDeleteProduct(item.idproducts)}
										height={20}
										className="text-red-500"
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Cards;
