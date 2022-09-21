import React from "react";
import Link from "next/link";

export const ContentNotFound = () => {
  return (
    <div className="w-full flex flex-col gap-10 items-center text-white mt-10 md:mt-20">
      <h1>404 - Página no encontrada</h1>
      <Link href="/">
        <a className="btn flex">
          Go back home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.0}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
      </Link>
    </div>
  );
};
