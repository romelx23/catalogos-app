import React, { useContext } from "react";
import { FormCatalog, FormLogin, LayoutUnique } from "../components";
import { AuthContext } from "../context/auth/AuthContext";

export default function Catalog() {
  const { user } = useContext(AuthContext);
  return (
    <LayoutUnique title={"Ingresar catálogo"}>
      <div className="min-h-screen w-full pt-14">
        {user ? <FormCatalog /> : <FormLogin />}
      </div>
    </LayoutUnique>
  );
}
