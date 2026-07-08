import type { ReactNode } from "react";

interface I_reviewSectionProps {
  title: string;
  children: ReactNode;
}

const ReviewSection = ({ title, children }: I_reviewSectionProps) => {
  return (
    <div>
      <h4 className="text-[12px] font-normal text-[#A8B2BD] tracking-[3%] leading-4 uppercase border-t border-t-[#CED6DE] pt-[15px]">
        {title}
      </h4>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default ReviewSection;
