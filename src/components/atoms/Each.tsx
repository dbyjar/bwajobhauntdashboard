import { FC } from "react";

type EachProps = {
  of: Array<any>;
  render: ({ item, index }: { item: any; index: number }) => JSX.Element;
};

const Each: FC<EachProps> = ({ of, render }) => {
  return <>{of.map((item, index) => render({ item, index }))}</>;
};

export default Each;
