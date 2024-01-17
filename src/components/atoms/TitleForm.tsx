import { FC } from "react";

interface TitleFormProps {
  title: string;
  subtitle: string;
}

const TitleForm: FC<TitleFormProps> = ({ title, subtitle }: TitleFormProps) => {
  return (
    <>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-gray-400">{subtitle}</div>
    </>
  );
};

export default TitleForm;
