import { AnimatePresence } from "framer-motion";
import { MouseEvent, useState } from "react";
import SvgIcon from "../../../../shared/components/UIElements/SvgIcon";
import { listItemVariants } from "../../../../shared/framerMotion/listAnimationVariants";
import cardVariants from "../../../../shared/framerMotion/postCardVariants";
import Post from "../../../../shared/types/post";
import icons from "../../../../shared/utils/icons";
import {
  PostItemBackdrop,
  PostItemContainer,
  PostItemDataContainer,
  PostItemDataText,
  PostItemImage,
} from "./PostItem.styled";

type Props = {
  post: Post;
};

const PostItem = ({ post }: Props) => {
  const [canShowBackDrop, setCanShowBackDrop] = useState(false);

  function mouseEnterHandler(e: MouseEvent) {
    setCanShowBackDrop(true);
  }

  const mouseLeaveHandler = (e: MouseEvent) => {
    setCanShowBackDrop(false);
  };

  return (
    <PostItemContainer
      variants={listItemVariants}
      onMouseEnter={(e) => mouseEnterHandler(e)}
      onMouseLeave={(e) => mouseLeaveHandler(e)}
    >
      <PostItemImage src={post.url} />
      <AnimatePresence exitBeforeEnter>
        {canShowBackDrop && (
          <PostItemBackdrop
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PostItemDataContainer>
              <SvgIcon path={icons.heart} inverseColor />
              <PostItemDataText>{post.likes}</PostItemDataText>
            </PostItemDataContainer>

            <PostItemDataContainer>
              <SvgIcon path={icons.comment} inverseColor />
              <PostItemDataText>{0}</PostItemDataText>
            </PostItemDataContainer>
          </PostItemBackdrop>
        )}
      </AnimatePresence>
    </PostItemContainer>
  );
};

export default PostItem;
