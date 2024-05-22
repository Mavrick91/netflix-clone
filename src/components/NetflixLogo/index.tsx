import ImageClient from "../ImageClient";

const NetflixLogo = () => {
	return (
		<div className="relative h-[30px] w-[172px]">
			<ImageClient src="/images/netflix-logo.png" alt="Netflix Logo" fill />
		</div>
	);
};

export default NetflixLogo;
