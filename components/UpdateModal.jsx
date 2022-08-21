import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateModal({ user, setUpdateModal }) {
  const [selectUser, setSelectUser] = useState(user);
  const [errmsg, setErrmsg] = useState("");
  const API = process.env.NEXT_PUBLIC_API_FUNCTION;

  const handleSubmit = () => {
    setErrmsg("");

    axios
    axios.post("http://localhost:3001/users", Obj).then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {}, [selectUser]);
  return (
    <div className=" overflow-y-auto overflow-x-hidden fixed w-1/2 z-50 left-1/3 top-1/3 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full">
        <div className="relative bg-white border rounded-lg shadow ">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              handleSubmit();
            }}
          >
            <div className="p-4 text-center">
              <span className="mb-5 font-normal text-2xl ">แก้ไขบัญชี</span>
              <br />
              <span className="text-red-500">{errmsg && errmsg}</span>
              <div className="flex pl-6 mt-1">
                <label>ID</label>
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="p-1 border"
                ></input>
              </div>

              <div className="flex pl-6 mt-1">
                <label>First Name</label>
                <input
                  value={firstnameedit}
                  onChange={(e) => setFirstnameedit(e.target.value)}
                  className="p-1 border"
                ></input>
              </div>
              <div className="flex pl-6 mt-1">
                <label>Last Name</label>
                <input
                  value={lastnameedit}
                  onChange={(e) => setLastnameedit(e.target.value)}
                  className="p-1 border"
                ></input>
              </div>
            </div>
            <div className="flex m-1 space-x-1">
              <button
                className="bg-green-500 text-white w-1/2 rounded-lg p-1 hover:opacity-70"
                type="submit"
              >
                บันทึก
              </button>
              <button
                className="bg-gray-300  w-1/2 rounded-lg p-1 hover:opacity-70"
                onClick={() => setUpdateModal(<></>)}
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
