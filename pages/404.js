import { ContentNotFound, LayoutUnique } from "../components";

export default function FourOhFour() {
  return (
    <LayoutUnique title={"Página no encontrada"}>
      <ContentNotFound />
    </LayoutUnique>
  );
}
