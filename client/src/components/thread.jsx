import { CgComment } from "react-icons/cg";
import { LuHeart } from "react-icons/lu";
import { IoIosShareAlt } from "react-icons/io";
import { RiThreadsFill } from "react-icons/ri";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

export const Thread = ({ th, action, cur_id, setCur_id }) => {
  return (
    <>
      <StyleWrapper>
        <div className="d-flex py-3 p-2 w-100 rounded-3 text-light thread-parent">
          <div className="dp-div rounded-5 bg-dark overflow-hidden position-absolute">
            <img src={th.user.dp} className="h-100 w-100 rounded-5 " alt="dp" />
          </div>
          <div className="w-100 curveature p-2 rounded- d-flex flex-column gap-1">
            <div className="d-flex gap-2 position-relative">
              <div className="flex-grow-1">
                <small style={{ color: "#b4b4b4" }}>
                  {" "}
                  <RiThreadsFill />
                  {th.user.name}
                </small>
                <small style={{ color: "#9c9c9c" }}> {th.created_at}</small>
              </div>
              <span
                onClick={() => {
                  setCur_id(cur_id == th._id ? null : th._id);
                }}
              >
                <BsThreeDotsVertical cursor={"pointer"} />
              </span>

              {th._id == cur_id && (
                <div className="position-absolute bg-dark px-4 ops m-border p-2">
                  <button
                    className="m-border rounded p-1 px-4 bg-dark text-light"
                    onClick={() => action(th)}
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
                __html: th.thread.replace(/\n/g, "<br />"),
              }}
            />

            <div className="d-flex align-items-center gap-3 mt-2 small">
              <div className="d-flex bord er align-itmes-end gap-1 small">
                <small>
                  <LuHeart size={18} />
                </small>
                <small>{th.like}</small>
              </div>
              <div className="d-flex bord er align-itmes-start gap-1">
                <small>
                  <CgComment size={18} />
                </small>
                <small>{th.comments}</small>
              </div>
              <div className="d-flex bor der  align-itmes-start gap-1">
                <small>
                  <IoIosShareAlt size={18} />
                </small>
                <small> {th.share}</small>
              </div>
            </div>
          </div>
        </div>
      </StyleWrapper>
    </>
  );
};

const StyleWrapper = styled.div`
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

  .ops {
    top: 4px;
    right: 32px;
  }

  .thread-parent {
    background-color: rgba(41, 45, 50, 0.85) !important;
  }

  .post {
    color: rgb(218, 218, 218);
    whitespace: pre-line;
  }
`;
