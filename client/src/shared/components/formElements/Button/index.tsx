import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { ButtonContainer, TextButtonContainer } from "./Button.styled";

interface Props {
  text: string;
  onClick?: () => void;
  style?: "action" | "text";
  color?: string;
  type?: "button" | "submit" | "reset";
}

const Button: FC<Props> = ({ text, style, ...rest }) => {
  if (style === "text") {
    return (
      <TextButtonContainer
        whileHover={{ ...scaleUp }}
        whileFocus={{ ...scaleUp }}
        whileTap={{ ...scaleDown }}
        {...rest}
      >
        {text}
      </TextButtonContainer>
    );
  }

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
