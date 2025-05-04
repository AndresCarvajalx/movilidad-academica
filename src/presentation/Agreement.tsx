import React, { useEffect, useState } from "react";
import AgreementCard from "./components/AgreementCard";
import { Convenio } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebase.ts";

const Agreement: React.FC = () => {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCountry, setActiveCountry] = useState<string>("Todos");

  const fetchConvenios = async () => {
    try {
      const snapshot = await getDocs(collection(db, "convenios"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Convenio[];
      setConvenios(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener convenios:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  const uniqueCountries = ["Todos", ...Array.from(new Set(convenios.map(c => c.country)))];

  const filteredConvenios = activeCountry === "Todos"
    ? convenios
    : convenios.filter(c => c.country === activeCountry);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Convenios Disponibles
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {uniqueCountries.map((country) => (
          <button
            key={country}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              activeCountry === country
                ? "bg-(--gold-color) text-white border-(--gold-color)"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActiveCountry(country)}
          >
            {country}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando convenios...</p>
      ) : filteredConvenios.length === 0 ? (
        <p className="text-center text-gray-600">No hay convenios disponibles.</p>
      ) : (
        <div className="space-y-4">
          {filteredConvenios.map((convenio) => (
            <AgreementCard key={convenio.id} agreement={convenio} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Agreement;
