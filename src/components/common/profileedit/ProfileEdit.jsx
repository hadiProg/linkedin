import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { editPRofile } from "../../../api/FireStore";
import "./ProfileEdit.scss";
export default function ProfileEdit({ onEdit, currentUser }) {
  console.log(currentUser);
  const [inputEdit1, setInputEdit1] = useState({ name: currentUser.name });
  const [inputEdit2, setInputEdit2] = useState({
    headLine: currentUser.headLine,
  });
  const [inputEdit3, setInputEdit3] = useState({
    loaction: currentUser.loaction,
  });
  const [inputEdit4, setInputEdit4] = useState({
    comppany: currentUser.comppany,
  });
  const [inputEdit5, setInputEdit5] = useState({
    Collage: currentUser.Collage,
  });
  const [inputEdit6, setInputEdit6] = useState({
    Indus: currentUser.Indus,
  });
  const [inputEdit7, setInputEdit7] = useState({
    city: currentUser.city,
  });
  const [inputEdit8, setInputEdit8] = useState({
    webSite: currentUser.webSite,
  });
  const [inputEdit9, setInputEdit9] = useState({
    about: currentUser.about,
  });
  const [inputEdit10, setInputEdit10] = useState({
    skill: currentUser.skill,
  });
  const [myFinalInput, setMyFinalInput] = useState({});
  const getInput1 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit1({ ...inputEdit1, ...input });
  };
  const getInput2 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit2({ ...inputEdit2, ...input });
  };
  const getInput3 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit3({ ...inputEdit3, ...input });
  };
  const getInput4 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit4({ ...inputEdit4, ...input });
  };
  const getInput5 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit5({ ...inputEdit5, ...input });
  };
  const getInput6 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit6({ ...inputEdit6, ...input });
  };
  const getInput7 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit7({ ...inputEdit7, ...input });
  };
  const getInput8 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit8({ ...inputEdit8, ...input });
  };
  const getInput9 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit9({ ...inputEdit9, ...input });
  };
  const getInput10 = (event) => {
    let { id, value } = event.target;
    let input = { [id]: value };
    setInputEdit10({ ...inputEdit10, ...input });
  };
  useEffect(() => {
    setMyFinalInput({
      ...inputEdit1,
      ...inputEdit2,
      ...inputEdit3,
      ...inputEdit4,
      ...inputEdit5,
      ...inputEdit6,
      ...inputEdit7,
      ...inputEdit8,
      ...inputEdit9,
      ...inputEdit10,
    });
  }, [
    inputEdit1,
    inputEdit2,
    inputEdit3,
    inputEdit4,
    inputEdit5,
    inputEdit6,
    inputEdit7,
    inputEdit8,
    inputEdit9,
    inputEdit10,
  ]);
  const upDateData = async () => {
    await editPRofile(currentUser?.UserId, myFinalInput);
    await onEdit();
  };
  console.log(inputEdit7);
  console.log(myFinalInput);
  return (
    <div className="ProfileCard">
      <button
        className="buttonEdit"
        onClick={() => {
          onEdit(false);
        }}
      >
        Go Back
      </button>
      <label htmlFor="id" className="mainLabel">
        Your id
      </label>
      <input
        id="id"
        value={currentUser.UserId}
        className="myInput idShower"
        disabled
      />
      <label htmlFor="name" className="mainLabel">
        name
      </label>
      <input
        id="name"
        value={inputEdit1.name}
        className="myInput"
        onChange={getInput1}
      />
      <label htmlFor="headLine" className="mainLabel">
        HeadLine
      </label>
      <input
        id="headLine"
        value={inputEdit2.headLine}
        className="myInput"
        onChange={getInput2}
      />
      <label htmlFor="loaction" className="mainLabel">
        Location
      </label>
      <input
        id="loaction"
        value={inputEdit3.loaction}
        className="myInput"
        onChange={getInput3}
      />
      <label htmlFor="city" className="mainLabel">
        City
      </label>
      <input
        id="city"
        value={inputEdit7.city}
        className="myInput"
        onChange={getInput7}
      />
      <label htmlFor="comppany" className="mainLabel">
        Company
      </label>
      <input
        id="comppany"
        value={inputEdit4.comppany}
        className="myInput"
        onChange={getInput4}
      />
      <label htmlFor="Collage" className="mainLabel">
        Collage
      </label>
      <input
        id="Collage"
        value={inputEdit5.Collage}
        className="myInput"
        onChange={getInput5}
      />
      <label htmlFor="Indus" className="mainLabel">
        Industry
      </label>
      <input
        id="Indus"
        value={inputEdit6.Indus}
        className="myInput"
        onChange={getInput6}
      />
      <label htmlFor="webSite" className="mainLabel">
        webSite
      </label>
      <input
        id="webSite"
        value={inputEdit8.webSite}
        className="myInput"
        onChange={getInput8}
      />
      <label htmlFor="about" className="mainLabel">
        About
      </label>
      <textarea
        id="about"
        value={inputEdit9.about}
        className="myTextArea"
        onChange={getInput9}
      />
      <label htmlFor="skill" className="mainLabel">
        Skill
      </label>
      <input
        id="skill"
        value={inputEdit10.webSite}
        className="myInput"
        onChange={getInput10}
      />
      <div className="updateDiv">
        <button
          className="buttonEdit"
          onClick={() => {
            upDateData();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
