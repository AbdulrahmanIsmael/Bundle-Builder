import type { Dispatch, SetStateAction } from "react";

function QuantityStepper({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center overflow-hidden h-7">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setQuantity((q) => Math.max(0, q - 1));
        }}
        className={`w-[20px] h-[20px] flex items-center justify-center ${!quantity ? "bg-transparent border border-[#E6EBF0]" : "bg-[#F0F4F7]"} rounded-[4px] cursor-pointer text-[#666] text-lg hover:bg-[#e8ecef] transition-colors`}
      >
        −
      </button>
      <span className="w-6 text-center text-[14px] font-medium text-[#0B0D10] h-full flex items-center justify-center">
        {quantity}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setQuantity((q) => q + 1);
        }}
        className="w-[20px] h-[20px] flex items-center justify-center bg-[#F0F4F7] rounded-[4px] cursor-pointer text-[#666] text-lg hover:bg-[#e8ecef] transition-colors"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
