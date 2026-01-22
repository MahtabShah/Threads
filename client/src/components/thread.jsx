import { CgComment } from "react-icons/cg";
import { LuHeart } from "react-icons/lu";
import { IoIosShareAlt } from "react-icons/io";
import { RiThreadsFill } from "react-icons/ri";
import styled from "styled-components";

export const Thread = ({ th }) => {
  return (
    <StyleWrapper className="d-flex px-2 pt-3 rounded-3 text-light">
      <div className="dp-div rounded-5 pt-2 bg-dark overflow-hidden position-absolute">
        <img src={th.dp} className="h-100 w-100 rounded-5 " alt="dp" />
      </div>
      <div className="w-100 curveature py-2 rounded- d-flex flex-column gap-1">
        <div className="d-flex gap-2">
          <small style={{ color: "#b4b4b4" }}>
            {" "}
            <RiThreadsFill />
            {th.user}
          </small>
          <small style={{ color: "#9c9c9c" }}>{th.created_at}</small>
        </div>
        <div className="msg pe-2">{th.thread}</div>

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
    </StyleWrapper>
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
`;
