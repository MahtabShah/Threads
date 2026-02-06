import { Thread } from "./thread";
import styled from "styled-components";
import { useBreakPoints } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// const API = "http://localhost:8081";
const API = "https://threads-73p7.onrender.com";

export const Profile = ({ setOpen, admin, openComment, setOpenComment }) => {
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
        <div className={`profile-parent`}>
          <div
            className="p-1"
            style={{
              top: 0,
              position: "sticky",
              zIndex: 1000,
              background: " #272c33",
            }}
          />

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

  .profile-parent {
    transition: all 140ms;
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
  }

  .dp-div {
    z-index: 1000;
  }

  .hv-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .post {
    color: rgb(218, 218, 218);
    whitespace: pre-line;
  }
`;
