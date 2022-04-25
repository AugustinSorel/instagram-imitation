import { FC } from "react";
import { ButtonContainer } from "./Button.styled";

interface Props {
  text: string;
}

const Button: FC<Props> = ({ text }) => {
  return <ButtonContainer>{text}</ButtonContainer>;
};

export default Button;
