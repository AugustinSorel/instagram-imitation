import { AnimatePresence } from "framer-motion";
import { MouseEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { listItemVariants } from "../../../../framerMotion/listAnimationVariants";
import cardVariants from "../../../../framerMotion/postCardVariants";
import Post from "../../../../types/post";
import User from "../../../../types/user";
import icons from "../../../../utils/icons";
import SvgIcon from "../../SvgIcon";
import {
  PostGridItemBackdrop,
  PostGridItemContainer,
  PostGridItemDataContainer,
  PostGridItemDataText,
  PostGridItemImage,
} from "./PostGridItem.styled";

type Props = {
  post: Post;
};

const PostGridItem = ({ post }: Props) => {
  const [canShowBackDrop, setCanShowBackDrop] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const mouseEnterHandler = (e: MouseEvent) => {
    setCanShowBackDrop(true);
  };

  const mouseLeaveHandler = (e: MouseEvent) => {
    setCanShowBackDrop(false);
  };

  const clickNavigateHandler = () => {
    console.log("clicked");
    navigate(`/post/${post._id}`);
  };

  const leaveLikeHandler = (e: MouseEvent) => {
    e.stopPropagation();

    console.log("like icon clicked");
  };

  const userLikedPost = () => {
    return user.postsLiked.includes(post._id);
  };

  return (
    <PostGridItemContainer
      variants={listItemVariants}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={clickNavigateHandler}
    >
      <PostGridItemImage src={post.url} />
      <AnimatePresence exitBeforeEnter>
        {canShowBackDrop && (
          <PostGridItemBackdrop
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PostGridItemDataContainer>
              <SvgIcon
                path={userLikedPost() ? icons.heart : icons.camera}
                onClick={leaveLikeHandler}
                inverseColor
              />
              <PostGridItemDataText>{post.likes}</PostGridItemDataText>
            </PostGridItemDataContainer>

            <PostGridItemDataContainer>
              <SvgIcon path={icons.comment} inverseColor />
              <PostGridItemDataText>{0}</PostGridItemDataText>
            </PostGridItemDataContainer>
          </PostGridItemBackdrop>
        )}
      </AnimatePresence>
    </PostGridItemContainer>
  );
};

export default PostGridItem;
