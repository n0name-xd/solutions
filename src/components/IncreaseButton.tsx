import { Dispatch, SetStateAction } from "react";

const IncreaseButton = ({
  setCount,
}: {
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <button onClick={() => setCount((count: number) => count + 1)}>
      Increase
    </button>
  );
};

export default IncreaseButton;
