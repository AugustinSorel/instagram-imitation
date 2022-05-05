import { FC } from "react";
import { scaleDown, scaleUp } from "../../../framerMotion/whileVariants";
import Loader from "../../UIElements/Loader";
import {
  ButtonContainer,
  ButtonLoaderContainer,
  TextButtonContainer,
} from "./Button.styled";

interface Props {
  text: string;
  onClick?: () => void;
  style?: "action" | "text";
  color?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<Props> = ({ text, style, isLoading, ...rest }) => {
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
      <ButtonLoaderContainer>{isLoading && <Loader />}</ButtonLoaderContainer>
    </ButtonContainer>
  );
};

export default Button;
