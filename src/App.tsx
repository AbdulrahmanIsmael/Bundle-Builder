import "./App.css";

import Accordions from "./components/ui/Accordions";
import Review from "./components/ui/Review";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <main className="w-full max-w-350 mx-auto px-4 md:px-4 2xl:px-8">
        <h1 className="md:hidden w-full text-[31.88px] tracking-[-0.06px] leading-[110%] text-center text-[rgba(31, 31, 31, 1)] font-gilroy font-bold pb-[0.8em]">
          Let's get started!
        </h1>

        <div className="flex flex-col md:flex-row 2xl:flex-col md:gap-5 2xl:gap-8 2xl:items-start">
          <div className="w-full 2xl:flex-1 2xl:min-w-0">
            <Accordions />
          </div>
          <div className="2xl:w-full 2xl:shrink-0 2xl:sticky 2xl:top-6">
            <Review />
          </div>
        </div>
      </main>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
