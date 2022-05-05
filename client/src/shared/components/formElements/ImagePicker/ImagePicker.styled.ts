import styled from "styled-components";

export const ImagePickerContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const ImagePickerImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  align-self: center;
`;

export const ImagePickerInput = styled.input`
  opacity: 0;

  position: absolute;
  inset: 0;
  cursor: pointer;
`;
