import Head from "next/head";
import React from "react";
import Navbar from "../ui/Navbar";

export const LayoutUnique = ({ title, children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title || "Catálogos y productos"}</title>
        <meta name="author" content="Romel Alexis" />
        <meta
          name="description"
          content={`Información sobre productos ${title}`}
        />
        <meta
          name="keywords"
          content={` ${title}, catálogos, productos de belleza, revista, unique`}
        />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        <meta
          property="og:image"
          content="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
        />
        <link
          rel="icon"
          href="https://media.discordapp.net/attachments/839620709517230081/1021282075497742436/icon-48x48.png"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="https://media.discordapp.net/attachments/839620709517230081/1021945872717717534/spalsh_screen.png?width=951&height=676"
          media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
      </Head>
      {/* Nabvar */}
      <Navbar />
      <main className="min-h-screen h-full">{children}</main>
    </>
  );
};
