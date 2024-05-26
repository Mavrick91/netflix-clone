import ImageClient from "../ImageClient";

const NetflixLogo = () => {
  return (
    <div className="relative w-full md:h-[20px] md:w-[100px] lg:h-[30px] lg:w-[172px]">
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
