import { UploadThread } from "./upload";
import styled from "styled-components";
import { CiLocationArrow1 } from "react-icons/ci";
import { Profile } from "./profile";
import { CgProfile } from "react-icons/cg";
import { useBreakPoints } from "../App";
import { PiSignInFill } from "react-icons/pi";

export const Navigation = ({ admin, open, setOpen }) => {
  const bp = useBreakPoints();
  const icons = [
    {
      key: "auth",
      Component: PiSignInFill,
      show: !admin,
    },
    {
      key: "editor",
      Component: CiLocationArrow1,
      show: bp !== "lg",
    },
    {
      key: "profile",
      Component: CgProfile,
      show: admin,
    },
  ];

  return (
    <>
      {icons.map(({ key, Component, show }) =>
        show ? (
          <Component
            key={key}
            size={27}
            cursor="pointer"
            onClick={() => setOpen(open === key ? null : key)}
            className={open === key ? "on-icon icon" : "icon"}
          />
        ) : null,
      )}
    </>
  );
};

export const SlideView = ({
  admin,
  openComment,
  setOpenComment,
  open,
  setOpen,
}) => {
  return (
    <StyleWrapper style={{ zIndex: 10101 }}>
      <UploadThread open={open} setOpen={setOpen} admin={admin} />

      <Profile
        open={open}
        setOpen={setOpen}
        admin={admin}
        openComment={openComment}
        setOpenComment={setOpenComment}
      />
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
    background: #272c33;
    box-shadow: 0 -2px 10px #252930cb;
    transition: all 140ms;

    border-radius: 0.6rem;
  }

  .close {
    opacity: 0;
  }

  .md-editor,
  .lg-editor {
    max-width: 540px !important;
    width: 540px !important;
    transform: translateX(100%);
    right: 0.5rem;
    bottom: 0.5rem;
    top: 0.5rem;
    border: 1px solid #3b3b3ba6;
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
    background: rgba(26, 31, 35, 0.09);
    backdrop-filter: blur(4px);
  }

  .m-btn {
    background: rgba(27, 30, 33, 0.65);
    background: #272c33;

    backdrop-filter: blur(4px);
  }

  .on-icon {
    border-bottom: 2px solid #fff;
  }

  .lg-navigate {
    width: calc(100% - 540px);
  }
`;
