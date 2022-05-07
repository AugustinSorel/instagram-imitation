import { useNavigate } from "react-router-dom";
import icons from "../../../utils/icons";
import Button from "../../formElements/Button";
import SvgIcon from "../SvgIcon";
import {
  NoPostWarningContainer,
  NoPostWarningTitle,
} from "./NoPostWarning.styled";

type Props = {
  title: string;
  callToActionText: string;
  navigateTo: string;
};

const NoPostWarning = ({ title, callToActionText, navigateTo }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(navigateTo);
  };

  return (
    <NoPostWarningContainer>
      <SvgIcon path={icons.warning} nonClickable />
      <NoPostWarningTitle>{title}</NoPostWarningTitle>
      <Button text={callToActionText} onClick={clickHandler} />
    </NoPostWarningContainer>
  );
};

export default NoPostWarning;
