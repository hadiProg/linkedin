import { useState } from "react";
import "./LikeButton.scss";
import { getComment, getLikesByUser, LikePost } from "../../../api/FireStore";
import { AiOutlineLike } from "react-icons/ai";
import { useMemo } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { postComment } from "../../../api/FireStore";
import { getCurrentDate } from "../../../helpers/useMoment";
import { toast } from "react-toastify";
import CommentShower from "../commentShower/CommentShower";
import { getCurrentUser } from "../../../api/FireStore";
export default function LikeButton({ UserId, postId }) {
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [postComments, setPostComment] = useState([0]);
  const [myCurrentPost, setMyCurrentPost] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const handleLike = () => {
    LikePost(UserId, postId, liked);
  };
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getLikesByUser(UserId, postId, setLiked, setLikeCount);
    getComment(postId, setPostComment);
  }, [UserId, postId,myCurrentPost]);
  const commentButtonClick = async () => {
    setShowCommentBox(!showCommentBox);
    if (!showCommentBox) {
      getComment(postId, setPostComment);
      if (postComments !== undefined) {
        setMyCurrentPost(postComments);
      }
    }
  };
  const sendComment = () => {
    try {
      postComment(postId, comment, getCurrentDate("LLL"), currentUser.name);
      setComment("");
      setPostComment(getComment(postId, setPostComment));
      if (postComments !== undefined) {
        setMyCurrentPost(postComments);
        toast.success("Your comment has been added");
      }
      
    } catch (err) {
      toast.error(" some thing wrong happend");
      console.log(err);
    }
  };
  return (
    <div className="mainContainer1">
      <div className="numbersContainer">
        <span className="number">
          {likeCount} {likeCount > 1 ? "Likes" : "Like"}
        </span>
      </div>
      <div className="buttonConatiner">
        <button className="mainLikeButton" onClick={handleLike}>
          <AiOutlineLike className={liked ? "myIcon liked" : "myIcon"} />
          <p className={liked ? "myP liked" : "myP"}>
            {liked ? "liked" : "like"}
          </p>
        </button>
        <button
          className="mainLikeButton"
          onClick={() => {
            commentButtonClick();
          }}
        >
          <FaRegCommentDots
            className={showCommentBox ? "myIcon liked" : "myIcon"}
          />
          <p className={showCommentBox ? "myP liked" : "myP"}>Comment</p>
        </button>
      </div>
      <div
        className={
          showCommentBox ? "commentsSection" : "commentsSection dispalyNone"
        }
      >
        {myCurrentPost.length > 0 ? (
          myCurrentPost.map((e) => (
            <CommentShower
              key={e.id}
              data={e.comment}
              time={e.timeStamp}
              name={e.name}
            />
          ))
        ) : (
          <></>
        )}
        <div className="inputCommentSection">
          <input
            type="text"
            placeholder="add comment"
            className="commentInput"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <FaArrowRight className="myArrow" onClick={sendComment} />
        </div>
      </div>
    </div>
  );
}
