import LinkComponent from "@/components/LinkComponent";

type Props = {
	title: string;
};

const HeaderCarousel = ({ title }: Props) => {
	return (
		<LinkComponent
			href="/browse/m/similars/81719583"
			aria-label={`Link to similar movies for ${title}`}
		>
			<div className="mb-3 ml-5 text-xl font-medium text-[#e5e5e5] md:text-2xl">
				{title}
			</div>
		</LinkComponent>
	);
};

export default HeaderCarousel;
