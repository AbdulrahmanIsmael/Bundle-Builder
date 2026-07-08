import type { Dispatch, SetStateAction } from "react";

function QuantityStepper({
  quantity,
  setQuantity,
  btnBg = "#F0F4F7",
}: {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  btnBg?: string;
}) {
  const disabled = quantity === 0;

  return (
    <div className="flex items-center gap-1 overflow-hidden h-7">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setQuantity((q) => Math.max(0, q - 1));
        }}
        disabled={disabled}
        aria-label="decrease product quantity"
        className={`w-[20px] h-[20px] flex items-center justify-center ${disabled ? "border border-[#E6EBF0]" : ""} rounded-[4px] cursor-pointer text-[#666] text-lg hover:brightness-95 transition-colors`}
        style={{ backgroundColor: disabled ? undefined : btnBg }}
      >
        &minus;
      </button>
      <span className="w-6 text-center text-[14px] font-medium text-[#0B0D10] h-full flex items-center justify-center">
        {quantity}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setQuantity((q) => q + 1);
        }}
        aria-label="increase product quantity"
        className="w-[20px] h-[20px] flex items-center justify-center rounded-[4px] cursor-pointer text-[#666] text-lg hover:brightness-95 transition-colors"
        style={{ backgroundColor: btnBg }}
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
