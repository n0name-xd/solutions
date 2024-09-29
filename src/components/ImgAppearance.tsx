import { useEffect, useRef, useState, useCallback } from "react";
import img from "../assets/react.svg";
import img2 from "../assets/images.png";

interface ITrafficLIghtIndicatorProps {
  img: string;
  indicatorColor: string;
}
export const TrafficLIghtIndicator = ({
  img,
  indicatorColor,
}: ITrafficLIghtIndicatorProps) => {
  const [isShowFormula, setIsShowFormula] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = useCallback(() => {
    setTrigger(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsShowFormula(false);
  }, []);

  const setFormulaPosition = useCallback((trigger: boolean) => {
    if (trigger) {
      timerRef.current = setTimeout(() => {
        if (trigger) {
          setIsShowFormula(true);
        }
      }, 900);
    }
  }, []);

  useEffect(() => {
    setFormulaPosition(trigger);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [trigger, setFormulaPosition]);

  return (
    <div className="relative">
      <div
        ref={indicatorRef}
        onMouseEnter={() => setTrigger(true)}
        onMouseLeave={handleMouseLeave}
        className={`w-4 h-4 rounded-full ${indicatorColor}`}
      ></div>
      {isShowFormula && (
        <div className="border-[10px] border-black w-10 h-10 rounded-md absolute top-[-50px] left-[10px]">
          <img src={img} alt="formula" />
        </div>
      )}
    </div>
  );
};

export const ImgAppearance = (): JSX.Element => {
  return (
    <div className="w-full flex justify-center h-full items-center mt-10">
      <div className="relative border-2 border-red-700 w-96 h-96 rounded-2xl">
        <div className="flex gap-4 items-center  mt-20 ml-20">
          <TrafficLIghtIndicator img={img} indicatorColor="bg-green-700" />

          <div>marginality</div>
        </div>
        <div className="flex gap-4 items-center  mt-20 ml-20">
          <TrafficLIghtIndicator img={img2} indicatorColor="bg-red-600" />
          <div>income</div>
        </div>
      </div>
    </div>
  );
};
