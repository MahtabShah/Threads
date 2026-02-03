import React, { useEffect } from "react";
import axios from "axios";
import { CiLocationArrow1 } from "react-icons/ci";
import { useBreakPoints } from "../App";

const API = "https://threads-73p7.onrender.com";
// const API = "http://localhost:8081";

export const UploadThread = ({ setOpen, open, admin }) => {
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const bp = useBreakPoints();

  const handelSubmit = async () => {
    if (admin && admin?._id) {
      setLoading(true);
      try {
        await axios
          .post(`${API}/upload`, {
            text: document.querySelector("textarea").innerHTML,
            _id: admin?._id,
          })
          .then((res) => {
            console.log(res);
            window.location.reload();
          });

        console.log(document.querySelector("textarea").innerHTML);
      } catch (err) {
        console.error("having error in uploading : ", err);
      } finally {
        setLoading(false);
        setText("");
        setOpen(false);
      }
    } else {
      alert("please sign in for positng thread....");
      setOpen("auth");
    }
  };

  useEffect(() => {
    setOpen(bp == "lg");
  }, [bp]);

  return (
    <div
      className={`position-fixed ${bp}-editor p-3 editor ${open == "editor" || bp == "lg" ? "open" : "close"}`}
    >
      <div className="fs-6 p-1 mb-3">Write your thought .... </div>
      <textarea
        rows={7}
        className="w-100 m-border text-light p-2 rounded"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="bord er mt-2 d-flex gap-2 justify-content-end">
        <button
          className="m-btn p-1 px-3 rounded text-light m-border"
          onClick={() => setOpen(null)}
        >
          Cancel
        </button>

        {/* <button className="m-btn p-1 px-3 rounded text-light m-border">
          {loading ? (
            <div className="spinner-border text-light spinner-border-sm" />
          ) : (
            <>
              Voice <MdMicExternalOn />
            </>
          )}
        </button> */}

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
  );
};
