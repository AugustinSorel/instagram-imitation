import Image, { type ImageProps } from "next/image";

export const Avatar = (props: ImageProps) => {
  return (
    <Image
      {...props}
      alt="user profile"
      width={400}
      height={400}
      className="rounded-full"
    />
  );
};
