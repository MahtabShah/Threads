import { UploadThread } from "./upload";
import { ImUpload2 } from "react-icons/im";
import { RiTextWrap } from "react-icons/ri";
import styled from "styled-components";
import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { Profile } from "./profile";
import { RiProfileFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { useBreakPoints } from "../App";

export const Navigate = ({}) => {
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const bp = useBreakPoints();

  return (
    <StyleWrapper style={{ zIndex: 10101 }}>
      <div
        className={`p-3 position-fixed bg-dark  bottom-0 end-0 action hv-center text-light d-flex gap-3  ${bp == "lg" ? "lg-navigate" : "w-100"}`}
      >
        {bp != "lg" && (
          <CgProfile
            size={27}
            cursor={"pointer"}
            onClick={() => setOpenProfile(!openProfile)}
            className={`${openProfile && "on-icon"}`}
          />
        )}
        <CiLocationArrow1
          size={27}
          cursor={"pointer"}
          onClick={() => setOpen(!open)}
          className={`${open && "on-icon"}`}
        />
      </div>
      <UploadThread open={open} setOpen={setOpen} />
      <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  .action {
    z-index: 1002;
    border-top: 1px solid #333;
  }

  .editor {
    z-index: 1000;
    background: rgba(27, 30, 33, 1);
    box-shadow: 0 -2px 10px #252930cb;
    transition: all 140ms;
  }

  .close {
    opacity: 0;
  }

  .md-editor,
  .lg-editor {
    max-width: 500px !important;
    width: 500px !important;
    height: 100%;
    border-left: 1px solid #585858;
    border-radius: 0 1rem 0 0;
    transform: translateX(-100%);
  }

  .sm-editor {
    height: 84dvh;
    bottom: 56px;
    width: 100%;
    border-radius: 1rem 1rem 0 0;
    border-top: 1px solid #585858;
    transform: translateY(100%);
  }

  .sm-editor.open {
    transform: translateY(10%);
  }

  .md-editor.open {
    transform: translateX(0%);
  }

  .lg-editor.open {
    transform: translateX(0%);
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

  .on-icon {
    border-bottom: 2px solid #fff;
  }

  .lg-navigate {
    width: calc(100% - 500px);
  }
`;
