import ImageClient from "../ImageClient";

const NetflixLogo = () => {
	return (
		<div className="relative h-[30px] w-[172px]">
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
