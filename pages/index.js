import { Urbanist } from "next/font/google";
import { TIMELINE, SLIDES } from "@/dataSets";
import { useRef, useState } from "react";

import Carousel from "@/components/Carousel";

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

  const getCssClass = (key) => {
    if (key === activeItem.key) {
      return `!bg-[${mainColor}] border border-white`;
    }
  };

  function invertNumber(num) {
    return -num;
  }

  const isShowText = (index) => {
    const difference = Math.abs(activeItem.index - index);
    return difference < 2;
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
      <div className="border-t-2 border-b-2 border-white h-[450px] relative">
        <div className="w-full z-30 flex justify-end">
          <div className="w-3/5 z-30 text-white flex flex-col">
            <div className="w-4/5 py-16">
              <div className="font-bold pb-5 text-xl">{activeItem?.title}</div>
              <div className="text-lg line-clamp-6 md:line-clamp-none">{activeItem?.description}</div>
            </div>
          </div>
        </div>
        <div className="h-full w-full absolute flex justify-center blur-sm brightness-50 z-0 top-0 left-0">
          {SLIDES.map((item, i) => (
            <div
              className={`absolute h-full w-full flex justify-center top-0 left-0 transition-opacity z-0 duration-500 ease-in-out ${
                activeItem?.key === item?.key ? "opacity-100" : "opacity-0"
              }`}
              key={i}
            >
              <img src={item?.image} className="object-fill" />
            </div>
          ))}
        </div>

        <div className="absolute h-full flex items-center sm:-ml-44 -ml-60 top-0 z-20">
          <div
            className="carousel"
            style={{ transform: `rotate(${activeItem.position}deg)` }}
          >
            {TIMELINE.map((item, i) => (
              <button
                className={`item-carousel ${getCssClass(item?.key)}`}
                onClick={() => selectRGE(item, i)}
                key={item.key}
                id={item.id}
                style={{
                  transform: `rotate(${invertNumber(activeItem.position)}deg)`,
                }}
              >
                {isShowText(i) && (
                  <div
                    className={`-ml-28 text-white ${
                      activeItem?.key === item.key ? "font-bold" : ""
                    }`}
                  >
                    {item?.title}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
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
