import "./App.css";

import Review from "./components/ui/Review";
import Accordions from "./components/ui/Accordions";

function App() {
  return (
    <main>
      <section className="container">
        <h1 className="w-full text-[31.88px] tracking-[-0.06px] leading-[110%] text-center text-[rgba(31, 31, 31, 1)] font-gilroy font-bold pb-[0.8em]">
          Let's get started!
        </h1>
      </section>

      <Accordions />
      <Review />
    </main>
  );
}

export default App;
