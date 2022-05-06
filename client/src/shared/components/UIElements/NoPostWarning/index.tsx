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
};

const NoPostWarning = ({ title }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/new-post");
  };

  return (
    <NoPostWarningContainer>
      <SvgIcon path={icons.warning} nonClickable />
      <NoPostWarningTitle>{title}</NoPostWarningTitle>
      <Button text="New Post" onClick={clickHandler} />
    </NoPostWarningContainer>
  );
};

export default NoPostWarning;
