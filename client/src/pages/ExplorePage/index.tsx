import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import PageTransitionWrapper from "../../shared/components/wrappers/PageTransitionWrapper";
import { ExplorePageContainer } from "./ExplorePage.styled";
import ExplorePageBody from "./ExplorePageBody";
import ExplorePageHeader from "./ExplorePageHeader";

const ExplorePage = () => {
  return (
    <PageTransitionWrapper>
      <ExplorePageContainer>
        <MaxWidthWrapper>
          <ExplorePageHeader />
          <ExplorePageBody />
        </MaxWidthWrapper>
      </ExplorePageContainer>
    </PageTransitionWrapper>
  );
};

export default ExplorePage;
