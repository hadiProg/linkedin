import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button, Modal } from "antd";
import { getCurrentDate } from "../../../helpers/useMoment";
import "./PostCard.scss";
import { getConnection } from "../../../api/FireStore";
import { useState, useMemo } from "react";
import {
  getCurrentUser,
  getALLUser,
  updatePost,
  deletPost,
} from "../../../api/FireStore";
import { toast } from "react-toastify";
export default function PostCard({
  text,
  timeStamp,
  email,
  name1,
  postId,
  UserId,
  postImage,
  // getedeitData,
}) {
  const navigate = useNavigate();
  const [cureentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [myimageLink, setMyimageLink] = useState([]);
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const getedeitData = () => {
    setPostText(text);
    setOpen(true);
  };
  useEffect(() => {
    setMyimageLink(
      allUsers
        .filter((item) => {
          return item?.UserId === postId;
        })
        .map((item) => {
          return item.imageLink;
        })
    );
  }, [allUsers]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getALLUser(setAllUsers);
  }, []);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    setOpen(false);
  };

  const handleCancel = (e) => {
    setOpen(false);
  };
  const updateState = () => {
    if (text == postText) {
      toast.warning("Nothing Changed");
    } else {
      updatePost(postId, postText);
    }
  };
  useEffect(() => {
    getConnection(cureentUser?.UserId, UserId, setIsConnected);
  }, [cureentUser?.UserId, UserId]);
  // Allthing here ok
  // console.log(allUsers);
  return isConnected || cureentUser?.UserId === UserId ? (
    <>
      {open ? (
        <Modal
          title="Create a post"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Back to home
            </Button>,
            <Button
              type="primary"
              onClick={() => {
                handleOk();
                updateState();
              }}
            >
              Edit
            </Button>,
          ]}
        >
          <input
            className="modalInput"
            type="text"
            placeholder="what do you think about"
            onChange={(e) => {
              setPostText(e.target.value);
            }}
            value={postText}
          />
        </Modal>
      ) : null}
      <div className="MainCard" key={postId}>
        <div className="myDiv ">
          <img
            src={allUsers
              .filter((item) => {
                return item.id === UserId;
              })
              .map((item) => {
                return item.imageLink;
              })}
            alt=""
            className="commentPhoto"
          />
          <div className="mainText">
            <p className="timeParagraph">{timeStamp}</p>
            <p
              className="userEmail"
              onClick={() =>
                navigate("/profile", {
                  state: { id: UserId, email: email },
                })
              }
            >
              {allUsers
                .filter((e) => {
                  return e.id === UserId;
                })
                .map((e) => {
                  return e.name;
                })}
            </p>
          </div>
          {cureentUser?.UserId === UserId ? (
            <div className="editAndDeleteDiv">
              <MdOutlineEdit
                className="myIcon"
                onClick={() => getedeitData()}
              />
              <RiDeleteBin6Line
                className="myIcon"
                onClick={() => deletPost(postId)}
              />
            </div>
          ) : null}
        </div>
        <p className="Status">{text}</p>
        <div className="postImage">
          {postImage ? (
            <img src={postImage} alt="" className="myImage" />
          ) : null}
        </div>
        <div className="commentsAndLikes">
          <LikeButton UserId={cureentUser?.UserId} postId={postId} />
        </div>
      </div>
    </>
  ) : null;
}
