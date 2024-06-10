import QualityHDIcon from "@/assets/images/svg/QualityHDIcon";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";

type PlanDetailsProps = {};

const PlanDetails = ({}: PlanDetailsProps) => {
	return (
		<ProfileSectionLayout title="PLAN DETAILS">
			<div className="flex flex-col md:col-span-5">
				<div className="flex items-center gap-3">
					<p className="font-medium text-[#333]">Standard</p>
					<QualityHDIcon className="size-10" />
				</div>
			</div>
		</ProfileSectionLayout>
	);
};

export default PlanDetails;
