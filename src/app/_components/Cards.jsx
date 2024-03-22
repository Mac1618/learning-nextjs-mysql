// Icons
import { Plus, Trash2 } from 'lucide-react';
const Cards = ({ products }) => {
	return (
		<section className="relative bg-[#FFFFFF] h-[50vh] shadow-all-sides px-[10%] py-[3%]">
			<div className="h-[44vh] overflow-scroll no-scrollbar">
				{/* SAMPLE DATA */}
				<div className="w-full flex justify-between items-center py-1 px-[3%] hover:rounded-full hover:bg-gray-300 cursor-pointer">
					<div className="flex gap-3">
						<input type="checkbox" className="accent-red-500" />
						<p>Earphones</p>
					</div>
					<Trash2 width={20} height={20} className="text-red-500" />
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
							<Trash2 width={20} height={20} className="text-red-500" />
						</div>
					);
				})}
			</div>

			{/* New Task BTN */}
			<div className="absolute bottom-[-20px] left-[41%] p-3 flex justify-between items-center w-[18%] rounded-full text-white bg-[#AF81ED]">
				<Plus width={20} height={20} />
				<h4 className="text-sm">New Task</h4>
			</div>
		</section>
	);
};

export default Cards;
