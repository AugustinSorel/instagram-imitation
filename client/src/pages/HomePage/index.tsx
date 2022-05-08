import SvgIcon from "../../shared/components/UIElements/SvgIcon";
import MaxWidthWrapper from "../../shared/components/wrappers/MaxWidthWrapper";
import PageTransitionWrapper from "../../shared/components/wrappers/PageTransitionWrapper";
import icons from "../../shared/utils/icons";
import {
  HomePageContainer,
  PageContainer,
  PostCard,
  PostCardBody,
  PostCardFooter,
  PostCardFooterDataContainer,
  PostCardFooterDataTitle,
  PostCardHeader,
  PostCardHeaderAvatar,
  PostCardHeaderTitle,
} from "./HomePage.styled";

const HomePage = () => {
  return (
    <HomePageContainer>
      <PageTransitionWrapper>
        <MaxWidthWrapper>
          <PageContainer>
            <PostCard>
              <PostCardHeader>
                <PostCardHeaderTitle>hello3</PostCardHeaderTitle>
                <PostCardHeaderAvatar src="https://res.cloudinary.com/dvjmzgrqq/image/upload/v1651765978/instagram-imitation/avatars/627278431e8a3fcc5d62f6bc.png" />
              </PostCardHeader>

              <PostCardBody src="https://www.motortrend.com/uploads/sites/5/2021/04/2021-bmw-m4-exterior-01.jpg?fit=around%7C1000:625" />

              <PostCardFooter>
                <PostCardFooterDataContainer>
                  <SvgIcon path={icons.heart} />
                  <PostCardFooterDataTitle>3</PostCardFooterDataTitle>
                </PostCardFooterDataContainer>
                <PostCardFooterDataContainer>
                  <SvgIcon path={icons.comment} />
                  <PostCardFooterDataTitle>2</PostCardFooterDataTitle>
                </PostCardFooterDataContainer>
              </PostCardFooter>
            </PostCard>

            <PostCard>
              <PostCardHeader>
                <PostCardHeaderTitle>hello2</PostCardHeaderTitle>
                <PostCardHeaderAvatar src="https://res.cloudinary.com/dvjmzgrqq/image/upload/v1651695861/instagram-imitation/avatars/6272e0df1ef7120ef329afce.png" />
              </PostCardHeader>

              <PostCardBody src="https://cdn.motor1.com/images/mgl/mr32B/s2/bmw-m4.jpg" />

              <PostCardFooter>
                <PostCardFooterDataContainer>
                  <SvgIcon path={icons.heart} />
                  <PostCardFooterDataTitle>3</PostCardFooterDataTitle>
                </PostCardFooterDataContainer>
                <PostCardFooterDataContainer>
                  <SvgIcon path={icons.comment} />
                  <PostCardFooterDataTitle>2</PostCardFooterDataTitle>
                </PostCardFooterDataContainer>
              </PostCardFooter>
            </PostCard>
          </PageContainer>
        </MaxWidthWrapper>
      </PageTransitionWrapper>
    </HomePageContainer>
  );
};

export default HomePage;
