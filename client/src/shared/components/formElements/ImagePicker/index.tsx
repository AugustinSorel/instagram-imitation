import {
  ImagePickerContainer,
  ImagePickerImage,
  ImagePickerInput,
} from "./ImagePicker.styled";

type Props = {
  src: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImagePicker = ({ src, onChange }: Props) => {
  return (
    <ImagePickerContainer>
      <ImagePickerImage src={src} alt="userAvatar" />
      <ImagePickerInput type="file" onChange={onChange} />
    </ImagePickerContainer>
  );
};

export default ImagePicker;
