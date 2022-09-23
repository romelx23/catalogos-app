import Card from "../components/ui/Card";
import { LayoutUnique, ButtonDownload } from "../components";
import { useFiles } from "../hooks/useFiles";
import { useEffect } from "react";

export default function Home() {
  const { files } = useFiles();
  return (
    <div className={"p-0 min-h-screen h-full"}>
      <LayoutUnique title={"Catálogos y productos"}>
        <div className="my-5 flex flex-col min-h-[80vh]">
          <div className="flex justify-center">
            <h1 className="pt-4 pb-4 text-center font-semibold text-xl text-white">
              Más Catálogos para ti ...
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6381/6381743.png"
              alt="icon"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {files.map((file, index) => (
              <Card key={index} card={file} />
            ))}

            {files.length === 0 && (
              <div className="flex flex-col items-center">
                <div className="border-4 border-r-transparent border-blue-600 rounded-full h-12 w-12 transition animate-spin"></div>
                <h1 className="text-white font-semibold">Cargando ...</h1>
              </div>
            )}
          </div>
          <div className="mt-5 py-3 text-white text-center w-100">
            <p className="m-0">
              Hecho con ❤️ por{" "}
              <a
                href="
              http://localhost:3000/"
                target="_blank"
                className="text-decoration-none text-white"
              >
                Alicia
              </a>
            </p>
          </div>
        </div>
        <ButtonDownload />
      </LayoutUnique>
    </div>
  );
}
