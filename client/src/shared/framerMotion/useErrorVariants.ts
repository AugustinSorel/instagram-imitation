import useCurrentTheme from "../store/useCurrentTheme";
import darkTheme from "../styles/darkTheme";
import lightTheme from "../styles/lightTheme";

const useErrorVariants = () => {
  const { isDarkMode } = useCurrentTheme();

  if (isDarkMode) {
    return {
      animate: {
        x: [0, -50, 50, 0],
        color: [
          darkTheme.colors.color,
          darkTheme.colors.error,
          darkTheme.colors.color,
        ],
        borderColor: [
          darkTheme.colors.border,
          darkTheme.colors.error,
          darkTheme.colors.border,
        ],
      },
    };
  }

  return {
    animate: {
      x: [0, -50, 50, 0],
      color: [
        lightTheme.colors.color,
        lightTheme.colors.error,
        lightTheme.colors.color,
      ],
      borderColor: [
        lightTheme.colors.border,
        lightTheme.colors.error,
        lightTheme.colors.border,
      ],
    },
  };
};

export default useErrorVariants;
