import { NavLink } from "react-router-dom";

export default function Signin() {
  return (
    <div className=" m-auto mt-16 w-1/4 ">
      <div className=" bg-white p-6 rounded-lg">
        <div className="flex flex-col items-center mb-4">
          <div className=" text-3xl m-2 font-bold">Sign In</div>
          <div>Enter your credential to access you account</div>
        </div>

        <div className="flex flex-col">
          <div className=" mb-3">
            <div className="mb-2 font-semibold">Email</div>
            <input
              type="email"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              placeholder="johndoe@example.com"
            />
          </div>

          <div className=" mb-3">
            <div className="mb-2 font-semibold">Password</div>
            <input
              type="password"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <button className=" bg-slate-900 text-slate-50 w-full py-2 rounded-md font-semibold">
            Sign In
          </button>
          <div className=" mt-2">
            Don&apos;t have have an account?
            <NavLink to="/signup" className=" text-blue-700">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
