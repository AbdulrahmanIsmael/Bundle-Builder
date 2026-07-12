function QuantityStepper({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  btnBg = "#F0F4F7",
}: {
  quantity: number;
  handleDecreaseQuantity: (e: React.MouseEvent) => void;
  handleIncreaseQuantity: (e: React.MouseEvent) => void;
  btnBg?: string;
}) {
  const disabled = quantity === 0;

  return (
    <div className="flex items-center gap-1 overflow-hidden h-7">
      <button
        onClick={handleDecreaseQuantity}
        disabled={disabled}
        aria-label="decrease product quantity"
        className={`w-5 h-5 flex items-center justify-center ${disabled ? "border border-[#E6EBF0]" : ""} rounded-sm cursor-pointer text-[#666] text-lg hover:brightness-95 transition-colors`}
        style={{ backgroundColor: disabled ? undefined : btnBg }}
      >
        &minus;
      </button>
      <span className="w-6 text-center text-sm md:text-base font-medium text-[#0B0D10] h-full flex items-center justify-center">
        {quantity}
      </span>
      <button
        onClick={handleIncreaseQuantity}
        aria-label="increase product quantity"
        className="w-5 h-5 flex items-center justify-center rounded-sm cursor-pointer text-[#666] text-lg hover:brightness-95 transition-colors"
        style={{ backgroundColor: btnBg }}
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
