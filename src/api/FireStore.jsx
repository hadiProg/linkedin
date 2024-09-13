import { fireStore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  onSnapshot,
  query,
  updateDoc,
  where,
  setDoc,
  snapshotEqual,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useRef } from "react";
let postRef = collection(fireStore, "posts");
let userref = collection(fireStore, "users");
let LikeRef = collection(fireStore, "likes");
let CommentRef = collection(fireStore, "comments");
let connectionRef = collection(fireStore, "connection");
export const postStatus = (object) => {
  addDoc(postRef, object)
    .then((res) => {
      toast.success("document has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updatePost = async (postId, status) => {
  console.log(postId);
  console.log(status);
  let docToUpdate = doc(postRef, postId);
  console.log(docToUpdate);
  try {
    await updateDoc(docToUpdate, { status });
    toast.success("تم تحديث البيانات بنجاح");
  } catch (err) {
    console.log(err);
  }
};

export const getStatus = (setAllStatus) => {
  onSnapshot(postRef, (res) => {
    setAllStatus(
      res.docs.map((e) => {
        return { ...e.data(), id: e.id };
      })
    );
  });
};
export const getALLUser = (setAllUser) => {
  onSnapshot(userref, (res) => {
    setAllUser(
      res.docs.map((e) => {
        return { ...e.data(), id: e.id };
      })
    );
  });
};

export const poastUserData = (object) => {
  addDoc(userref, object)
    .then((res) => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getCurrentUser = (setCurrUser) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userref, (res) => {
    setCurrUser(
      res.docs
        .map((e) => {
          return { ...e.data(), UserId: e.id };
        })
        .filter((item) => {
          return item.email == currEmail;
        })[0]
    );
  });
};
export const editPRofile = (userId, data) => {
  let userToEdit = doc(userref, userId);
  console.log(userToEdit);
  updateDoc(userToEdit, data)
    .then(() => {
      toast.success("Your data updated successfuly");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postRef, where("UserId", "==", id));
  onSnapshot(singlePostQuery, (res) => {
    setAllStatus(
      res.docs.map((e) => {
        return { ...e.data(), id: e.id };
      })
    );
  });
};

export const getSingleUser = (setSingleUser, email) => {
  const singleUserQuery = query(userref, where("email", "==", email)); // تأكيد تعريف userref
  onSnapshot(singleUserQuery, (res) => {
    const user = res.docs.map((e) => {
      return { ...e.data(), id: e.id };
    })[0];
    setSingleUser(user);
  });
};
export const LikePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(LikeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};
export const getLikesByUser = (userId, postId, setLiked, setLikeCount) => {
  try {
    let likeQuery = query(LikeRef, where("postId", "==", postId));
    onSnapshot(likeQuery, (res) => {
      let likes = res.docs.map((doc) => {
        return doc.data();
      });
      let likesCounter = likes?.length;
      const isliked = likes.some((like) => like.userId === userId);
      setLikeCount(likesCounter);
      setLiked(isliked);
    });
  } catch (err) {
    console.log(err);
  }
};
export const postComment = (postId, comment, timeStamp, name) => {
  console.log(" from fire base section");
  console.log(postId);
  console.log(comment);
  console.log(timeStamp);
  try {
    addDoc(CommentRef, {
      postId,
      comment,
      timeStamp,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getComment = (postId, setPostComment) => {
  try {
    let singglePostQuery = query(CommentRef, where("postId", "==", postId));
    onSnapshot(singglePostQuery, (res) => {
      const comments = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPostComment(comments);
    });
  } catch (err) {
    console.log(err);
  }
};
export const deletPost = (id) => {
  let docToDelete = doc(postRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success(" Your Post has been successfully deleted");
  } catch (err) {
    console.log(err);
    toast.warning("somthing Wrong Check the conole");
  }
};
// console.log(getDoc(postRef, "2c89b605-2d39-3b36-457a-385324177f3d"));
// console.log(getDoc(userref,"3K8FV7Jn6Brj4vCmgaAL"))
export const addConnection = (userId, targetId,name) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);
    setDoc(connectionToAdd, { userId, targetId });
    toast.success(`you started follow ${name}`);
  } catch (err) {
    console.log(err);
  }
};
export const getConnection = (userId, targetId, setIsConnected) => {
  try {
    let connectionQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );
    onSnapshot(connectionQuery, (res) => {
      let connections = res.docs.map((doc) => {
        return doc.data();
      });
      const isconnected = connections.some(
        (connection) => connection.userId === userId
      );
      console.log(isconnected);
      setIsConnected(isconnected);
    });
  } catch (err) {
    console.log(err);
  }
};
