import React from "react";
import { Input, Button } from "../shared/index";
import { Link, useNavigate } from "react-router-dom";

function PharmacieAdd() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold text-color-secondary">Ajouter Pharmacie</h1>
        <Link
          to={"/dashboard/pharmacies"}
          className="btn btn-active border-none hover:bg-color-primary bg-color-secondary "
        >
          Afficher Pharmacies
        </Link>
      </div>
      <div className="overflow-auto flex flex-col items-center bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <div className="w-1/2">
          <form>
            <div>
              <label className="label text-xs font-medium">
                Image de pharmacie
              </label>
              <Input
                type="file"
                name="Name_Immeuble"
                id="Name_Immeuble"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Nom de pharmacie
              </label>
              <Input
                type="text"
                name="Name_Immeuble"
                id="Name_Immeuble"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Adresse</label>
              <Input
                type="text"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Numéro de téléphone
              </label>
              <Input
                type="text"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Heures d'ouverture
              </label>
              <Input
                type="time"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Status de Garde
              </label>
              <select
                name="Statut_Payment"
                id="Statut_Payment"
                className="select w-full block px-4 py-2 rounded-none text-gray-700 placeholder-gray-400 bg-white border border-gray-200 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                 <option disabled selected></option>
                <option>Ouvert actuellement</option>
                <option>Ouvert 24h/24</option>
              </select>
            </div>
            <div className="mt-2 font-main">
              <Button type="submit" text="Submit" textColor={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PharmacieAdd;
