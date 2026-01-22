import React from "react";
import axios from "axios";
import { ImUpload2 } from "react-icons/im";
import styled from "styled-components";
import { CiLocationArrow1 } from "react-icons/ci";
const API = "https://threads-73p7.onrender.com";

export const UploadThread = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");

  const handelSubmit = async () => {
    setLoading(true);
    try {
      await axios
        .post(`${API}/upload`, {
          text: text,
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        });
    } catch (error) {
      console.error("having error in uploading : ", err);
    }

    setLoading(false);
    setText("");
    setOpen(false);
  };

  return (
    <StyleWrapper>
      <div className="p-3 position-fixed bg-dark w-100 start-0 bottom-0 action hv-center text-light">
        <ImUpload2
          size={24}
          cursor={"pointer"}
          onClick={() => setOpen(!open)}
        />
      </div>

      <div
        className={`position-fixed w-100  start-0 p-3 editor ${open && "open"}`}
      >
        <textarea
          rows={5}
          className="w-100 m-border text-light p-2 rounded"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="bord er mt-2 d-flex gap-2 justify-content-end">
          <button
            className="m-btn p-1 px-3 rounded text-light m-border"
            onClick={() => setOpen(false)}
          >
            cancel
          </button>
          <button
            className="m-btn p-1 px-3 rounded text-light m-border"
            onClick={() => {
              handelSubmit();
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-light spinner-border-sm" />
            ) : (
              <>
                Post <CiLocationArrow1 />
              </>
            )}
          </button>
        </div>
      </div>
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  .action {
    z-index: 1002;
    border-top: 1px solid #585858;
  }

  .editor {
    bottom: 56px;
    height: 0;
    transform: translateY(100px);
    z-index: 1000;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 -2px 10px #252930cb;
    transition: all 40ms;
    background: rgba(27, 30, 33, 1);
    border-top: 1px solid #585858;
  }

  .open {
    height: 84dvh;
  }

  textarea {
    outline: none;
    background: rgba(25, 28, 31, 0.39);
    backdrop-filter: blur(4px);
  }

  .m-btn {
    background: rgba(27, 30, 33, 0.65);
    backdrop-filter: blur(4px);
  }
`;
