import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import { ButtonContainer, TextButtonContainer } from "./Button.styled";

interface Props {
  text: string;
  onClick?: () => void;
  type?: "action" | "text";
  color?: string;
}

const Button: FC<Props> = ({ text, type, ...rest }) => {
  if (type === "text") {
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
