import { LoopingRhombusesSpinner } from "react-epic-spinners";
type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="page-center">
      <LoopingRhombusesSpinner />
    </div>
  );
};

export default Loading;
