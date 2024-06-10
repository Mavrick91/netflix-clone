import { AnimatePresence, motion } from "framer-motion";

import AccountIcon from "@/assets/images/svg/AccountIcon";
import ImageClient from "@/components/ImageClient";
import LinkComponent from "@/components/LinkComponent";
import useClickOutside from "@/hooks/useClickOutside";
import { useAuth } from "@/Providers/AuthProvider";

type ProfileDropdownProps = {};

const ProfileDropdown: React.FC<ProfileDropdownProps> = () => {
	const { logout } = useAuth();
	const { buttonRef, dropdownRef, isDropdownOpen, toggleDropdown } =
		useClickOutside();

	const dropdownVariants = {
		open: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3 },
		},
		closed: {
			opacity: 0,
			y: -20,
			transition: { duration: 0.3 },
		},
	};

	return (
		<div className="relative size-10 z-20 py-1">
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
					width={32}
					height={32}
					className="rounded"
				/>
			</button>
			<AnimatePresence>
				{isDropdownOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={dropdownVariants}
					>
						<div className="arrow-down left-1/2 top-12 shrink-0 -translate-x-1/2 rotate-180" />
						<div
							className="absolute right-0 flex flex-col text-white"
							ref={dropdownRef}
						>
							<div className="relative -bottom-6 w-56 rounded bg-black text-sm">
								<ul>
									<li className="p-3">
										<LinkComponent
											href="/YourAccount"
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
