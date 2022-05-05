import styled from "styled-components";

export const ImagePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

export const ImagePickerImage = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  align-self: center;
`;

export const ImagePickerInput = styled.input`
  opacity: 0;

  position: absolute;

  height: 100%;
  width: 100%;
  background-color: red;
`;
