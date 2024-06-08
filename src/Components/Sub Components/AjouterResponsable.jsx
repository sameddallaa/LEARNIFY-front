import AjouterEnseignantAuModule from "./AjouterEnseignantAuModule";

function AjouterResponsable({ idModule }) {
  const endpoint = `http://localhost:8000/api/ ressources/subjects/${idModule}/add_main_teacher `;
  return (
    <>
      <AjouterEnseignantAuModule id_model={"Responsable"} endpoint={endpoint} />
    </>
  );
}

export default AjouterResponsable;
