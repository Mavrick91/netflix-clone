import toast, { ToastOptions } from "react-hot-toast";

const defaultOptions: ToastOptions = {
	duration: 4000,
	position: "top-right",
	style: {
		background: "#363636",
		color: "#fff",
	},
};

type ToastTypes =
	| "success"
	| "error"
	| "loading"
	| "info"
	| "warning"
	| "default";

const useToast = (options: ToastOptions = {}) => {
	const mergedOptions = { ...defaultOptions, ...options };

	const showToast = (message: string, type: ToastTypes = "default") => {
		switch (type) {
			case "success":
				toast.success(message, mergedOptions);
				break;
			case "error":
				toast.error(message, mergedOptions);
				break;
			case "loading":
				toast.loading(message, mergedOptions);
				break;
			case "info":
				toast(message, mergedOptions);
				break;
			case "warning":
				toast(message, mergedOptions);
				break;
			default:
				toast(message, mergedOptions);
		}
	};

	return showToast;
};

export default useToast;
