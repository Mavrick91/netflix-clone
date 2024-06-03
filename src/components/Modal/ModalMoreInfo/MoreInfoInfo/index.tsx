type MoreInfoInfo = {
	title: string;
	className?: string;
	children: React.ReactNode;
};

const MoreInfoInfo = ({ title, children, className }: MoreInfoInfo) => {
	return (
		<p className={className}>
			<span className="text-[#777]">{title}:</span> {children}
		</p>
	);
};

export default MoreInfoInfo;
