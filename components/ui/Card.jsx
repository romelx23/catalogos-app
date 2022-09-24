import React from "react";

function Card({ card }) {
  const shareCatalog = async () => {
    if (navigator.share) {
      await navigator.share({
        title: card.title,
        text: "Catalogo de productos",
        url: card.url,
      });
    } else {
      console.log("no se puede compartir");
    }
  };
  return (
    <div className="card">
      <div className="w-full">
        <img
          src={card.img}
          className="object-cover object-center block m-auto h-72 md:h-96 transition-all duration-500 shadow-xl rounded-lg"
          alt="catálogo"
          title={card.title}
        />
      </div>
      <div className="flex flex-col items-center">
        <h5 className="text-center pt-2 text-xl capitalize font-semibold overflow-ellipsis overflow-hidden w-full pb-2">
          {card.title}
        </h5>
        <h4 className="font-semibold pb-2">{card.pub_date}</h4>
      </div>
      <div className="">
        <button
          className="btn__catalog w-full flex justify-center gap-1"
          onClick={() => {
            window.open(card.url_download, "_blank");
          }}
        >
          Ver catálogo
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
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </button>
        <button
          className="btn__catalog w-full flex justify-center items-center gap-1 mt-2"
          onClick={shareCatalog}
        >
          Compartir catálogo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.0}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;
