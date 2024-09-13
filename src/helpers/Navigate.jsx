import { useNavigate } from "react-router-dom";
let ins = useNavigate();
export const navigate = (para) => {
  ins(para);
  console.log("hello from navigate componennts");
};
