import { LuHeart } from "react-icons/lu";
import { IoIosShareAlt } from "react-icons/io";
import { RiThreadsFill } from "react-icons/ri";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { useBreakPoints } from "../App";
import { IoCopyOutline } from "react-icons/io5";

// const API = "http://localhost:8081";
const API = "https://threads-73p7.onrender.com";

export const Thread = ({
  th,
  action,
  cur_id,
  setCur_id,
  admin,
  setOpenComment,
  openComment,
  setOpen,
}) => {
  const index = th?.likes?.findIndex((l) => l.user == admin?._id);
  const [isLiked, setIsLiked] = useState(index == -1 ? false : true);
  const [copied, setCopied] = useState(false);

  const _toggle = (th) => {
    const index = th?.likes?.findIndex((l) => l.user == admin?._id);

    if (index !== -1) {
      th.likes?.splice(index, 1);
      setIsLiked(false);
    } else {
      th.likes?.push({ user: admin?._id, value: 1 });
      setIsLiked(true);
    }
  };

  const _liked = async () => {
    if (admin && admin?._id) {
      try {
        _toggle(th);

        await axios
          .put(`${API}/thread/like`, {
            _thread_id: th?._id,
            _user_id: admin?._id,
          })
          .then((res) => {
            console.log(res.data);
          });
      } catch (err) {
        _toggle(th);
        console.error("having error in liking : ", err);
      }
    } else {
      alert("please sign in for positng thread....");
      setOpen("auth");
    }
  };

  return (
    <>
      {th?._id && (
        <>
          <div className="" onClick={() => setCur_id(null)}>
            <div className="d-flex shadow-lg py-3 p-3 w-100 rounded-3 text-light thread-parent">
              <div className="dp-div rounded-5 bg-dark overflow-hidden position-absolute">
                <img
                  src={th?.user?.dp}
                  className="h-100 w-100 rounded-5 "
                  alt="dp"
                />
              </div>
              <div className="w-100 curveature p-2 rounded- d-flex flex-column gap-1">
                <div className="d-flex gap-2 position-relative">
                  <div className="flex-grow-1">
                    <small style={{ color: "#b4b4b4" }}>
                      {" "}
                      <RiThreadsFill />
                      {th?.user?.name}
                    </small>
                    <small style={{ color: "#9c9c9c" }}> {th.created_at}</small>
                  </div>
                  {admin?._id == th?.user?._id && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setCur_id(cur_id == th?._id ? null : th._id);
                      }}
                      className="click"
                    >
                      <BsThreeDotsVertical cursor={"pointer"} />
                    </span>
                  )}

                  {th?._id == cur_id && admin?._id == th?.user?._id && (
                    <div
                      className="position-absolute rounded-5 shadow-lg"
                      style={{
                        background: "#20262a",
                        right: "32px",
                        top: "-2px",
                      }}
                    >
                      <button
                        className="m-border rounded-5 p-1 px-4 bg-dark text-light"
                        onClick={() => action(th)}
                      >
                        delete
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="msg post no-select   rounded"
                  style={{ color: "#cfd3d3" }}
                  dangerouslySetInnerHTML={{
                    __html: th?.thread?.replace(/\n/g, "<br />"),
                  }}
                  onDoubleClick={_liked}
                />

                <div className="d-flex  align-items-center gap-3 mt-2 small">
                  <div className="d-flex gap-1 small">
                    <small className="click" onClick={_liked}>
                      <LuHeart color={isLiked ? "red" : ""} size={18} />
                    </small>
                    <small style={{ marginTop: "5px" }}>
                      {th?.likes?.length || 0}
                    </small>
                  </div>
                  <div className="d-flex bord er align-itmes-start gap-1">
                    <small
                      className="click"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenComment(openComment == th ? null : th);
                      }}
                    >
                      <FaRegComment
                        color={`${openComment == th ? "#09dded" : ""}`}
                        size={17}
                      />
                    </small>
                    <small style={{ marginTop: "3px" }}>
                      {th.comments.length}
                    </small>
                  </div>
                  <div className="d-flex  gap-1">
                    <small
                      className={`click copy-icon ${copied ? "copied" : ""}`}
                      onClick={async () => {
                        await navigator.clipboard.writeText(th.thread);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 800);
                      }}
                    >
                      <IoCopyOutline size={17} />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
