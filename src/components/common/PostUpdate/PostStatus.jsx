import "./PostUpdate.scss";
import { Button, Modal, Progress } from "antd";
import React, { useState, useMemo } from "react";
import { AiFillPicture } from "react-icons/ai";
import { getStatus, postStatus } from "../../../api/FireStore";
import PostCard from "../postcard/PostCard";
import { FaPen } from "react-icons/fa";
import { getCurrentDate } from "../../../helpers/useMoment";
import getUniqeId from "../../../helpers/getUniqeId";
import { getCurrentUser } from "../../../api/FireStore";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../Images/FirstProfile.svg";
import HomePRofileCard from "../../../Images/HomeProfileCard.svg";
import { uploadPostImage } from "../../../api/IMGUpload";
export default function PostStatus({ user }) {
  const [dis, setDis] = useState("");
  const [open, setOpen] = useState(false);
  const [allStatus, setAllStatus] = useState([]);
  const [cureentUser, setCurrentUser] = useState({});
  const [profileSrc, setProfilSrc] = useState(ProfileImage);
  const [inputImage, setInputImage] = useState("");
  const [postImage, setPostImage] = useState("");
  const [progress, setprogress] = useState(0);
  let navigate = useNavigate();
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  const sendstatus = async () => {
    let obj = {
      status: dis,
      timeStamp: getCurrentDate("LLL"),
      email: user.email,
      userName: user?.name,
      postId: getUniqeId(),
      UserId: user.UserId,
      postImage: postImage,
    };
    await postStatus(obj);
    await setOpen(false);
    await setDis("");
  };
  const showModal = () => {
    setOpen(true);
    setPostImage("");
  };

  const handleOk = (e) => {
    setOpen(false);
    setPostImage("");
    setprogress(0);
  };

  const handleCancel = (e) => {
    setOpen(false);
    setPostImage("");
    setprogress(0);
  };
  useMemo(() => {
    getStatus(setAllStatus);
  }, []);
  console.log(progress);
  console.log(inputImage);
  //allthing here OK
  return (
    <div className="mainContiner">
      <div className="mainProfileCard">
        <div className="mainProfilePicture">
          <img src={HomePRofileCard} alt="" className="MyImage" />
        </div>
        <div className="mainContent">
          <FaPen
            className="pen"
            onClick={() =>
              navigate("/profile", {
                state: { id: cureentUser?.UserId },
              })
            }
          />
          <div className="ProfileImage1">
            <img
              src={
                user?.imageLink === undefined ? ProfileImage : user.imageLink
              }
              alt=""
            />
          </div>
          <div className="HomeProfileCardData">
            <h4>{user?.name}</h4>
            <p>
              {user?.city === undefined ? "city!" : user?.city} |{" "}
              {user?.skill === undefined ? "skill!" : user?.skill} |{" "}
              {user?.city === undefined ? "company!" : user?.comppany}
            </p>
          </div>
        </div>
      </div>
      <div className="mainPoststatus">
        <div>
          <div className="mydiv">
            <img
              src={
                user?.imageLink === undefined ? ProfileImage : user?.imageLink
              }
              alt=""
            />
          </div>
          <div className="dataDiv">
            <p className="name"> {cureentUser?.name}</p>
            <p className="data">
              {cureentUser?.headLine} | {cureentUser?.comppany}
            </p>
            <p className="data"> {cureentUser?.email}</p>
          </div>
        </div>
        <button className="openPostModal" onClick={showModal}>
          Start a Post
        </button>
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
              disabled={dis ? false : true}
              type="primary"
              onClick={() => {
                handleOk();
                sendstatus();
              }}
            >
              Post
            </Button>,
          ]}
        >
          <textarea
            className="modalInput"
            type="text"
            placeholder="what do you think about"
            onChange={(e) => {
              setDis(e.target.value);
            }}
            value={dis}
          />
          {progress !== 0 && progress !== 100 ? (
            <div className="progress">
              <Progress type="circle" percent={progress}></Progress>
            </div>
          ) : null}
          {progress == 100 ? (
            <img src={postImage} alt="" style={{ width: "100%" }} />
          ) : (
            <></>
          )}

          <label htmlFor="picture">
            {" "}
            <AiFillPicture
              style={{
                fontSize: " 30px",
                cursor: "pointer",
                color: "rgb(0, 126, 187)",
              }}
            />
          </label>
          <input
            type="file"
            id="picture"
            value={inputImage}
            onChange={(e) =>
              uploadPostImage(e.target.files[0], setPostImage, setprogress)
            }
          />
        </Modal>
      </div>
      <div className="mainContainerForPosts">
        {allStatus.map((post) => {
          return (
            <PostCard
              text={post.status}
              timeStamp={post.timeStamp}
              email={post.email}
              name1={post.userName}
              postId={post.postId}
              UserId={post.UserId}
              postImage={post.postImage}
            />
          );
        })}
      </div>
    </div>
  );
}
