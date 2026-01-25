import { Thread } from "./thread";
import styled from "styled-components";
import { useBreakPoints } from "../App";
const threads = [
  {
    _id: "69726d2cc120ac483912b20c",
    user: "__mahtab.shah",
    thread:
      "This is the thread to thread communication plateform, share your thought by choice",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
    created_at: "2026-01-22T18:30:15.000Z",
    like: 116,
    comments: 18,
    share: 65,
    __v: 0,
  },
  {
    _id: "69726dc2c120ac483912b212",
    user: "__mahtab.shah",
    thread: "Yes it is now done, all the best lovely people......!",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
    created_at: "2026-01-22T18:30:15.000Z",
    like: 109,
    comments: 111,
    share: 103,
    __v: 0,
  },
  {
    _id: "697276213fac626406940b6e",
    user: "__mahtab.shah",
    thread:
      "Aayine ki najar lag na jaaye kahi, hoga ye jab faisla fir tum pachtaoge,\nHam iraada nhi kiye hai jaane wafaa ab kyo ghabraoge.....💖💯❤️",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
    created_at: "2026-01-22T19:02:45.000Z",
    like: 260,
    comments: 15,
    share: 61,
    __v: 0,
  },
  {
    _id: "697276743fac626406940b72",
    user: "__mahtab.shah",
    thread:
      "Ab kaun haal poochhega mera, ab uska wajood hi nhi raha nere jite ji 😞😔",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
    created_at: "2026-01-22T19:02:45.000Z",
    like: 149,
    comments: 119,
    share: 104,
    __v: 0,
  },
  {
    _id: "69730251f2cf7f4c6e7715db",
    user: "__mahtab.shah",
    thread:
      "Ek old story yaad aati hai ki... Ek baar ek Arabian tha jo ek nadi ke kinare baitha hua , chamakti hui chhoti chhoti kankariyan us nadi me fenk raha tha, aur jab last wala haath me leta hai toh use pata chalta hai ki ye toh diamond 💎 hai, \n\nKabhi kabhi hamare sath bhi aisa hi hota hai ki jab hamare pass chheje jayada hoti hai, aur jab last stage par pahunchati hai toh malum hota hai ki ye toh diamond hai, isliye isase pahle der ho jaaye us previous cheej ko sambhal lo......",
    dp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGvgEAwTMf9Gnfo35EuDrBpmAUXHD6fkmwLQ&s",
    created_at: "2026-01-23T05:08:29.000Z",
    like: 355,
    comments: 206,
    share: 50,
    __v: 0,
  },
];

export const Profile = ({ openProfile, setOpenProfile }) => {
  const bp = useBreakPoints();

  return (
    <StyleWrapper>
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
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY4ZhdaTaeaDiMrEl_YRU8_8txhzBh2hQcA&s"
              alt="profie_photo"
            />
          </div>
          <center className="fs-5">Mahtab Shah</center>
          <center
            className="pb-4"
            style={{ color: "#eef0f1c4", borderBottom: "1px solid #333" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit dicta
            ducimus, cupiditate.
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
            {threads &&
              threads.map((th, i) => {
                return <Thread th={th} key={th.user + i} />;
              })}
          </div>
        </div>
      </div>
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
  }

  .open {
    transform: translateX(0);
  }
`;
