/* eslint-disable @next/next/no-img-element */

const Category1 = () => {
	return (
		<section
			className="netflix-container mx-auto flex size-full flex-col-reverse items-center px-2 py-[56px] text-primary-white lg:flex-row lg:gap-5 lg:px-8 lg:py-20"
			aria-labelledby="category1-heading"
		>
			<div className="basis-1/2">
				<div className="relative flex justify-center">
					<img
						alt="Television displaying a scene from Netflix"
						src="/images/tv.png"
					/>
					<div className="absolute left-1/2 top-[44%] -z-10 size-full max-h-[47%] max-w-[63%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
						<video
							autoPlay
							playsInline
							muted
							loop
							aria-label="Sample video from Netflix"
						>
							<source src="/videos/video-tv-0819.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</div>

			<div className="mb-6 basis-1/2 gap-4">
				<h2
					id="category1-heading"
					className="text-center text-[32px] font-black lg:text-left lg:text-5xl"
				>
					Enjoy on your TV
				</h2>
				<p className="mt-4 text-center text-lg lg:text-left lg:text-2xl">
					Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
					players, and more.
				</p>
			</div>
		</section>
	);
};

export default Category1;
