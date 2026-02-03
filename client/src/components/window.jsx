import styled from "styled-components";
import axios from "axios";
import { Thread } from "./thread";
import { useEffect } from "react";
import { useState } from "react";
import { useBreakPoints } from "../App";
const API = "https://threads-73p7.onrender.com";
// const API = "http://localhost:8081";

const Window = ({
  admin,
  openComment,
  setOpenComment,
  threads,
  setThreads,
  setOpen,
}) => {
  const [cur_id, setCur_id] = useState(null);
  const [loading, setloading] = useState(false);

  const bp = useBreakPoints();

  const getThreads = async () => {
    setloading(true);
    const res = await axios.get(`${API}/threads`);
    setThreads(res.data);
    setloading(false);
    return res.data;
  };

  const action = async (th) => {
    const newThread = threads?.filter((t) => t._id != th._id);
    setThreads(() => [...newThread]);
    setCur_id(null);
    await axios.delete(`${API}/delete/${th._id}`);
  };

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    const win = document.querySelector(".window");
    win.classList.toggle("overflow-hidden");
  }, [openComment]);

  return (
    <StyleWrapper
      className={`thread position-relative window w-100 d-flex flex-column gap-4 p-2 ${bp == "lg" && "px-2"}`}
    >
      {threads?.length ? (
        threads.map((th, i) => {
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
              setOpen={setOpen}
            />
          );
        })
      ) : loading ? (
        <div className="spinner-border text-light spinner-border-sm" />
      ) : (
        <div>No threads</div>
      )}
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  .window {
    color: #cccaca;
  }
  .thread {
    max-width: 600px;
  }
`;

export default Window;
