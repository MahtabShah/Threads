import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Window from "./components/window";
import { useEffect, useState } from "react";
import { Navigate } from "./components/navigate";
import { Authentication } from "./authentication/authentication";
import axios from "axios";

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

const API = "http://localhost:8081";

function App() {
  const bp = useBreakPoints();
  const [openAuth, setOpenAuth] = useState(false);
  const [admin, setAdmin] = useState(null);

  const _fetch_admin = async (_thread_token) => {
    await axios
      .post(`${API}/auth/_fetch_admin`, {
        headers: {
          Authorization: `Bearer ${_thread_token}`,
        },
      })
      .then((res) => {
        setAdmin(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    _fetch_admin(localStorage.getItem("_thread_token"));
  }, []);

  return (
    <div className={`bg-dark small d-flex app ${bp === "lg" && "ml-500"}`}>
      <Window />

      <Navigate setAuth={setOpenAuth} auth={openAuth} admin={admin} />
      {openAuth && <Authentication _fetch={_fetch_admin} />}
    </div>
  );
}

export default App;
