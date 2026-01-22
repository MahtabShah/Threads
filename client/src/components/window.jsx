import styled from "styled-components";
import axios from "axios";
import { Thread } from "./thread";
import { UploadThread } from "./upload";
import { useEffect } from "react";
import { useState } from "react";

const API = "https://threads-73p7.onrender.com";

const Window = () => {
  const [threads, setThreads] = useState();
  const getThreads = async () => {
    const res = await axios.get(`${API}/threads`);
    console.log(res.data);
    setThreads(res.data);

    return res.data;
  };

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <StyleWrapper className="window w-100">
      <div className="bg-dark threads d-flex flex-column gap-4 vh-100">
        {threads &&
          threads.map((th, i) => {
            return <Thread th={th} key={th.user + i} />;
          })}
      </div>

      <UploadThread />
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  .window {
    color: #cccaca;
    max-width: 701px;
  }

  .threads {
    padding-bottom: 100px;
  }
`;

export default Window;
