import React from "react";
import { ArrowRight } from "@/icons";

export default function Carousel({
  onPressNavigation,
  activeItem,
  scrollData,
  mainColor,
  refSlider,
}) {
  const handleOpenMap = () => {
    window.open(`https://www.google.com/maps/place/${activeItem.name}/`);
  };

  return (
    <div className="sm:p-16 p-2 pt-8 sm:pr-0 relative">
      <div className="text-xl text-white font-bold pb-5">Locations</div>
      <div className="w-full flex sm:flex-row flex-col h-96 z-20">
        <div className="sm:w-4/6 w-full h-full relative">
          <div className="absolute top-5 sm:-right-6 right-0 z-30 flex flex-col gap-y-3">
            <button
              className="p-3 rounded-full hover:scale-105 ease-in-out transition-all duration-100"
              onClick={() => onPressNavigation()}
              style={{ background: mainColor }}
            >
              <ArrowRight />
            </button>
            <button
              onClick={() => onPressNavigation(true)}
              className="p-3 rounded-full rotate-180 hover:scale-105 ease-in-out transition-all duration-100"
              style={{ background: mainColor }}
            >
              <ArrowRight />
            </button>
          </div>
          <div
            className="overflow-hidden h-full flex flex-nowrap"
            ref={refSlider}
          >
            {activeItem?.timeline?.map((data, i) => (
              <div
                key={i}
                className="space-y-4 flex-none rounded-xl w-full flex flex-col items-center justify-center"
              >
                <img
                  src={data?.image}
                  className="rounded-xl object-cover h-96 w-full z-20"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-2/6 w-full flex h-full justify-end items-end z-20">
          <div className="p-6 bg-[#323232] sm:w-2/3 w-full rounded-l-xl sm:rounded-r-none rounded-r-xl flex justify-center sm:justify-start">
            <button
              style={{ borderColor: mainColor, color: mainColor }}
              className="rounded-full border p-2 px-4"
              onClick={handleOpenMap}
            >
              View Map
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end z-10 sm:-mt-[44px] mt-28">
        <div className="bg-[#4d73b6] z-10 rounded-xl bg-opacity-70 min-h-56 sm:w-4/6 w-full text-white sm:p-20 p-4 sm:pr-32">
          <div className="font-bold text-2xl pb-4">
            {activeItem?.timeline[scrollData.index]?.title}
          </div>
          <div className="text-xl">
            {activeItem?.timeline[scrollData.index]?.description}
          </div>
        </div>
      </div>
      <div className="-rotate-90 overflow-hidden absolute top-[140px] z-0 right-0">
        <svg height="500" width="780" xmlns="http://www.w3.org/2000/svg">
          <path
            id="lineAC"
            d="M -14 180 q 400 -300 920 0"
            stroke="#4863ac"
            fill="none"
            stroke-width="44"
          />
        </svg>
      </div>
    </div>
  );
}
