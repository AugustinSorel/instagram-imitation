import { useQuery } from "react-query";
import { getExplorePosts } from "../../../shared/api/postsApi";
import Loader from "../../../shared/components/UIElements/Loader";
import NoPostWarning from "../../../shared/components/UIElements/NoPostWarning";
import PostsGrid from "../../../shared/components/UIElements/PostsGrid";
import { ExplorePageBodyLoaderContainer } from "./ExploreBodyPage.styled";

type Props = {};

const ExplorePageBody = (props: Props) => {
  const { data, isLoading } = useQuery("userExplorePosts", getExplorePosts, {
    refetchOnWindowFocus: false,
  });

  if (!data || isLoading) {
    return (
      <ExplorePageBodyLoaderContainer>
        <Loader />
      </ExplorePageBodyLoaderContainer>
    );
  }

  if (data.length === 0) {
    return (
      <NoPostWarning
        title="Like a post"
        callToActionText="explore"
        navigateTo="/explore"
      />
    );
  }

  return (
    <div style={{ height: "100px" }}>
      <PostsGrid posts={data} />
    </div>
  );
};

export default ExplorePageBody;
