import { FC } from "react";
import { Svg } from "./SvgIcon.styled";

interface Props {
  path: string;
}

const SvgIcon: FC<Props> = ({ path }) => {
  return (
    <Svg
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </Svg>
  );
};

export default SvgIcon;
