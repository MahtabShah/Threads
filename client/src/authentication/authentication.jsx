import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
const API = "https://threads-73p7.onrender.com";

export const Authentication = ({ setOpen, _fetch }) => {
  const [data, setData] = useState({});

  const HandelAuth = async () => {
    await axios
      .post(`${API}/auth/_sign`, {
        data,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("_thread_token", res.data);
        _fetch(res.data);
        setOpen(null);
      });
  };

  return (
    <StyleWrapper
      className="position-absolute text-light hv-center h-100 auth-parent"
      style={{ zIndex: 1010 }}
    >
      <div
        className="p-4 bg-dark shadow-lg rounded-3 d-flex flex-column gap-3"
        style={{ maxWidth: "fit-content", border: "1px solid #454a4aac" }}
      >
        <div className="">
          <div className="fs-5">Sign in to create new account</div>
          <p style={{ color: "#c2c2c2" }}>
            Enter your name and email below to create new account
          </p>
        </div>
        <div className="d-flex flex-column gap-1 ">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="p-2 rounded-3"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="d-flex flex-column gap-1 ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="p-2 rounded-3"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>

        <div className="d-flex flex-column gap-1 ">
          <div className="d-flex justify-content-between">
            <label htmlFor="password">Password</label>
            {/* <small>Forgate Password</small> */}
          </div>
          <input
            type="password"
            name="password"
            className="p-2 rounded-3"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div onClick={HandelAuth}>
          <button className="w-100 my-2 bg-dark text-light fs-6 border rounded-3 p-2 text-center">
            Sign in
          </button>
          {/* <small>Already have an account</small> */}
        </div>
      </div>
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  input {
    outline: none;
    color: #eee;
    background: #333f4200;
    border: 1px solid #3b4242b6;
  }
`;
