import { baseUrl } from "./config";

export const getCatalogs = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/catalog`);
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error("Error al cargar los catalogos");
  }
};
