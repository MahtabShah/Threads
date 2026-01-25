import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Window from "./components/window";
import { useEffect, useState } from "react";
import { Navigate } from "./components/navigate";

const break_point = {
  sm: 0,
  md: 601,
  lg: 1124,
};

const getBreakPoint = () => {
  const wd = window.innerWidth;
  if (wd > break_point.lg) return "lg";
  if (wd > break_point.md) return "md";
  return "sm";
};

export function useBreakPoints() {
  const [bp, setBp] = useState(getBreakPoint());

  useEffect(() => {
    const handelResize = () => {
      setBp(getBreakPoint());
    };

    window.addEventListener("resize", handelResize);
    return () => window.addEventListener("resize", handelResize);
  }, []);

  return bp;
}

function App() {
  const bp = useBreakPoints();
  const [audioList, setAudioList] = useState([]);
  return (
    <div className={`bg-dark small d-flex app ${bp === "lg" && "ml-500"}`}>
      <Window />

      {audioList.map((url, i) => (
        <audio key={i} controls src={`http://localhost:8081/${url}`} />
      ))}

      <Navigate setAudioList={setAudioList} />
    </div>
  );
}

export default App;
