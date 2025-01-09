import { SLIDES, TIMELINE } from "@/dataSets";
import React from "react";

export default function Timeline({ activeItem, selectRGE, mainColor }){

  function invertNumber(num) {
    return -num;
  }

  const getStyle = (key) => {
    if (key === activeItem.key) {
      return { background: mainColor };
    }
  };

  const isShowText = (index) => {
    const difference = Math.abs(activeItem.index - index);
    return difference < 2;
  };


  return(
    <div className="border-t-2 border-b-2 border-white h-[450px] relative">
        <div className="w-full z-30 flex justify-end">
          <div className="w-3/5 z-30 text-white flex flex-col">
            <div className="w-4/5 py-16">
              <div className="font-bold pb-5 text-xl">{activeItem?.name?.toUpperCase()}</div>
              <div className="text-lg line-clamp-6 md:line-clamp-none">
                {activeItem?.description}
              </div>
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

        <div className="absolute h-full flex items-center sm:-ml-36 -ml-60 top-0 z-20">
          <div
            className="carousel relative w-[364px] h-[364px] border-2 rounded-full border-white"
            style={{ transform: `rotate(${activeItem.position}deg)` }}
          >
            {TIMELINE.map((item, i) => (
              <button
                className="item-carousel absolute rounded-full border border-white bg-white w-[20px] h-[20px] bottom-0 flex justify-center items-center"
                onClick={() => selectRGE(item, i)}
                key={item.key}
                id={item.id}
                style={{
                  transform: `rotate(${invertNumber(activeItem.position)}deg)`,
                  ...getStyle(item?.key),
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
  )
}