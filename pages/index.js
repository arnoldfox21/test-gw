import { Urbanist } from "next/font/google";
import { TIMELINE, SLIDES } from "@/dataSets";
import { useRef, useState } from "react";

import Carousel from "@/components/Carousel";
import Timeline from "@/components/Timeline";

const urbanistSans = Urbanist({
  subsets: ["latin"],
});

// const notches = [17, -19, -53, -89, -125, -161]
const mainColor = "#e53b5e";
const defaultScroll = { index: 0, position: 0 };

export default function Home() {
  const refSlider = useRef();

  const [activeItem, setActiveItem] = useState({ ...TIMELINE[2], index: 2 });
  const [scrollData, setScrollData] = useState(defaultScroll);

  const selectRGE = (item, index) => {
    setActiveItem({ ...item, index });
    setScrollData(defaultScroll);
  };


  const generateQuery = (pos, isIncrease = false) => {
    if (isIncrease) {
      return {
        index: scrollData.index + 1,
        position: scrollData.position + pos,
      };
    } else {
      return {
        index: scrollData.index - 1,
        position: scrollData.position - pos,
      };
    }
  };

  const handlePressNavigation = (toLeft = false) => {
    const slider = refSlider.current;
    const pos = slider.clientWidth;

    if (toLeft) {
      if (scrollData.index > 0) {
        const query = generateQuery(pos);
        slider.scrollTo({ left: query.position, behavior: "smooth" });
        setScrollData(query);
      }
    } else {
      if (scrollData.index >= 3) {
        slider.scrollBy({ left: -scrollData.position, behavior: "smooth" });
        setScrollData(defaultScroll);
      } else {
        const query = generateQuery(pos, true);
        slider.scrollBy({ left: pos, behavior: "smooth" });
        setScrollData(query);
      }
    }
  };

  return (
    <div
      className={`${urbanistSans.className} bg-[#242424] min-h-screen flex w-full flex-col`}
    >
      <div className="py-10 px-20 font-bold text-3xl text-white">TIMELINE</div>
      {/* timeline section */}
      <Timeline activeItem={activeItem} selectRGE={selectRGE} mainColor={mainColor} />
      <Carousel
        activeItem={activeItem}
        scrollData={scrollData}
        refSlider={refSlider}
        onPressNavigation={handlePressNavigation}
        mainColor={mainColor}
      />
    </div>
  );
}
