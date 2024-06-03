import ImageClient from "@/components/ImageClient";

const NetflixLogo = () => {
	return (
		<div className="relative aspect-[5/1] h-[14px] md:h-[20px] lg:h-[30px]">
			<ImageClient
				src="/images/netflix-logo.png"
				alt="Netflix Logo"
				fill
				sizes="(max-width: 768px) 100vw, 
               (max-width: 1200px) 50vw, 
               172px"
			/>
		</div>
	);
};

export default NetflixLogo;
