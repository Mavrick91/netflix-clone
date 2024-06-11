import ImageClient from "@/components/ImageClient";

const NetflixLogo = () => {
	return (
		<div className="relative h-auto w-[90px] sm:w-[150px] md:w-[155px] lg:w-[170px]">
			<ImageClient
				src="/images/netflix-logo.png"
				alt="Netflix Logo"
				width={170}
				height={26}
				style={{ width: "100%", height: "auto" }}
			/>
		</div>
	);
};

export default NetflixLogo;
