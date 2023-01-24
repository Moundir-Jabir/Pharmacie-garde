import React from 'react'
import { Link } from "react-router-dom";
import { BiSearch } from "../../../assets/icons";

function PharmacieTable() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold">Liste Pharmacies</h1>
        <div className="flex flex-row gap-2">
          <div className="form-control">
            <div className="input-group ">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered  text-black"
              />
              <button className="btn btn-square border-none bg-color-primary hover:bg-color-secondary ">
                <BiSearch size={24} />
              </button>
            </div>
          </div>
          <Link
            to={"#"}
            className="btn btn-active border-none bg-color-primary hover:bg-color-secondary"
          >
            Ajouter Pharmacie
          </Link>
        </div>
      </div>
      <div className="overflow-auto bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>téléphone</th>
              <th>heures d'ouverture</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1000</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td>test</td>
              <td className="flex flex-row gap-2">
                <Link
                  to={"#"}
                  className="btn btn-ghost btn-xs bg-color-primary text-white"
                >
                  Modifier
                </Link>
                <button
                  className="btn btn-ghost btn-xs bg-red-600 text-white"
                >
                  Suprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PharmacieTable