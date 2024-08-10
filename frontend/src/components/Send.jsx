import axios from "axios";
import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

export default function Send() {
  const [searchParams] = useSearchParams();

  const [amount, setAmount] = useState("");

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  return (
    <div className=" m-auto mt-16 w-1/4 ">
      <div className=" bg-white p-6 rounded-lg">
        <div className=" text-3xl my-2 font-bold text-center">Send Money</div>

        <div className="flex items-center ">
          <div className=" mr-3 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-lime-600 rounded-full dark:bg-lime-600">
            <span className="font-medium dark:text-white">
              {name.slice(0, 2).toUpperCase()}
            </span>
          </div>

          <div className=" text-lg font-semibolf my-4">{name}</div>
        </div>

        <div className="flex flex-col">
          <div className=" mb-5">
            <div className="mb-2 font-semibold">Amount (in Rs)</div>
            <input
              type="text"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              placeholder="Enter amount..."
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          onClick={() => {
            axios.post(
              "http://localhost:3000/api/v1/account/transfer",
              {
                to: id,
                amount,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
          }}
          className="text-white w-full py-2 rounded-md  bg-lime-600"
        >
          Initiate Transfer
        </button>

        {/* <div className="flex flex-col items-center mt-2">
          
          <div className=" mt-2">
            Already have an account?{" "}
            <NavLink className=" text-blue-700">Login</NavLink>
          </div>
        </div> */}
      </div>
    </div>
  );
}
