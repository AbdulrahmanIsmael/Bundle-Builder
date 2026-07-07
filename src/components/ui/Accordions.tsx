import Accordion from "../shared/Accordion";
import livestreamIcon from "../../assets/icons/livestream.svg"
import protectionIcon from "../../assets/icons/protection.svg"
import sensorIcon from "../../assets/icons/sensor.svg"
import shieldIcon from "../../assets/icons/shield.svg"
import { getProducts } from "../../utils/api";
import { useState, useEffect } from "react";
import type { T_camera } from "../../types/api-types";

const accordionDetails = {
cameras: {
  section: "cameras",
  icon: livestreamIcon,
  label: "Choose your cameras",
},
plan: {
  section: "plans",
  icon: protectionIcon,
  label: "Choose your plan",
},
sensors: {
  section: "sensors",
  icon: sensorIcon,
  label: "Choose your sensors",
},
protection: {
  section: "protection",
  icon: shieldIcon,
  label: "Add extra protection",
},
}

const Accordions = () => {
  const [openedAccordion, setOpenedAccordion] = useState<number>(1);
  const [cameras, setCameras] = useState<T_camera[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (!products) return
      setCameras(products.cameras)
    }
    fetchProducts();
  }, [])

  return (
    <section>
      <ul className="flex flex-col gap-2.5">
        {Object.values(accordionDetails).map((accordion, index, array) => {
          const currentProducts = accordion.section === "cameras" ? cameras : [];

          return (
            <li key={index}>
              <Accordion 
                icon={accordion.icon} 
                label={accordion.label} 
                index={index} 
                openedAccordion={openedAccordion} 
                setOpenedAccordion={setOpenedAccordion} 
                next={index !== array.length - 1 ? array[index+1].label : ""} 
                products={currentProducts}
              />
            </li>
          )
        })}
      </ul>
    </section>
  );
};

export default Accordions;
