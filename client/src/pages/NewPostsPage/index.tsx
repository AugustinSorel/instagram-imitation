import { ChangeEvent, useRef } from "react";
import Button from "../../shared/components/formElements/Button";
import SvgIcon from "../../shared/components/UIElements/SvgIcon";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import icons from "../../shared/utils/icons";
import {
  NewPostBrowseInput,
  NewPostContainer,
  NewPostForm,
  NewPostTitle,
} from "./NewPostPage.styled";

const NewPostsPage = () => {
  const fileInput = useRef<HTMLInputElement>(null);

  const selectClickHandler = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      console.log("No file selected");
      return;
    }

    const file = e.target.files[0];

    console.log("submitted", file);
  };

  return (
    <NewPostContainer>
      <MaxWidthWrapper>
        <NewPostForm>
          <SvgIcon path={icons.camera} />
          <NewPostTitle>add a new post</NewPostTitle>

          <NewPostBrowseInput
            ref={fileInput}
            type="file"
            onChange={fileChangeHandler}
          />
          <Button text="select" onClick={selectClickHandler} type="button" />
        </NewPostForm>
      </MaxWidthWrapper>
    </NewPostContainer>
  );
};

export default NewPostsPage;
