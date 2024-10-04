import React, { useState } from "react";
import Button from "../components/CartButton";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage("비밀번호는 영문, 숫자 포함 최소 8자리 이상이어야 합니다.");
      return;
    }

    const userInfo = { name, id, password };
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/login");
  };

  return (
    <div>
      <p className="text-2xl font-bold py-5">회원가입</p>
      <InputField
        type="text"
        label="이름"
        placeholder="이름을 입력해 주세요"
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        type="text"
        label="아이디"
        placeholder="아이디를 입력해 주세요"

        onChange={(e) => setId(e.target.value)}
      />
      <InputField
        type="password"
        label="비밀번호"
        placeholder="숫자, 영문 조합 8자리 이상 입력해 주세요"
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        type="password"
        label="비밀번호 확인"
        placeholder="숫자, 영문 조합 8자리 이상 입력해 주세요"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <p className="text-left ml-5 text-red-500">{message}</p>
      <Button content="회원가입" onClick={handleRegister} />
    </div>
  );
};

export default Register;