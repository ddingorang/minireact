import React, { useState } from "react";
import Button from "../components/CartButton";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUserInfo = sessionStorage.getItem("userInfo");

    if (savedUserInfo) {
      const { id: savedId, password: savedPassword } = JSON.parse(savedUserInfo);

      if (id === savedId && password === savedPassword) {
        console.log("로그인 성공");
        navigate("/");
      } else {
        setMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    };
  };

  return (
    <div>
      <p className="text-2xl font-bold py-5">로그인</p>
      <InputField
        type="text"
        label="아이디"
        placeholder="아이디를 입력해 주세요"
        onChange={(e) => setId(e.target.value)}
      />
      <InputField
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-left ml-5 text-red-500">{message}</p>
      <Button content="로그인" onClick={handleLogin} />
    </div>
  );
};

export default Login;