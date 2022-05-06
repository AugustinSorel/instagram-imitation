import { AnimatePresence } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { likePost } from "../../../../api/postsApi";
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
import useLikePostMutate from "./useLikePostMutate";

type Props = {
  post: Post;
};

const PostGridItem = ({ post }: Props) => {
  const [canShowBackDrop, setCanShowBackDrop] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user") as User;

  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(
    post.likedBy.includes(user._id as string)
  );

  const toggleHasLiked = () => {
    setHasLiked(!hasLiked);
  };

  const updateLikes = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
  };

  const likePostMutate = useLikePostMutate({ toggleHasLiked, updateLikes });

  const mouseEnterHandler = (e: MouseEvent) => {
    setCanShowBackDrop(true);
  };

  const mouseLeaveHandler = (e: MouseEvent) => {
    setCanShowBackDrop(false);
  };

  const clickNavigateHandler = () => {
    navigate(`/post/${post._id}`);
  };

  const leaveLikeHandler = (e: MouseEvent) => {
    e.stopPropagation();

    likePostMutate(post._id);
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
            <PostGridItemDataContainer onClick={leaveLikeHandler}>
              <SvgIcon
                path={hasLiked ? icons.heartFilled : icons.heart}
                inverseColor
              />
              <PostGridItemDataText>{likes}</PostGridItemDataText>
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
