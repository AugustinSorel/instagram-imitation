import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import { NewPostPageContainer } from "./NewPostPage.styled";

const NewPostsPage = () => {
  return (
    <NewPostPageContainer>
      <MaxWidthWrapper>
        <h1>New Post</h1>
      </MaxWidthWrapper>
    </NewPostPageContainer>
  );
};

export default NewPostsPage;
