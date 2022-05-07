import switchTransition from "../../../framerMotion/switchTransition";
import { scaleUp, scaleDown } from "../../../framerMotion/whileVariants";
import icons from "../../../utils/icons";
import SvgIcon from "../../UIElements/SvgIcon";
import { SwitchContainer } from "./Switch.styled";

type Props = {
  isOn: boolean;
  onClick: () => void;
};

const Switch = ({ isOn, ...rest }: Props) => {
  return (
    <SwitchContainer
      whileHover={{ ...scaleUp }}
      whileTap={{ ...scaleDown }}
      $isOn={isOn}
      {...rest}
    >
      <SvgIcon path={icons.themeMode} layout transition={switchTransition} />
    </SwitchContainer>
  );
};

export default Switch;
