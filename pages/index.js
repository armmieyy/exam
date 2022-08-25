import Head from "next/head";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer.jsx";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [id, setId] = useState("");
  const [firstnameedit, setFirstnameedit] = useState("");
  const [lastnameedit, setLastnameedit] = useState("");
  const [modal, setModal] = useState({
    create: false,
    update: false,
    delete: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => {
      console.log(res);
      setUsers(res.data);
    });
    // fetch("https://www.mecallapi.com/api/users")
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setUsers(res.data);
    //   });
  }, []);
  const deletebyid = () => {
    // console.log(id);
    axios.delete("http://localhost:3001/users/" + id).then((res) => {
      setUsers(res.data);
      setId("");
      closeModal();
    });
  };
  const create = () => {
    const Obj = { fname: firstname, lname: lastname };
    axios.post("http://localhost:3001/users", Obj).then((res) => {
      setUsers(res.data);
      setFirstname(""), setLastname("");
      closeModal();
    });
  };
  const getvalue = (id) => {
    axios.get("http://localhost:3001/users/" + id).then((res) => {
      setFirstnameedit(res.data.fname);
      setLastnameedit(res.data.lname);
      setId(res.data.id);
      setModal((prev) => ({ ...prev, update: true }));
    });
  };
  const update = () => {
    const Obj = { fname: firstnameedit, lname: lastnameedit };
    axios.put("http://localhost:3001/users/" + id, Obj).then((res) => {
      setUsers(res.data);
    });
    closeModal();
  };

  const closeModal = () => {
    setModal({ create: false, update: false, delete: false });
  };
  return (
    <div className="bg-sky-300">
      <Navbar />
      <div className="pb-14 pt-2 px-8">
        <Head>
          <title>Exam</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {modal.create && (
          <FromModal
            firstname={firstname}
            lastname={lastname}
            setFirstname={setFirstname}
            setLastname={setLastname}
            create={create}
            closeModal={closeModal}
          />
        )}
        {modal.update && (
          <FromUpdateModal
            id={id}
            firstnameedit={firstnameedit}
            lastnameedit={lastnameedit}
            setFirstnameedit={setFirstnameedit}
            setLastnameedit={setLastnameedit}
            update={update}
            closeModal={closeModal}
          />
        )}

        {modal.delete && (
          <ModalConfirm
            closeModal={closeModal}
            deletebyid={deletebyid}
            id={id}
          />
        )}
        <div className="pr-1 mt-20 pb-4 mb-2 space-x-4" align="right">
          {/* <label class="font-bold">First Name</label>
          <input
            value={firstname}
            placeholder="Your name.."
            onChange={(e) => setFirstname(e.target.value)}
            className="p-1 border rounded-md border-slate-400"
          ></input>
          <label class="font-bold">Last Name</label>
          <input
            value={lastname}
            placeholder="Your Lastname.."
            onChange={(e) => setLastname(e.target.value)}
            className="p-1 border rounded-md border-slate-400"
          ></input> */}
          <button
            onClick={() => setModal((prev) => ({ ...prev, create: true }))}
            className="p-2 px-6 bg-green-500 rounded-lg text-white hover:opacity-50 border-solid border-2 border-green-100"
          >
            เพิ่ม
          </button>
        </div>
        <Row className="rounded bg-sky-200 h-96 overflow-y-scroll border-solid border-4 border-sky-500 mt-18">
          <Col span={24} className="p-2">
            <table className="table w-full border-separate bg-white border-solid border-2 border-sky-500">
              <thead>
                <tr className="border border-black bg-blue-300">
                  <th className="w-4 p-4 text-center">ID</th>
                  <th className="w-24 p-4">First Name</th>
                  <th className="w-32 p-4 text-center">Last Name</th>
                  <th className="w-32 p-4 text-center"></th>
                </tr>
              </thead>
              {users &&
                users.map((users) => (
                  <tbody>
                    <tr className="border-b border-solid border-2 border-sky-500">
                      <td className="border border-slate-600 w-4 p-2 text-center">
                        {users.id}
                      </td>
                      <td className="border border-slate-600 w-16 p-2 text-center">
                        {users.fname}
                      </td>
                      <td className="border border-slate-600 w-16 p-2 text-center">
                        {users.lname}
                      </td>
                      <td className="border border-slate-600 p-2  w-16 space-x-3  items-center ">
                        <div className="space-x-1" align="center">
                          <EditOutlined
                            className="px-4 "
                            style={{ fontSize: "19px" }}
                            onClick={() => {
                              getvalue(users.id);
                            }}
                          />
                          <DeleteOutlined
                            onClick={() => {
                              setModal((prev) => ({ ...prev, delete: true }));
                              setId(users.id);
                            }}
                            style={{
                              color: "red",
                              marginLeft: 12,
                              fontSize: "19px",
                            }}
                          />
                          {/* <button
                            onClick={() => getvalue(users.id)}
                            className="p-1 px-4 bg-blue-500 rounded-lg text-white hover:opacity-70"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={() => deletebyid(users.id)}
                            className="p-1 px-6 bg-red-600  rounded-lg text-white hover:opacity-70 "
                          >
                            ลบ
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </Col>
        </Row>
        {/* <label>ID</label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="p-1 border"
        ></input>
        <label>First Name</label>
        <input
          value={firstnameedit}
          onChange={(e) => setFirstnameedit(e.target.value)}
          className="p-1 border"
        ></input>
        <label>Last Name</label>
        <input
          value={lastnameedit}
          onChange={(e) => setLastnameedit(e.target.value)}
          className="p-1 border"
        ></input>
        <button
          onClick={() => update()}
          className="p-1 px-4 bg-blue-500 rounded-lg text-white hover:opacity-70"
        >
          บันทึก
        </button> */}
      </div>
      <Footer />
    </div>
  );
}

const FromModal = ({
  firstname,
  lastname,
  setFirstname,
  setLastname,
  create,
  closeModal,
}) => {
  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-sky-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center space-y-4   sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex space-x-4 w-full ">
                    <label className="font-bold w-1/3">First Name</label>
                    <input
                      value={firstname}
                      placeholder="Your name.."
                      onChange={(e) => setFirstname(e.target.value)}
                      className="p-1 border rounded-md border-slate-400 w-full"
                    ></input>
                  </div>
                  <div className="flex space-x-4">
                    <label class="font-bold w-1/3">Last Name</label>
                    <input
                      value={lastname}
                      placeholder="Your Lastname.."
                      onChange={(e) => setLastname(e.target.value)}
                      className="p-1 border rounded-md border-slate-400 w-full"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-sky-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => {
                  create();
                }}
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                บันทึก
              </button>
              <button
                onClick={() => {
                  closeModal();
                }}
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FromUpdateModal = ({
  firstnameedit,
  lastnameedit,
  setFirstnameedit,
  setLastnameedit,
  update,
  closeModal,
  id,
}) => {
  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-sky-300 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center space-y-4   sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex space-x-4 w-full ">
                    <label className="font-bold w-1/3">ID</label>
                    <input
                      value={id}
                      disabled
                      className="p-1 border rounded-md border-slate-400 w-full"
                    ></input>
                  </div>
                  <div className="flex space-x-4 w-full ">
                    <label class="font-bold w-1/3">First Name</label>
                    <input
                      value={firstnameedit}
                      placeholder="Your name.."
                      onChange={(e) => setFirstnameedit(e.target.value)}
                      className="p-1 border rounded-md border-slate-400 w-full"
                    ></input>
                  </div>
                  <div className="flex space-x-4">
                    <label class="font-bold w-1/3">Last Name</label>
                    <input
                      value={lastnameedit}
                      placeholder="Your Lastname.."
                      onChange={(e) => setLastnameedit(e.target.value)}
                      className="p-1 border rounded-md border-slate-400 w-full"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-sky-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => {
                  update();
                }}
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                บันทึก
              </button>
              <button
                onClick={() => {
                  closeModal();
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalConfirm = ({ closeModal, deletebyid, id }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-red-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center space-y-4   sm:mt-0 sm:ml-4 sm:text-left w-full">
                  คุณต้องการลบ ID {id}
                </div>
              </div>
            </div>
            <div className="bg-red-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ">
              <button
                onClick={() => {
                  deletebyid();
                }}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                ยืนยัน
              </button>
              <button
                onClick={() => {
                  closeModal();
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
