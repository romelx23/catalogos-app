import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { CatalogContext } from "../../context";
import { useFetch } from "../../hooks/useFetch";
import { useFiles } from "../../hooks/useFiles";
import { useForm } from "../../hooks/useForm";
import { ImageCard } from "./ImageCard";

export const FormCatalog = () => {
  const { postForm, deleteCatalog, updateCatalog } = useFetch();
  const {
    addCatalog,
    updateCatalog: updateCatalogContext,
    deleteCatalog: deleteCatalogContext,
    searchCatalog,
    catalogs,
    catalogsSearch
  } = useContext(CatalogContext);

  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearch, setisSearch] = useState(false);
  const { values, setValues, handleInputChange, reset } = useForm({
    title: "",
    img: "",
    pub_date: "",
    url_download: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values, new Date(values.pub_date).toISOString());
    const newCatalog = {
      title: values.title,
      img: values.img,
      pub_date: new Date(values.pub_date).toISOString(),
      url_download: values.url_download,
    }
    postForm(newCatalog);
    addCatalog(values);
    reset();
  };
  const selectUpdate = (catalog) => {
    // console.log(catalog);
    setUpdate(true);
    const parseDate = new Date(catalog.pub_date).toISOString().split("T")[0];
    setValues({
      id: catalog.id || "",
      title: catalog.title || "",
      url_download: catalog.url_download || "",
      img: catalog.img || "",
      pub_date: parseDate || "",
    });
    // updateCatalog(values.id, values)
  };
  const handleUpdate = (e, id, values) => {
    e.preventDefault();
    console.log("update", id, values);
    updateCatalog(id, values);
    updateCatalogContext(id, values);
    setUpdate(false);
    reset();
  };
  const handleDelete = (id) => {
    deleteCatalogContext(id);
    deleteCatalog(id);
  };

  const handleClear = () => {
    reset();
    setUpdate(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      searchCatalog(search);
      setisSearch(true);
    } else {
      setisSearch(false);
    }
  };

  const handleCopy = (file) => {
    navigator.clipboard.writeText(file);
  };
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl pb-4 text-center font-semibold ">
          Formulario Para añadir un catálogo
        </h1>
        <form
          onSubmit={
            update
              ? (e) => handleUpdate(e, values.id, values)
              : (e) => handleSubmit(e)
          }
          className="relative"
        >
          <button
            type="button"
            className="px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white flex gap-2 absolute right-0 -top-3 font-semibold"
            onClick={handleClear}
          >
            Limpiar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-white">
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleInputChange}
              value={values.title}
              placeholder="Título del catálogo"
              className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg md:w-[350px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="img" className="text-white">
              Imagen
            </label>
            <input
              type="text"
              name="img"
              id="img"
              onChange={handleInputChange}
              value={values.img}
              placeholder="URL de la imagen"
              className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pub_date" className="text-white">
              Fecha de Publicación del catálogo
            </label>
            <input
              type="date"
              name="pub_date"
              id="pub_date"
              onChange={handleInputChange}
              value={values.pub_date}
              placeholder="Fecha de publicación"
              className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="url_download" className="text-white">
              Url de descarga
            </label>
            <input
              type="text"
              name="url_download"
              id="url_download"
              onChange={handleInputChange}
              value={values.url_download}
              placeholder="URL de descarga"
              className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg"
            />
          </div>
          {update ? (
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md font-semibold w-full mt-4"
            >
              Actualizar
            </button>
          ) : (
            <button
              disabled={
                values.title === "" ||
                values.url_download === "" ||
                values.img === "" ||
                values.pub_date === ""
              }
              className="btn w-full mt-4"
              type="submit"
            >
              Enviar
            </button>
          )}
        </form>
        {values.title === "" ||
          values.url_download === "" ||
          (values.img === "" ? null : (
            <p className="text-red-600 font-semibold">
              Debe llenar todos los campos
            </p>
          ))}
      </div>
      <div className="w-full flex flex-col items-center pt-4">
        <div className="flex flex-col pb-4">
          <h1 className="text-xl pb-4 text-center font-semibold ">
            Catálogos
          </h1>
          <form onSubmit={(e) => handleSearch(e)} className="flex text-white">
            <input
              type="text"
              placeholder="Buscar catálogo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg md:w-[350px] ml-4"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white flex gap-2 font-semibold"
              onClick={handleClear}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="w-full px-8 overflow-x-auto mb-4">
          <table className="table-auto w-full mt-4 mb-2">
            <thead>
              <tr>
                <th className="px-4 py-2 capitalize">Título</th>
                <th className="px-4 py-2">Fecha de publicación</th>
                <th className="px-4 py-2">Imagen</th>
                <th className="px-4 py-2">Url de descarga</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                isSearch ?
                  catalogsSearch.length !== 0 ? catalogsSearch.map((file) => (
                    <tr key={file.id}>
                      <td className="border px-4 py-2">{file.title}</td>
                      <td className="border px-4 py-2">{file.pub_date}</td>
                      <td className="border px-4 py-2">
                        <ImageCard url={file.img} title={file.title} />
                      </td>
                      <td className="border px-4 py-2 overflow-auto">
                        <div className="flex flex-col">
                          <a
                            href={file.url_download}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-blue-500 hover:text-blue-600 w-52 flex text-ellipsis "
                          >
                            {file.url_download}
                          </a>
                          <button
                            className="btn mt-2 flex justify-center"
                            onClick={() => handleCopy(file.url_download)}
                          >
                            Copiar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>

                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2 flex flex-col h-72 justify-center gap-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => selectUpdate(file)}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn__danger"
                          onClick={() => handleDelete(file.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                    :
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="5">No se encontraron resultados</td>
                    </tr>
                  :
                  catalogs.map((file) => (
                    <tr key={file.id}>
                      <td className="border px-4 py-2">{file.title}</td>
                      <td className="border px-4 py-2">{file.pub_date}</td>
                      <td className="border px-4 py-2">
                        <ImageCard url={file.img} title={file.title} />
                      </td>
                      <td className="border px-4 py-2 overflow-auto">
                        <div className="flex flex-col">
                          <a
                            href={file.url_download}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-blue-500 hover:text-blue-600 w-52 flex text-ellipsis "
                          >
                            {file.url_download}
                          </a>
                          <button
                            className="btn mt-2 flex justify-center"
                            onClick={() => handleCopy(file.url_download)}
                          >
                            Copiar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>

                          </button>
                        </div>
                      </td>
                      <td className="border px-4 py-2 flex flex-col h-72 justify-center gap-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => selectUpdate(file)}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn__danger"
                          onClick={() => handleDelete(file.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
