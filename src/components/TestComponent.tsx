interface ITestComponentProps {
  className?: string;
}

export const TestComponent: React.FC<ITestComponentProps> = ({
  className,
}): JSX.Element => {
  return <div className={className}></div>;
};
