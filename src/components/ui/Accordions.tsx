import { useEffect, useState } from "react";

import Accordion from "../shared/Accordion";
import type { T_product } from "../../types/api-types";
import { getProducts } from "../../utils/api";
import livestreamIcon from "../../assets/icons/livestream.svg";
import protectionIcon from "../../assets/icons/protection.svg";
import sensorIcon from "../../assets/icons/sensor.svg";
import shieldIcon from "../../assets/icons/shield.svg";

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
    section: "accessories",
    icon: shieldIcon,
    label: "Add extra protection",
  },
};

const Accordions = () => {
  const [openedAccordion, setOpenedAccordion] = useState<number>(1);
  const [cameras, setCameras] = useState<T_product[]>([]);
  const [plans, setPlans] = useState<T_product[]>([]);
  const [sensors, setSensors] = useState<T_product[]>([]);
  const [accessories, setAccessories] = useState<T_product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (!products) return;
      setCameras(products.cameras);
      setPlans(products.plans);
      setSensors(products.sensors);
      setAccessories(products.accessories);
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <ul className="flex flex-col">
        {Object.values(accordionDetails).map((accordion, index, array) => {
          let currentProducts: T_product[] = [];
          switch (accordion.section) {
            case "cameras":
              currentProducts = cameras;
              break;
            case "plans":
              currentProducts = plans;
              break;
            case "sensors":
              currentProducts = sensors;
              break;
            case "accessories":
              currentProducts = accessories;
          }

          return (
            <li key={index}>
              <Accordion
                icon={accordion.icon}
                label={accordion.label}
                section={accordion.section}
                index={index}
                openedAccordion={openedAccordion}
                setOpenedAccordion={setOpenedAccordion}
                next={index !== array.length - 1 ? array[index + 1].label : ""}
                products={currentProducts}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Accordions;
