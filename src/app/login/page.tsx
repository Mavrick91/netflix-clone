import ImageClient from "@/components/ImageClient";

import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
	return (
		<div className="relative flex min-h-[44rem] flex-col text-primary-white">
			<ImageClient
				fill
				src="/images/background-signin.jpg"
				alt="background signin"
				className="z-0"
			/>
			<div
				className="absolute inset-0 z-10 bg-black/40"
				style={{
					backgroundImage:
						"linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)",
				}}
			/>

			<div className="relative z-10 flex h-full grow items-center justify-center">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
