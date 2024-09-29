import { RefObject, useEffect, useRef, useState } from "react";
import img from "../assets/react.svg";
import img2 from "../assets/images.png";

export const TrafficLIghtIndicator = () => {
  return <></>;
};

export const ImgAppearance = (): JSX.Element => {
  const [isShowFormula, setIsShowFormula] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const marginalityRef = useRef<HTMLDivElement>(null);
  const incomeRef = useRef<HTMLDivElement>(null);
  const [imgItem, setImgItem] = useState<string>(img);
  const [currentRef, setCurrentRef] = useState<RefObject<HTMLDivElement>>();

  const handleMouseEnter = (ref: RefObject<HTMLDivElement>) => {
    setTrigger(true);
    setCurrentRef(ref);
  };

  const handleMouseLeave = () => {
    setTrigger(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsShowFormula(false);
  };

  const setFormulaPosition = (trigger: boolean) => {
    if (currentRef) {
      const elem = currentRef.current;
      if (elem) {
        const imgT = elem.getAttribute("data-formula");

        setImgItem(imgT === "react.svg" ? img : img2);
      }
    }

    if (trigger) {
      timerRef.current = setTimeout(() => {
        if (trigger) {
          setIsShowFormula(true);
        }
      }, 900);
    }
  };

  useEffect(() => {
    setFormulaPosition(trigger);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [trigger]);

  return (
    <div className="w-full flex justify-center h-full items-center mt-10">
      <div className="relative border-2 border-red-700 w-96 h-96 rounded-2xl">
        <div className="flex gap-4 items-center  mt-20 ml-20">
          <div
            ref={marginalityRef}
            data-formula="react.svg"
            onMouseEnter={() => handleMouseEnter(marginalityRef)}
            onMouseLeave={handleMouseLeave}
            className="w-4 h-4 rounded-full bg-green-700"
          ></div>
          <div>marginality</div>
        </div>
        <div className="flex gap-4 items-center  mt-20 ml-20">
          <div
            ref={incomeRef}
            data-formula="images.png"
            onMouseEnter={() => handleMouseEnter(incomeRef)}
            onMouseLeave={handleMouseLeave}
            className="w-4 h-4 rounded-full bg-slate-500"
          ></div>
          <div>income</div>
        </div>

        {isShowFormula && (
          <div className="border-[10px] border-black w-10 h-10 rounded-md absolute top-0 left-0">
            <img src={imgItem} alt="formula" />
          </div>
        )}
      </div>
    </div>
  );
};
