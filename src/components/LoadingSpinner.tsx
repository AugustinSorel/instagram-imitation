export const LoadingSpinner = () => {
  return (
    <div
      className="inline-block aspect-square w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
};
