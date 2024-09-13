import { useState, useMemo, useEffect } from "react";
import "./ProfileCard.scss";
import {
  getSingleStatus,
  getSingleUser,
  getStatus,
} from "../../../api/FireStore";
import EditButton from "../editButton/EditButton";
import PostCard from "../postcard/PostCard";
import { useLocation } from "react-router-dom";
import { uploadImage } from "../../../api/IMGUpload";
import { editPRofile } from "../../../api/FireStore";
import { getCurrentUser } from "../../../api/FireStore";
import UploadModal from "../fileUploadModal/UploadModal";
import ProfileEdit from "../profileedit/ProfileEdit";

export default function ProfileCard(Props) {
  let location = useLocation();
  const [currentProfile, setCurrentProfile] = useState({});
  const [allStatus, setAllStatus] = useState([]);
  const [current1, setCurrent1] = useState("");
  const [current2, setCurrent2] = useState("");
  const [current3, setCurrent3] = useState("");
  const [current4, setCurrent4] = useState("");
  const [current5, setCurrent5] = useState("");
  const [current6, setCurrent6] = useState("");
  const [current7, setCurrent7] = useState("");
  const [current8, setCurrent8] = useState("");
  const [current9, setCurrent9] = useState("");
  const [current10, setCurrent10] = useState("");
  const [current11, setCurrent11] = useState("");
  const [currentImage, setCurrentImage] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [modalOpen, setModalOpen] = useState("");
  const [progress, setprogress] = useState(0);
  const [toProfileEdit, setToProfileEdit] = useState(false);
  useEffect(() => {
    getStatus(setAllStatus);
  }, []);
  useEffect(() => {
    if (progress == 100) {
      setModalOpen(false);
    }
  }, [progress]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  useEffect(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, [location]);
  useEffect(() => {
    const fetchData = async () => {
      setCurrent1(Props.currentUser.name);
      setCurrent2(Props.currentUser.email);
      setCurrent3(Props.currentUser.headLine);
      setCurrent4(Props.currentUser.loaction);
      setCurrent5(Props.currentUser.comppany);
      setCurrent6(Props.currentUser.Collage);
      setCurrent7(Props.currentUser.Indus);
      setCurrent8(Props.currentUser.city);
      setCurrent9(Props.currentUser.webSite);
      setCurrent10(Props.currentUser.skill);
      setCurrent11(Props.currentUser.about);
    };
    fetchData();
  }, [Props.currentUser]);
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);
  const getImage = (e) => {
    setCurrentImage(e.target.files[0]);
    console.log(currentImage);
  };
  const uploadimgtofirebase = () => {
    uploadImage(
      currentImage,
      Props.currentUser.UserId,
      setModalOpen,
      setprogress
    );
  };
  const changeOpen = () => {
    setModalOpen(true);
  };
  console.log(Props);
  return (
    <>
      {toProfileEdit ? (
        <ProfileEdit onEdit={setToProfileEdit} currentUser={currentUser} />
      ) : (
        <>
          {modalOpen ? (
            <UploadModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              getImage={getImage}
              uploadimgtofirebase={uploadimgtofirebase}
              currentImage={currentImage}
              progress={progress}
            />
          ) : null}
          <div className="ProfileCard">
            <div className="ButtonDiv">
              {/* <button onClick={changeOpen} className="upload">
            Upload Image
          </button> */}
          {}
              <button onClick={() => setToProfileEdit(true)} className="upload">
                edit
              </button>
            </div>
            <div className="profiolePhoto" onClick={changeOpen}>
              <img
                src={currentUser?.imageLink}
                alt=""
                className="profileImage"
              />
            </div>
            <div className="mainProfileDiv">
              <div>
                <h3 className="userName">
                  {Object.values(currentProfile).length === 0
                    ? current1
                    : currentProfile?.name}
                </h3>
                <h2 className="Email">
                  {Object.values(currentProfile).length === 0
                    ? current2
                    : currentProfile?.email}
                </h2>
                <h2 className="currentEmail">
                  headLine:{""}
                  {Object.values(currentProfile).length === 0
                    ? current3
                    : currentProfile?.headLine}
                </h2>
                <h2 className="currentEmail">
                  Location:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current4
                    : currentProfile?.loaction}
                </h2>
                <h2 className="currentEmail">
                  City:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current8
                    : currentProfile?.city}
                </h2>
                <h2 className="currentEmail">
                  Company:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current5
                    : currentProfile?.comppany}
                </h2>
                <h2 className="currentEmail">
                  College:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current6
                    : currentProfile?.Collage}
                </h2>
                <h2 className="currentEmail">
                  Industrey:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current7
                    : currentProfile?.Indus}
                </h2>
                webSite:{" "}
                <a
                  className="currentEmail"
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {Object.values(currentProfile).length === 0
                    ? current9
                    : currentProfile?.webSite}
                </a>
                <h2 className="currentEmail">
                  Skills:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current10
                    : currentProfile?.skill}
                </h2>
                <h2 className="currentEmail">
                  About:{" "}
                  {Object.values(currentProfile).length === 0
                    ? current11
                    : currentProfile?.about}
                </h2>
              </div>
            </div>
          </div>
          <div className="mainContainerForPosts">
            {allStatus.map((post) => {
              if (post.email === current2) {
                return (
                  <PostCard
                    key={post.postId}
                    text={post.status}
                    timeStamp={post.timeStamp}
                    email={post.email}
                    name1={post.userName}
                    postId={post.postId}
                    UserId={Props.currentUser.UserId}
                  />
                );
              }
              return null;
            })}
          </div>
        </>
      )}
    </>
  );
}
