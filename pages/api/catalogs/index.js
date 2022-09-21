import conn from "../../../db/conection";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const catalogs = await conn.query("SELECT * FROM catalogs");
      res.status(200).json({
        catalogs: catalogs.rows,
      });
      break;
    case "POST":
      const { title, pub_date, img, url_download } = req.body;
      const query =
        "INSERT INTO catalogs (title, pub_date, img, url_download) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [title, pub_date, img, url_download];
      const response = await conn.query(query, values);
      console.log(response.rows[0], "response post");
      res.status(201).json(response.rows[0]);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}
