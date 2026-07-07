import { TiArrowSortedDown } from "react-icons/ti";
import type { Dispatch, SetStateAction } from "react";
import type { T_camera } from "../../types/api-types";
import Products from "../ui/Products";

interface I_accordionProps {
  icon: string;
  label: string;
  index: number;
  openedAccordion: number;
  setOpenedAccordion: Dispatch<SetStateAction<number>>;
  next: string;
  products: T_camera[];
}

const Accordion = ({
  icon,
  label,
  index,
  openedAccordion,
  setOpenedAccordion,
  next,
  products,
}: I_accordionProps) => {
  const isOpen = openedAccordion === index + 1;

  return (
    <div
      className={`relative border-y border-y-[rgb(31, 31, 31)] pt-5 pb-3 px-[15px] flex flex-col cursor-pointer ${isOpen ? "bg-secondary" : "bg-white"} transition-all duration-200 ease-in-out mt-3.5`}
      role="button"
      onClick={() =>
        setOpenedAccordion((prev) => (prev === index + 1 ? 0 : index + 1))
      }
    >
      <div className="flex items-center gap-4 w-full justify-between">
        {/* Title + icon */}
        <div className="flex items-center gap-x-2">
          <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{label}</h2>
        </div>

        {/* expand/collapse icon */}
        <div className="flex items-center gap-1 text-primary">
          {/* <span className="font-medium text-sm">0 selected</span> */}
          <TiArrowSortedDown size={20} />
        </div>
      </div>

      {/* Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden flex flex-col items-center gap-4">
          {/* products */}
          <Products products={products} />

          {/* Next Button */}
          <button
            className="cursor-pointer text-[15px] font-medium text-primary border border-primary py-0.5 px-3 rounded-sm hover:bg-primary hover:text-white active:bg-primary active:text-white transition-all duration-150 ease"
            onClick={(e) => {
              e.stopPropagation();
              setOpenedAccordion(index + 2);
            }}
          >
            Next: {next}
          </button>
        </div>
      </div>

      {/* step number */}
      <div className="absolute -top-4 left-[15px] font-medium text-[10px] text-[rgb(72, 72, 72)]">
        STEP <span>{index + 1}</span> OF 4
      </div>
    </div>
  );
};

export default Accordion;
