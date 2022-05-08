import NoPostWarning from "../../shared/components/UIElements/NoPostWarning";
import SvgIcon from "../../shared/components/UIElements/SvgIcon";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import PageTransitionWrapper from "../../shared/components/wrappers/PageTransitionWrapper";
import { HomePageContainer } from "./HomePage.styled";

const HomePage = () => {
  return (
    <HomePageContainer>
      <PageTransitionWrapper>
        <MaxWidthWrapper>
          <NoPostWarning
            callToActionText="explore"
            navigateTo="/explore"
            title="No friends"
          />
        </MaxWidthWrapper>
      </PageTransitionWrapper>
    </HomePageContainer>
  );
};

export default HomePage;
