import React from "react";

function Card({ card }) {
  return (
    <div className="card bg-dark text-white border-0 md:w-72 w-52">
      <div className="">
        <img
          src={card.img}
          className="object-contain h-72 md:h-96 opacity-75 hover:opacity-100 transition-all duration-500 shadow-xl"
          alt="catálogo"
          title={card.title}
        />
      </div>
      <h5 className="text-xl font-semibold overflow-ellipsis overflow-hidden h-20 w-full pb-2">
        {card.title}
      </h5>
      <button
        className="btn w-full flex justify-center gap-1"
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
    </div>
  );
}

export default Card;
