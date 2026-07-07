import type { ReactNode } from "react";

interface I_reviewSectionProps {
  title: string;
  children: ReactNode;
}

const ReviewSection = ({ title, children }: I_reviewSectionProps) => {
  return (
    <div className="mb-6">
      <h4 className="text-[11px] font-medium text-[#888] tracking-[1px] uppercase mb-2">
        {title}
      </h4>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default ReviewSection;
