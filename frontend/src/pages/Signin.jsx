import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  async function handleSignin(isTestUser) {
    setShowLoader(true);
    try {
      const response = await axios.post(
        "https://paytm-pzf0.onrender.com/api/v1/user/signin",
        isTestUser
          ? { username: "test_user@gmail.com", password: "123456" }
          : {
              username,
              password,
            }
      );

      // console.log("response sign in ", response);
      // console.log(response.ok);
      if (response.status !== 200) {
        alert(`HTTP error! status ${res.status}`);
        setShowLoader(false);
        return;
      }

      setShowLoader(false);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      console.log("Request creashed!");
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="harshit@gmail.com"
            label={"Email"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={() => handleSignin(false)} on />
          </div>
          <div className="pt-4">
            <Button
              label={"Guest Credentials"}
              onClick={() => handleSignin(true)}
              on
            />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
      {showLoader && (
        <div className="absolute w-full h-full flex items-center justify-center bg-gray-200 opacity-80">
          <Loader />
        </div>
      )}
    </div>
  );
};
