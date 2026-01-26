import { Thread } from "./thread";
import styled from "styled-components";
import { useBreakPoints } from "../App";

export const Profile = ({ openProfile, setOpenProfile, admin }) => {
  const bp = useBreakPoints();

  return (
    <StyleWrapper>
      {admin && (
        <div
          className={`profile-parent bg-dark position-fixed h-100 start-0 top-0 bottom-0 r-border  overflow-auto ${(bp == "lg" || openProfile) && "open"}`}
          style={{ zIndex: 111 }}
        >
          {!(bp == "lg") && (
            <div
              className="m-border position-absolute rounded p-2 m-2 px-3"
              style={{ right: "2px", cursor: "pointer" }}
              onClick={() => setOpenProfile(!openProfile)}
            >
              X
            </div>
          )}
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
              ipsam asperiores, neque, est quod numquam dolor tempora recusandae
              quae odio voluptas.
            </p>
          </div> */}

            <div className="user_threads pt-2 pb-5 d-flex flex-column gap-3">
              {/* {threads &&
                threads.map((th, i) => {
                  return <Thread th={th} key={th.user + i} />;
                })} */}
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

  .profile-parent::-webkit-scrollbar {
    width: 0;
  }

  .profile-parent {
    border-left: 1px solid #444;
    // background-color: rgb(29, 32, 35) !important;
    transform: translateX(-100%);
    transition: all 140ms;
    max-width: 500px !important;
    width: 100%;
  }

  .open {
    transform: translateX(0);
  }
`;
