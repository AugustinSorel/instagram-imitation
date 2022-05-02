import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { ButtonContainer } from "./Button.styled";

interface Props {
  text: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({ text, ...rest }) => {
  return (
    <ButtonContainer
      whileHover={{ ...scaleUp }}
      whileFocus={{ ...scaleUp }}
      whileTap={{ ...scaleDown }}
      {...rest}
    >
      {text}
    </ButtonContainer>
  );
};

export default Button;
