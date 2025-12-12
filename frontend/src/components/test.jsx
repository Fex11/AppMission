import React from "react";

export default function Test() {
  const handleSubmit = (e) => {
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card border-0 shadow-sm p-4">
        <h3 className="text-center mb-4 text-dark">Ajouter un nouveau livre</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="titre"
              placeholder="Titre"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="auteur"
              placeholder="Auteur"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-primary w-100">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
