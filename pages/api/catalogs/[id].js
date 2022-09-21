import conn from "../../../db/conection";
export default async (req, res) => {
  const { method, body } = req;
  const { id } = req.query;
  switch (method) {
    case "GET":
      try {
        const catalogs = await conn.query(
          "SELECT * FROM catalogs WHERE id = $1",
          [id]
        );
        if (catalogs.rows.length === 0) {
          return res
            .status(404)
            .json({ message: `Catalogo con el id ${id} no encontrado` });
        }
        res.status(200).json({
          catalogs: catalogs.rows,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { title, pub_date, img, url_download } = body;
        const query =
          "UPDATE catalogs SET title = $1, pub_date = $2, img = $3, url_download = $4 WHERE id = $5 RETURNING *";
        const values = [title, pub_date, img, url_download, id];
        const response = await conn.query(query, values);
        if (response.rows.length === 0) {
          return res
            .status(404)
            .json({ message: `Catalogo con el id ${id} no encontrado` });
        }
        console.log(response.rows[0], "response put");
        res.status(201).json(response.rows[0]);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const queryDelete = "DELETE FROM catalogs WHERE id = $1 RETURNING *";
        const responseDelete = await conn.query(queryDelete, [id]);
        console.log(responseDelete.rows[0], "response delete");
        if (responseDelete.rows.length === 0) {
          return res
            .status(404)
            .json({ message: `Catalogo con el id ${id} no encontrado` });
        }
        res.status(201).json(responseDelete.rows[0]);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
