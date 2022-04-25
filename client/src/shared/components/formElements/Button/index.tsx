import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { ButtonContainer } from "./Button.styled";

interface Props {
  text: string;
}

const Button: FC<Props> = ({ text }) => {
  return (
    <ButtonContainer
      whileHover={{ ...scaleUp }}
      whileFocus={{ ...scaleUp }}
      whileTap={{ ...scaleDown }}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;
