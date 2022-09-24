import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

function Navbar() {
  const { user, setUserContext } = useContext(AuthContext);
  const logOut = () => {
    localStorage.removeItem("token");
    setUserContext(false);
  };

  const handleModeDark = () => {
    const body = document.querySelector("body");
    const style = body.classList.toggle("dark");
    console.log(style)
    style ? localStorage.setItem("dark", "dark") : localStorage.setItem("dark", "light");
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const dark = localStorage.getItem("dark") || "light";
    body.classList.add(dark);
  }, []);

  return (
    <nav className="py-3 shadow-md shadow-gray-600">
      <div className="px-2 w-full flex justify-center md:justify-start">
        <Link className="" href="/">
          <a className="font-semibold flex items-center">
            Alis Catálogos
            <img
              src="https://cdn-icons-png.flaticon.com/512/1685/1685052.png"
              alt="logo"
              className="w-10 h-10"
            />
          </a>
        </Link>
        <div className="m-auto"></div>
        {user && (
          <>
            <button
              onClick={logOut}
              className="
            rounded-md bg-red-600 font-semibold text-white px-4 py-2
          "
              type="button"
            >
              Salir
            </button>
          </>
        )}
        <button
          onClick={handleModeDark}
          className="
          btn__catalog rounded-md px-4 py-2
        "
          title="Modo oscuro"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>

        </button>
      </div>
    </nav>
  );
}

export default Navbar;
