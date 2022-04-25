import { FC } from "react";
import { InputContainer } from "./Input.styled";

interface Props {
  placeholder: string;
  type?: string;
}

const Input: FC<Props> = ({ ...rest }) => {
  return <InputContainer {...rest} autoComplete="no" />;
};

export default Input;
