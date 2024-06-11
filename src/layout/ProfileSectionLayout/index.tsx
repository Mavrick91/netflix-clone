import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

type ProfileSectionLayoutProps = {
	title?: string;
	children: React.ReactNode;
	className?: string;
	subTitle?: ReactNode;
};

const ProfileSectionLayout = ({
	title,
	children,
	className = "",
	subTitle,
}: ProfileSectionLayoutProps) => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth >= 576);
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{!isMobile && (
				<div
					className={`border border-[#999] bg-white p-3 sm:hidden ${className}`}
				>
					{title && (
						<h2 className="mb-5 pt-4 text-lg text-[#737373]">{title}</h2>
					)}
					{children}
				</div>
			)}

			{isMobile && (
				<div
					className={classNames(
						"hidden sm:flex flex-col sm:border-t sm:border-[#999] pb-5 pt-4 items-start md:grid grid-cols-8 md:gap-14",
						className,
					)}
				>
					{(title || subTitle) && (
						<div className="flex flex-col md:col-span-3">
							{title && (
								<h2 className="text-lg text-[#737373] md:col-span-3">
									{title}
								</h2>
							)}
							{subTitle}
						</div>
					)}
					<div className="w-full gap-4 md:col-span-5">{children}</div>
				</div>
			)}
		</>
	);
};

export default ProfileSectionLayout;
