import "./App.css";
import Window from "./components/window";
import { useEffect, useState } from "react";
import { SlideView } from "./components/navigate";
import { Authentication } from "./authentication/authentication";
import axios from "axios";
import { LuHeart } from "react-icons/lu";
import { RiThreadsFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import styled from "styled-components";
import { Navigation } from "./components/navigate";
// const API = "http://localhost:8081";
const API = "https://threads-73p7.onrender.com";

const break_point = {
  sm: 0,
  md: 601,
  lg: 1124,
};

const getBreakPoint = () => {
  const wd = window.innerWidth;
  if (wd > break_point.lg) return "lg";
  if (wd > break_point.md) return "md";
  return "sm";
};

export function useBreakPoints() {
  const [bp, setBp] = useState(getBreakPoint());

  useEffect(() => {
    const handelResize = () => {
      setBp(getBreakPoint());
    };

    window.addEventListener("resize", handelResize);
    return () => window.addEventListener("resize", handelResize);
  }, []);

  return bp;
}

function App() {
  const bp = useBreakPoints();
  const [admin, setAdmin] = useState(null);
  const [threads, setThreads] = useState([]);
  const [openComment, setOpenComment] = useState(null);
  const [open, setOpen] = useState(null);

  const _fetch_admin = async (_thread_token) => {
    await axios
      .post(`${API}/auth/_fetch_admin`, {
        headers: {
          Authorization: `Bearer ${_thread_token}`,
        },
      })
      .then((res) => {
        setAdmin(res.data);
      });
  };

  const _del_comment = async (cmt) => {
    const filtered = openComment?.comments?.filter((prv) => prv._id != cmt._id);
    console.log(filtered);

    setOpenComment((prev) => {
      return Object.assign({}, prev, { comments: filtered });
    });

    setThreads((prev) =>
      prev.map((thread) =>
        thread._id === openComment?._id
          ? { ...thread, comments: filtered }
          : thread,
      ),
    );

    try {
      await axios.delete(`${API}/thread/comment/delete`, {
        data: {
          _thread_id: openComment?._id,
          _cmt_id: cmt?._id,
        },
      });
    } catch (err) {
      console.error("having error in deleting comment : ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("_thread_token");
    if (token) _fetch_admin(token);
  }, []);

  return (
    <>
      <div
        className={`position-relative small d-flex app ${bp === "lg" && "ml-500"} ${bp != "sm" && "ml-64"}`}
        onClick={() => {
          if (openComment) setOpenComment(null);
        }}
      >
        <div
          className={`p-3 d-flex  text-light start-0 bottom-0 position-fixed  gap-4 ${bp == "sm" ? "end-0" : "flex-column top-0 rounded-3 m-2"}`}
          style={{
            width: bp == "sm" ? "100%" : "64px",
            zIndex: 1111111,
            background: "#272c33",
            border: "1px solid #3b3b3ba6",
          }}
        >
          <Navigation
            admin={admin}
            openComment={openComment}
            setOpenComment={setOpenComment}
            open={open}
            setOpen={setOpen}
          />
        </div>

        <SlideView
          admin={admin}
          openComment={openComment}
          setOpenComment={setOpenComment}
          open={open}
          setOpen={setOpen}
        />
        {/* 
        <UploadThread open={open} setOpen={setOpen} admin={admin} />
        <Profile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          admin={admin}
          openComment={openComment}
          setOpenComment={setOpenComment}
        /> */}

        {open == "auth" && (
          <Authentication setOpen={setOpen} _fetch={_fetch_admin} />
        )}

        <CommentWrapper className="w-100">
          <div className={`pb-5 mb-5 d-flex`} style={{ minHeight: "90vh" }}>
            <Window
              admin={admin}
              openComment={openComment}
              setOpenComment={setOpenComment}
              threads={threads}
              setThreads={setThreads}
              setOpen={setOpen}
            />
          </div>

          <CommentSections
            admin={admin}
            openComment={openComment}
            setOpenComment={setOpenComment}
            action={_del_comment}
            setOpen={setOpen}
          />
        </CommentWrapper>
      </div>
    </>
  );
}

const CommentSections = ({
  admin,
  openComment,
  setOpenComment,
  action,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const _comment = async () => {
    if (admin && admin?._id) {
      setLoading(true);
      try {
        await axios
          .post(`${API}/thread/comment`, {
            _thread_id: openComment?._id,
            _user_id: admin?._id,
            _text: text,
          })
          .then((res) => {
            console.log(res.data);
          });
      } catch (err) {
        console.error("having error in liking : ", err);
      }
      setLoading(false);
    } else {
      alert("please sign in for positng thread....");
      setOpen("auth");
    }
  };

  const _handelText = (e) => {
    setText(e.target.value);

    let n = e.target.value.split("\n").length;
    const txt = document.querySelector(".comment textarea");
    if (n <= 5) txt.setAttribute("rows", n);
  };

  const [cmtDot, setCmtDot] = useState(null);
  return (
    <>
      {openComment && (
        <div
          className={`d-flex flex-column gap-3 overflow-hidden mt text-light comments-parent bg-dark`}
          style={{ zIndex: 11111 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="fs-6 px-3 py-3 d-flex justify-content-between "
            style={{ background: "#242a31" }}
          >
            <div className="ps-1">Comment Section</div>
            <div
              className="m-border click p-1 small me-2"
              onClick={() => setOpenComment(null)}
            >
              X
            </div>
          </div>

          <div className="overflow-auto comments h-100 p-2">
            {openComment?.comments?.map((c, i) => {
              return (
                <CommentReplica
                  cmt={c}
                  key={i}
                  admin={admin}
                  cmtDot={cmtDot}
                  setCmtDot={setCmtDot}
                  action={action}
                />
              );
            })}

            {!openComment?.comments?.length && <div>No comments </div>}
          </div>

          <div className="comment gap-3 p- d-flex align-items-end m-2">
            <textarea
              value={text}
              rows={1}
              onInput={_handelText}
              className="w-100 bg-dark text-light mb-1 px-3 border-0"
            />

            <button
              className="m-btn rounded-5 m-1 border-0 bg-primary text-light"
              // disabled={loading}
              style={{
                minWidth: "32px",
                minHeight: "32px",
                zIndex: 1202,
              }}
            >
              {loading ? (
                <div className="spinner-border text-light spinner-border-sm" />
              ) : (
                <CiLocationArrow1 onClick={_comment} size={18} color="#fff" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const CommentReplica = ({ cmt, admin, cmtDot, setCmtDot, action }) => {
  return (
    <div
      className="d-flex py-3 p-2 w-100 rounded-3 text-light position-relative"
      // onDoubleClick={_liked}
    >
      <div className="dp-div rounded-5 bg-dark overflow-hidden position-absolute">
        <img src={cmt?.user?.dp} className="h-100 w-100 rounded-5 " alt="dp" />
      </div>
      <div className="w-100 curveature p-2 rounded- d-flex flex-column gap-1">
        <div className="d-flex gap-2 position-relative">
          <div className="flex-grow-1">
            <small style={{ color: "#b4b4b4" }}>
              <RiThreadsFill />
              {cmt?.user?.name}
            </small>
            <small style={{ color: "#9c9c9c" }}> {cmt.created_at}</small>
          </div>
          {cmt?.user?._id == admin?._id && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setCmtDot(cmtDot?._id == cmt?._id ? null : cmt);
              }}
              className="click"
            >
              <BsThreeDotsVertical cursor={"pointer"} />
            </span>
          )}
          {cmt?.user?._id == admin?._id && cmtDot?._id == cmt?._id && (
            <div
              className="position-absolute ops rounded-5 shadow-lg"
              style={{ background: "#1a2024" }}
            >
              <button
                className="m-border rounded-5 p-1 px-4 bg-dark text-light"
                onClick={() => action(cmt)}
              >
                delete
              </button>
            </div>
          )}
        </div>

        <div
          className="msg post rounded"
          style={{ color: "#cfd3d3" }}
          dangerouslySetInnerHTML={{
            __html: cmt?.value?.replace(/\n/g, "<br />"),
          }}
        />

        {/* <div className="d-flex align-items-center gap-2 mt-2 small">
          <div className="d-flex small">
            <small className="click">
              <LuHeart size={13} />
            </small>
            <small style={{ marginTop: "5px" }}></small>
          </div>
          <div className="d-flex bord er align-itmes-start gap-1">
            <small className="click">
              <FaRegComment size={13} />
            </small>
            <small style={{ marginTop: "3px" }}></small>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const CommentWrapper = styled.div`
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
    background-color: rgba(41, 45, 50, 0.85) !important;
  }

  .post {
    color: rgb(218, 218, 218);
    whitespace: pre-line;
  }
`;

export default App;
