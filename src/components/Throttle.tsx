import { useEffect, useState } from "react";

interface IThrottleProps {
  className?: string;
}

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const getComments = async (name: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);

  const data = await res.json();

  return data.filter((el: IComment) => el.name.includes(name));
};

export const Throttle: React.FC<IThrottleProps> = ({
  className,
}): JSX.Element => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [value, setValue] = useState<string>("");

  const handleInput = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    getComments(value).then((res) => setComments(res));
  }, [value]);

  return (
    <div className={className}>
      <h1 className="m-2">Items count: {comments.length}</h1>
      <div className="p-2 flex gap-5">
        <label htmlFor="">Search</label>
        <input
          className="border-2 border-gray-500"
          type="text"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
      {comments.map((e) => {
        return (
          <div key={e.id} className="flex gap-6 border-2 border-gray-400">
            <div>{e.id}</div>
            <div>{e.name}</div>
          </div>
        );
      })}
    </div>
  );
};
