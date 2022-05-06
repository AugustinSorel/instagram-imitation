import { AnimatePresence, Variants } from "framer-motion";
import { MouseEvent, useState } from "react";
import SvgIcon from "../../../../shared/components/UIElements/SvgIcon";
import BackdropWrapper from "../../../../shared/components/wrappers/BackdropWrapper";
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

const postVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  },
};

const testVariants: Variants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      animation: "ease",
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
  },
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
      variants={postVariants}
      onMouseEnter={(e) => mouseEnterHandler(e)}
      onMouseLeave={(e) => mouseLeaveHandler(e)}
    >
      <PostItemImage src={post.url} />
      <AnimatePresence exitBeforeEnter>
        {canShowBackDrop && (
          <PostItemBackdrop
            variants={testVariants}
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
