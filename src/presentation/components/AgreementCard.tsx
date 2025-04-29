import React from "react";
import type { Convenio } from "../../types";

interface AgreementCardProps {
  agreement: Convenio;
}
// TODO traerse los convenios de la base de datos
const AgreementCard: React.FC<AgreementCardProps> = ({ agreement }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Imagen */}
      <div className="w-full md:w-1/3 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={agreement.imageURL}
          alt={agreement.institutionName}
          className="object-contain max-h-32"
        />
      </div>

      {/* Contenido */}
      <div className="w-full md:w-2/3 p-6 space-y-2 text-gray-800">
        <a
          href={agreement.siteURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-semibold hover:underline text-blue-800"
        >
          {agreement.institutionName}
        </a>
        <p className="text-sm text-orange-600 font-medium">Convenio</p>

        <p>
          <span className="font-semibold">Tipo de convenio:</span>{" "}
          {agreement.type}
        </p>
        <p>
          <span className="font-semibold">Estado:</span> {agreement.status}
        </p>
        <p>
          <span className="font-semibold">Objeto del convenio:</span>{" "}
          {agreement.purpose}
        </p>
        <p>
          <span className="font-semibold">Programa / Área:</span>{" "}
          {agreement.program}
        </p>
      </div>
    </div>
  );
};

export default AgreementCard;
