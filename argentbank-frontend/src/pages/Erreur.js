import { Link } from "react-router-dom";

function Erreur() {

  return (
    <div className="error">
      <h1 className="error__message">
        La page que vous demandez n'existe pas.
      </h1>
      <Link to="/" className="error__link">
        Retourner sur la page d’accueil
      </Link>
    </div>
  );
}

export default Erreur;