import { Thread } from "./thread";
import styled from "styled-components";
import { useBreakPoints } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// const API = "http://localhost:8081";
const API = "https://threads-73p7.onrender.com";

export const Profile = ({
  open,
  setOpen,
  admin,
  openComment,
  setOpenComment,
}) => {
  const bp = useBreakPoints();

  const [userThread, setThreads] = useState([]);
  const [cur_id, setCur_id] = useState(null);

  const action = async (th) => {
    const newThread = userThread?.filter((t) => t._id != th._id);
    setThreads(() => [...newThread]);
    setCur_id(null);
    await axios.delete(`${API}/delete/${th._id}`);
  };

  const HandelUserThread = async () => {
    await axios.get(`${API}/user/threads/${admin?._id}`).then((res) => {
      if (res.data) {
        setThreads(res.data);
      }
    });
  };

  useEffect(() => {
    if (admin?._id && !userThread?.length) HandelUserThread();
  }, [admin]);

  return (
    <StyleWrapper>
      {admin?._id && (
        <div
          className={`profile-parent ${bp == "sm" && "sm-profile"} position-fixed   overflow-auto ${open == "profile" && "open"}`}
          style={{ zIndex: 11111 }}
        >
          <div
            className="p-1"
            style={{
              top: 0,
              position: "sticky",
              zIndex: 1000,
              background: " #272c33",
            }}
          />
          <div
            className="m-border position-absolute click rounded-5 p-2 m-2"
            style={{ right: "2px", cursor: "pointer" }}
            onClick={() => setOpen(null)}
          >
            X
          </div>
          <div className=" d-flex flex-column gap-2 text-light w-100 p-2 py-4">
            <div className="profile-dp w-100 d-flex justify-content-center">
              <img src={admin?.dp} alt="profie_photo" />
            </div>
            <center className="fs-5">{admin?.name}</center>
            <center
              className="pb-4"
              style={{ color: "#eef0f1c4", borderBottom: "1px solid #333" }}
            >
              Hey ! I am using vibe thread, feel free to use and enjoy !
            </center>

            {/* <div className="d-flex flex-column gap-1">
              <b>About</b>
              <p className="border-top pt-1" style={{ color: "#ddd" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                nihil mollitia repellendus quasi delectus sed alias unde hic,
                ipsam asperiores, neque, est quod numquam dolor tempora
                recusandae quae odio voluptas.
              </p>
            </div> */}

            <div className="user_threads position-relative pt-2 pb-5 d-flex flex-column gap-3">
              {userThread &&
                userThread.map((th, i) => {
                  return (
                    <Thread
                      th={th}
                      key={th.user + i}
                      action={action}
                      cur_id={cur_id}
                      setCur_id={setCur_id}
                      admin={admin}
                      openComment={openComment}
                      setOpenComment={setOpenComment}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  .profile-dp img {
    object-fit: cover;
    border-radius: 50%;
    height: 7rem !important;
    width: 7rem !important;
  }

  .profile-parent::-webkit-scrollbar {
    width: 0;
  }

  .profile-parent {
    border: 1px solid #35393c;
    background-color: #272c33 !important;
    transform: translateX(120%);
    transition: all 140ms;
    max-width: 540px !important;
    width: 100%;
    right: 0.5rem;
    top: 0.5rem;
    bottom: 0.5rem;
    border-radius: 0.6rem;
  }

  .sm-profile {
    bottom: 4rem;
    width: fit-content;
    margin: auto;
    left: 0.5rem;
  }

  .open {
    transform: translateX(0);
  }

  .dp-div {
    min-width: 32px;
    max-width: 32px;
  }

  .dp-div img {
    min-width: 32px;
    max-width: 32px;
    max-height: 32px;
    object-fit: cover;
  }

  .curveature {
    margin-left: 16px !important;
    padding-left: 24px !important;
    border-left: 1px solid #6c6c6c;
    background: linear-gradient(180deg, #45454500, #00000007);
  }

  .dp-div {
    z-index: 1000;
  }

  .hv-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thread-parent {
    background-color: rgba(44, 48, 54, 0.85) !important;
  }

  .post {
    color: rgb(218, 218, 218);
    whitespace: pre-line;
  }
`;
