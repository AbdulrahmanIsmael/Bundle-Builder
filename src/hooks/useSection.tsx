import { useContext } from "react";
import { AccordionSectionContext } from "../components/shared/ProductCard/sectionContext";

const useSection = () => {
  const section = useContext(AccordionSectionContext);
  const normalizedSection = section?.toLowerCase() ?? "";
  const isPlanSection = normalizedSection.includes("plan");
  const isSensorSection = normalizedSection.includes("sensor");
  const isAccessoriesSection = normalizedSection.includes("accessorie");

  return {
    section,
    normalizedSection,
    isPlanSection,
    isSensorSection,
    isAccessoriesSection,
  };
};

export default useSection;
