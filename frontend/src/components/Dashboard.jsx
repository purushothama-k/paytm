import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div className=" mx-auto mt-3 w-3/4 ">
      <div className=" bg-white p-6 rounded-lg">
        <div className=" flex justify-between">
          <div className=" font-bold text-xl">Payments App</div>
          <div className="flex items-center">
            <div className=" mr-2 text-lg"> Hello, User</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2nd section */}

      <div className=" mt-4 bg-white p-6 rounded-lg">
        <div className="  flex flex-col">
          <div className=" font-semibold text-xl">Your balance : $5000</div>

          <div className=" my-3">
            <div className="mb-2 font-semibold text-lg">Users</div>
            <input
              onChange={(e) => setFilter(e.target.value)}
              type="search"
              className=" border-solid border-2 border-slate-300 p-2 rounded-md w-full"
              placeholder="Search users..."
            />
          </div>

          {users.map((user) => {
            return (
              <div key={user.username} className=" flex justify-between mt-5">
                <div className=" text-lg font-semibold">{user.firstName}</div>
                <button
                  onClick={() => {
                    navigate(
                      "/send?id=" + user._id + "&name=" + user.firstName
                    );
                  }}
                  className=" bg-slate-800 text-white px-4 py-2 rounded-md"
                >
                  Send Money
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
