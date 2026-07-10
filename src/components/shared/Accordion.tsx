import type { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

import { AccordionSectionContext } from "./ProductCard/sectionContext";
import Products from "../ui/Products";
import type { RootState } from "../../store/store";
import type { T_product } from "../../types/api-types";
import { TiArrowSortedDown } from "react-icons/ti";

interface I_accordionProps {
  icon: string;
  label: string;
  section: string;
  index: number;
  openedAccordion: number;
  setOpenedAccordion: Dispatch<SetStateAction<number>>;
  next: string;
  products: T_product[];
}

const Accordion = ({
  icon,
  label,
  section,
  index,
  openedAccordion,
  setOpenedAccordion,
  next,
  products,
}: I_accordionProps) => {
  const isOpen = openedAccordion === index + 1;
  const normalizedSection = section.toLowerCase();
  const selectedCount = useSelector((state: RootState) => {
    switch (normalizedSection) {
      case "plans":
        return state.products.plans.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
      case "sensors":
        return state.products.sensors.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
      case "accessories":
        return state.products.accessories.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
      default:
        return state.products.cameras.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );
    }
  });

  return (
    <div
      className={`relative border-y border-y-[rgb(31, 31, 31)] pt-5 pb-3 px-3.75 flex flex-col cursor-pointer ${isOpen ? "bg-secondary" : "bg-white"} transition-all duration-200 ease-in-out mt-3.5`}
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
        <div className="flex items-center gap-2 text-primary">
          {selectedCount > 0 && (
            <span className="font-medium text-sm">
              {selectedCount} selected
            </span>
          )}
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
        <div className="overflow-hidden flex flex-col items-center gap-4 w-full">
          {/* products */}
          <AccordionSectionContext.Provider value={normalizedSection}>
            <Products products={products} />
          </AccordionSectionContext.Provider>

          {/* Next Button */}
          {section !== "accessories" && (
            <button
              className="cursor-pointer text-[15px] font-medium text-primary border border-primary py-0.5 px-3 rounded-sm hover:bg-primary hover:text-white active:bg-primary active:text-white transition-all duration-150 ease"
              onClick={(e) => {
                e.stopPropagation();
                setOpenedAccordion(index + 2);
              }}
            >
              Next: {next}
            </button>
          )}
        </div>
      </div>

      {/* step number */}
      <div className="absolute -top-4 left-3.75 font-medium text-[10px] text-[rgb(72, 72, 72)]">
        STEP <span>{index + 1}</span> OF 4
      </div>
    </div>
  );
};

export default Accordion;
