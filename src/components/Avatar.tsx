import Image, { type ImageProps } from "next/image";

export const Avatar = ({ alt, className = "", ...props }: ImageProps) => {
  return (
    <Image
      width={36}
      height={36}
      className={`rounded-full ${className}`}
      alt={alt}
      {...props}
    />
  );
};
