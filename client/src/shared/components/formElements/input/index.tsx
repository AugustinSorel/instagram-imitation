import { FC } from "react";
import { scaleUp } from "../../../framerMotion/whileVariants";
import { InputContainer } from "./Input.styled";

interface Props {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({ ...rest }) => {
  return (
    <InputContainer
      {...rest}
      whileHover={{ ...scaleUp }}
      whileFocus={{ ...scaleUp }}
      autoComplete="no"
    />
  );
};

export default Input;
