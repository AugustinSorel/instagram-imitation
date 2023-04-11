import Image, { type ImageProps } from "next/image";

export const Avatar = (props: Pick<ImageProps, "src">) => {
  return (
    <Image
      {...props}
      alt="user profile"
      width={36}
      height={36}
      className="rounded-full"
    />
  );
};
