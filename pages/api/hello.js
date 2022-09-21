// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conn from "../../db/conection";
export default async function handler(req, res) {
  const response = await conn.query("SELECT NOW()");
  console.log(response);

  res.status(200).json({
    name: "Catálogos y productos",
    title: "Catálogos",
    time: response.rows[0].now,
    cards: [
      {
        title: "Catálogo Campaña 15 ésika",
        img: "https://media.discordapp.net/attachments/839620709517230081/1021287623962140782/unknown.png?width=517&height=676",
      },
      {
        title: "Catálogo Campaña 15 natura",
        img: "https://media.discordapp.net/attachments/839620709517230081/1021287729612464208/unknown.png?width=495&height=676",
      },
    ],
  });
}
