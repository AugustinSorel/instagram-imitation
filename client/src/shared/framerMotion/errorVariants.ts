import theme from "../styles/theme";

const errorVariants = {
  animate: {
    x: [0, -50, 50, 0],
    color: [theme.colors.color, theme.colors.error, theme.colors.color],
    borderColor: [theme.colors.border, theme.colors.error, theme.colors.border],
  },
};

export default errorVariants;
