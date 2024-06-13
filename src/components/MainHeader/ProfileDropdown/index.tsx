import { AnimatePresence, motion } from "framer-motion";

import AccountIcon from "@/assets/images/svg/AccountIcon";
import ImageClient from "@/components/ImageClient";
import LinkComponent from "@/components/LinkComponent";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useClickOutside from "@/hooks/useClickOutside";

const ProfileDropdown = () => {
	const { logout } = useAuthenticatedUser();
	const { buttonRef, dropdownRef, isDropdownOpen, toggleDropdown } =
		useClickOutside();

	const dropdownVariants = {
		open: {
			opacity: 1,
			transition: { duration: 0.3 },
		},
		closed: {
			opacity: 0,
			transition: { duration: 0.3 },
		},
	};

	return (
		<div className="relative z-20 size-6 md:size-7 lg:size-8">
			<button
				type="button"
				className="flex size-full justify-center"
				onClick={toggleDropdown}
				ref={buttonRef}
				aria-label="Toggle Profile Dropdown"
			>
				<ImageClient
					src="/images/profile-icon-1.png"
					alt="Profile"
					width={40}
					height={40}
					className="rounded-sm"
				/>
			</button>
			<AnimatePresence>
				{isDropdownOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={dropdownVariants}
						className="absolute right-0 flex flex-col inset-x-0 space-y-3 mt-2"
					>
						<div className="arrow-down !relative shrink-0 rotate-180 left-1/2 -translate-x-1/2" />
						<div
							className="absolute right-0 flex flex-col text-white"
							ref={dropdownRef}
						>
							<div className="relative w-56 rounded bg-black text-sm">
								<ul>
									<li className="p-3">
										<LinkComponent
											href="/account"
											className="flex items-center gap-3"
										>
											<AccountIcon className="text-[#B3B3B3]" />
											<span>Account</span>
										</LinkComponent>
									</li>
									<li className="border-t border-[#ffffff40] px-3 py-4 text-center">
										<button
											onClick={() => logout()}
											type="button"
											aria-label="Sign out of Netflix"
										>
											Sign out of Netflix
										</button>
									</li>
								</ul>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProfileDropdown;
