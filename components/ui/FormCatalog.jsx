import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useFiles } from "../../hooks/useFiles";
import { useForm } from "../../hooks/useForm";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const FormCatalog = () => {
  const { postForm, deleteCatalog, updateCatalog } = useFetch();
  const { files, getFiles } = useFiles();
  const [catalogs, setCatalogs] = useState([]);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const { values, setValues, handleInputChange, reset } = useForm({
    title: "",
    img: "",
    pub_date: "",
    url_download: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values, new Date(values.pub_date).toISOString());
    postForm({
      title: values.title,
      img: values.img,
      pub_date: new Date(values.pub_date).toISOString(),
      url_download: values.url_download,
    });
    getFiles();
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
    getFiles();
    setUpdate(false);
    reset();
  };
  const handleDelete = (id) => {
    setCatalogs(catalogs.filter((catalog) => catalog.id !== id));
    deleteCatalog(id);
  };

  const handleClear = () => {
    reset();
    setUpdate(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = files.filter((catalog) => {
      return catalog.title.toLowerCase().includes(search.toLowerCase());
    });
    // console.log(filtered);
    setCatalogs(filtered);
  };
  const parseDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  useEffect(() => {
    setCatalogs(files);
  }, [files]);
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl pb-4 text-center font-semibold text-white">
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
          <h1 className="text-xl pb-4 text-center font-semibold text-white">
            Catálogos
          </h1>
          <form onSubmit={(e) => handleSearch(e)} className="flex">
            <input
              type="text"
              placeholder="Buscar catálogo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full max-w-lg md:w-[350px] ml-4"
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
        <div className="w-full max-w-xl">
          <Swiper
            spaceBetween={90}
            slidesPerView={2}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            tag="section"
            wrapperTag="ul"
            navigation
            pagination
            className="flex justify-center cursor-grab"
          >
            {/* <div className="swiper flex gap-4 overflow-x-auto max-w-xs md:max-w-lg px-4 py-2"> */}
            {catalogs.map((file) => (
              <SwiperSlide key={file.id}>
                <div
                  key={file.id}
                  className="flex flex-col items-center gap-2 flex-shrink-0 w-40"
                >
                  <h3 className="text-white">{file.title}</h3>
                  <h5 className="text-white">{parseDate(file.pub_date)}</h5>
                  <img
                    src={file.img}
                    alt={file.title}
                    className="w-28 h-40 object-contain"
                  />
                  <div className="flex flex-col gap-2">
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
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {catalogs.length === 0 && (
              <div className="flex flex-col items-center gap-2">
                <h3 className="bg-gray-500 w-20"></h3>
                <div className="bg-gray-500 w-28 h-40"></div>
              </div>
            )}
            {/* </div> */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
