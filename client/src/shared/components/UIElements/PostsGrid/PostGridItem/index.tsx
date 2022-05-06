import { AnimatePresence } from "framer-motion";
import { MouseEvent, useState } from "react";
import { listItemVariants } from "../../../../framerMotion/listAnimationVariants";
import cardVariants from "../../../../framerMotion/postCardVariants";
import Post from "../../../../types/post";
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

  const mouseEnterHandler = (e: MouseEvent) => {
    setCanShowBackDrop(true);
  };

  const mouseLeaveHandler = (e: MouseEvent) => {
    setCanShowBackDrop(false);
  };

  return (
    <PostGridItemContainer
      variants={listItemVariants}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
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
              <SvgIcon path={icons.heart} inverseColor />
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
