import Image from 'next/image';

// Icons
import { AlignJustify } from 'lucide-react';

const Header = () => {
	return (
		<section className="flex justify-between items-center bg-[#AF81ED] text-white px-5 py-4 mb-5">
			<AlignJustify width={20} height={20} />
			<h4 className="font-bold">Product List</h4>
		</section>
	);
};

export default Header;
