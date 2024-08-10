import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" m-auto mt-16 w-1/4 ">
      <div className=" bg-white p-6 rounded-lg">
        <div className="flex flex-col items-center mb-4">
          <div className=" text-3xl m-2 font-bold">Sign Up</div>
          <div>Enter your information to create an account</div>
        </div>

        <div className="flex flex-col">
          <div className=" mb-3">
            <div className="mb-2 font-semibold">First Name</div>
            <input
              type="text"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              placeholder="John"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div className=" mb-3">
            <div className="mb-2 font-semibold">Last Name</div>
            <input
              type="text"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              placeholder="Doe"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div className=" mb-3">
            <div className="mb-2 font-semibold">Email</div>
            <input
              type="email"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              placeholder="johndoe@example.com"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className=" mb-3">
            <div className="mb-2 font-semibold">Password</div>
            <input
              type="password"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstName,
                  lastName,
                  userName,
                  password,
                }
              );

              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            className=" bg-slate-900 text-slate-50 w-full py-2 rounded-md font-semibold "
          >
            Sign Up
          </button>
          <div className=" mt-2">
            Already have an account?{" "}
            <NavLink to="/signin" className=" text-blue-700">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
