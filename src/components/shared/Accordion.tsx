import type { Dispatch, SetStateAction } from "react";

import { AccordionSectionContext } from "./ProductCard/sectionContext";
import Products from "../ui/Products";
import type { RootState } from "../../store/store";
import type { T_product } from "../../types/api-types";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";

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
      className={`py-3 flex flex-col cursor-pointer transition-all duration-200 ease-in-out ${
        isOpen
          ? "bg-secondary rounded-[10px]"
          : "bg-white border-b border-b-[rgb(31, 31, 31)]"
      }`}
      role="button"
      onClick={() =>
        setOpenedAccordion((prev) => (prev === index + 1 ? 0 : index + 1))
      }
    >
      <div className="font-medium text-[10px] md:text-xs tracking-[1.6px] pb-2 mb-2 text-[rgb(72, 72, 72)] border-b border-b-[rgb(31, 31, 31)]">
        <span className="px-3.75">
          STEP <span>{index + 1}</span> OF 4
        </span>
      </div>
      <div className="flex items-center gap-4 w-full justify-between px-3.75">
        {/* Title + icon */}
        <div className="flex items-center gap-x-2">
          <img
            src={icon}
            alt={`${label} icon`}
            className="w-5 md:w-6.5 h-5 md:h-6.5"
          />
          <h2 className="text-lg md:text-[22px] font-semibold">{label}</h2>
        </div>

        {/* expand/collapse icon */}
        <div className="flex items-center gap-2 text-primary">
          {selectedCount > 0 && (
            <span className="font-medium text-sm leading-4 tracking-normal">
              {selectedCount} selected
            </span>
          )}
          <TiArrowSortedDown
            size={20}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out px-3.75 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-3 bg-secondary"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden flex flex-col items-center gap-4 w-full">
          {/* products */}
          <AccordionSectionContext.Provider value={normalizedSection}>
            <Products products={products} />
          </AccordionSectionContext.Provider>

          {/* Next Button */}
          {section !== "accessories" && (
            <button
              className="cursor-pointer text-[15px] 2xl:text-lg! font-semibold text-primary border border-primary py-1.25 px-6 rounded-sm hover:bg-primary hover:text-white active:bg-primary active:text-white transition-all duration-150 ease"
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
      {/* <div className="absolute -top-5 left-3.75 font-medium text-[10px] md:text-xs tracking-[1.6px] text-[rgb(72, 72, 72)]">
        STEP <span>{index + 1}</span> OF 4
      </div> */}
    </div>
  );
};

export default Accordion;
