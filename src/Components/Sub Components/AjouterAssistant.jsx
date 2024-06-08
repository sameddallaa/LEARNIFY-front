import AjouterEnseignantAuModule from "./AjouterEnseignantAuModule";

function AjouterAssistant({ idModule }) {
  const endpoint = `http://localhost:8000/api/ ressources/subjects/${idModule}/add_teacher `;
  return (
    <AjouterEnseignantAuModule
      id_model={"Assistant"}
      endpoint={endpoint}
      idModule={idModule}
    />
  );
}

export default AjouterAssistant;
