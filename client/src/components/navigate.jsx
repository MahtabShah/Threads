import { UploadThread } from "./upload";
import styled from "styled-components";
import { CiLocationArrow1 } from "react-icons/ci";
import { Profile } from "./profile";
import { CgProfile } from "react-icons/cg";
import { useBreakPoints } from "../App";
import { PiSignInFill } from "react-icons/pi";
import { LuCircleFadingPlus } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";

export const Navigation = ({ admin, open, setOpen }) => {
  const bp = useBreakPoints();
  const icons = [
    {
      key: "editor",
      Component: LuCircleFadingPlus,
      show: bp !== "lg",
    },
    {
      key: "auth",
      Component: FaRegCircleUser,
      show: !admin,
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

export const SlideView = ({}) => <></>;
