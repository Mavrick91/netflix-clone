"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import ReactDOM from "react-dom";

import CloseIcon from "@/assets/images/svg/CloseIcon";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const modalVariants = {
	hidden: {
		scale: 0.7,
		opacity: 0,
	},
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
	exit: {
		scale: 0.7,
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

const backdropVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.3 } },
	exit: { opacity: 0, transition: { duration: 0.3 } },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return ReactDOM.createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[1000] flex justify-center overflow-y-auto bg-black/50"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<motion.div
						className="relative mt-8 border border-red-500"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<button
							className="absolute right-3 top-3 z-[100] rounded-full bg-[#181818] p-1.5 text-white"
							onClick={onClose}
						>
							<CloseIcon />
						</button>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.getElementById("modal-root")!,
	);
};

export default Modal;
