import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const eyeref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);

  const notify = (text) => {
    toast(text);
  };

  const getPasswords = async () => {
    let response = await fetch("http://localhost:3000/")
    let passwords = await response.json()
    setPasswordArray(passwords)
  }

  useEffect(() => {
    // let passwords = localStorage.getItem("passwords");

    // if (passwords) {
    //   setPasswordArray(JSON.parse(passwords));
    // }
    getPasswords()
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (eyeref.current.src.includes("icons/eye.png")) {
      eyeref.current.src = "icons/hidden.png";
      passwordRef.current.type = "password";
    } else {
      eyeref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (form.site === "" || form.password === "" || form.username === "") {
      notify("Error: Please fill all details")
      return;
    } else {
      const confirmed = confirm("Are you sure you want to save this item?");
      if (confirmed) {
        
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        // localStorage.setItem(
        //   "passwords",
        //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
        // );
       
        await fetch("http://localhost:3000/", 
          { method: "POST", 
            headers : {"Content-Type" : "application/json"}, 
            body: JSON.stringify({ ...form, id: uuidv4()})
          })
      }
    }
    setForm({
      site: "",
      username: "",
      password: "",
    });
    notify("Password saved succesfully!")
  };

  const deletePassword = async (id) => {
    let c = confirm("Are you sure you want to delete the item?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      let res = await fetch("http://localhost:3000/", 
        { method: "DELETE", 
          headers : {"Content-Type" : "application/json"}, 
          body: JSON.stringify({id})
        })

    }

    notify("Password deleted succesfully!")
  };

  const editPost = async (id) => {
    setForm({...passwordArray.filter((item) => item.id === id)[0], id: id});
    await fetch("http://localhost:3000/", 
      { method: "DELETE", 
        headers : {"Content-Type" : "application/json"}, 
        body: JSON.stringify({id:form.id})
      })
    setPasswordArray(passwordArray.filter((item) => item.id !== id));


  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer min-h-[88.4vh]">
        <h1 className="text-4xl text font-bold text-center pt-5">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">Man /&gt;</span>
        </h1>
        <p className="text-green-900 text-md md:text-xl text-center">
          Your own password manager!
        </p>
        <div className="flex flex-col text-white p-4 gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full w-full p-4 py-1 text-black border border-green-600"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-5 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full w-full p-4 py-1 text-black border border-green-600"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full w-full p-4 py-1 text-black border border-green-600"
                type="password"
                ref={passwordRef}
                name="password"
                id="password"
              />
              <span
                className="absolute text-black right-[3px] top-[8px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={eyeref}
                  className=""
                  width={20}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-white flex justify-center items-center bg-green-500 rounded-full pl-2 pr-4 py-2 font-bold w-fit hover:bg-green-700 gap-2 border border-1 border-green-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
              state="hover-swirl"
              colors="primary:#30e8bd,secondary:#110a5c"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold py-4 text-2xl">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center w-32 border border-white">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <span
                          onClick={() => {
                            copyText(item.site);
                            notify("Copied to clipboard!");
                          }}
                          className="cursor-pointer"
                        >
                          <lord-icon
                            style={{
                              width: "15px",
                              height: "15px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="py-2 text-center w-32 border border-white">
                        {item.username}
                        <span
                          onClick={() => {
                            copyText(item.password);
                            notify("Copied to clipboard!");
                          }}
                          className="cursor-pointer"
                        >
                          <lord-icon
                            style={{
                              width: "15px",
                              height: "15px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="py-2 text-center w-32 border border-white">
                        {"*".repeat(item.password.length)}
                        <span
                          onClick={() => {
                            copyText(item.password);
                            notify("Copied to clipboard!");
                          }}
                          className="cursor-pointer"
                        >
                          <lord-icon
                            style={{
                              width: "15px",
                              height: "15px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="py-2 text-center w-32 border border-white">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => editPost(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          onClick={() => deletePassword(item.id)}
                          className="cursor-pointer mx-1"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
