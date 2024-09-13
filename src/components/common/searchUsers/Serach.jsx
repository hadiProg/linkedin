import React, { useEffect, useState } from "react";
import { getALLUser } from "../../../api/FireStore";
import { Result } from "antd";
import "./search.scss";
import myimageLink from "../../../Images/FirstProfile.svg";
import { Navigate, useNavigate } from "react-router-dom";
export default function Serach() {
  const [searchInput, setSerchInput] = useState("");
  const [users, setusers] = useState([]);
  const [searchResult, setSerchResult] = useState(users);
  let navigate = useNavigate();
  useEffect(() => {
    getALLUser(setusers);
  }, []);
  const handleSearch = () => {
    if (searchInput !== "") {
      let sum = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setSerchResult(sum);
    } else {
      setSerchResult(users);
    }
  };
  useEffect(() => {
    let deb = setTimeout(() => {
      handleSearch();
      // console.log(searchResult);
    }, 500);
    return () => {
      clearTimeout(deb);
    };
  }, [searchInput]);
  const openUser = (e) => {
    navigate("/profile", {
      state: { id: e.UserId, email: e.email },
    });
  };
  return (
    <>
      <div className="containerforInput">
        <input
          onChange={(e) => {
            setSerchInput(e.target.value);
          }}
          type="text"
          className="serach"
          placeholder="Search here..."
        />
      </div>
      <div className="searchResult">
        {searchResult.length > 0 ? (
          searchResult.map((e) => {
            return (
              <div className="resultCrad">
                <img
                  src={e.imageLink ? e.imageLink : myimageLink}
                  alt=""
                  className="resultImage"
                />
                <p
                  className="name"
                  on
                  onClick={() => {
                    navigate("/profile", {
                      state: { id: e.UserId, email: e.email },
                    });
                  }}
                >
                  {e.name}
                </p>
              </div>
            );
          })
        ) : (
          <div>No Search Result</div>
        )}
      </div>
    </>
  );
}
