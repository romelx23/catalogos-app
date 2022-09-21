import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

function Navbar() {
  const { user, setUserContext } = useContext(AuthContext);
  const logOut = () => {
    localStorage.removeItem("token");
    setUserContext(false);
  };

  return (
    <nav className="py-3 navbar-dark bg-dark fixed-top shadow-md shadow-gray-600">
      <div className="px-2 w-full flex justify-center md:justify-start">
        <Link className="" href="/">
          <a className="text-white navbar-brand font-semibold flex items-center">
            Alis Catálogos
            <img
              src="https://cdn-icons-png.flaticon.com/512/1685/1685052.png"
              alt="logo"
              className="w-10 h-10"
            />
          </a>
        </Link>
        {user && (
          <>
            <div className="m-auto"></div>
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
      </div>
    </nav>
  );
}

export default Navbar;
