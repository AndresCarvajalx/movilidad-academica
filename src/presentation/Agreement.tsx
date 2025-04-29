import React from "react";

import AgreementCard from "./components/AgreementCard.tsx";
import type { Convenio } from "../types";

// TODO GET ALL CONVENIOS FROM FIREBASE, alsto add a option to add and modify the convenios
const conveniosList: Convenio[] = [
  {
    id: "1",
    institutionName: "IES Celso Alejandro Jaque 9-018",
    code: "1213",
    country: "Argentina",
    type: "Convenio Marco de Cooperación",
    status: "Vigente",
    purpose:
      "Semestre académico, investigaciones cortas, pasantías, modalidad de grado, misiones académicas y posgrados.",
    program:
      "Ingeniería en energías, Ingeniería de Sistemas, Administración de Empresas.",
    imageURL: "https://www.unitropico.edu.co/images/lanus.png",
    siteURL: "https://ies9018malargue.edu.ar/",
  },
  {
    id: "2",
    institutionName: "Universidad Nacional de Lanús",
    code: "1213",
    country: "Argentina",
    type: "Convenio Marco de Cooperación",
    status: "Vigente",
    purpose:
      "Semestre académico, investigaciones cortas, pasantías, modalidad de grado, misiones académicas y posgrados.",
    program:
      "Ingeniería en energías, Ingeniería de Sistemas, Administración de Empresas.",
    imageURL: "https://www.unitropico.edu.co/images/quilmes.png",
    siteURL: "https://ies9018malargue.edu.ar/",
  },
  {
    id: "3",
    institutionName: "Universidad Nacional de Quilmes",
    code: "1213",
    country: "Argentina",
    type: "Convenio Marco de Cooperación",
    status: "Vigente",
    purpose:
      "Semestre académico, investigaciones cortas, pasantías, modalidad de grado, misiones académicas y posgrados.",
    program:
      "Ingeniería en energías, Ingeniería de Sistemas, Administración de Empresas.",
    imageURL: "https://www.unitropico.edu.co/images/IES.png",
    siteURL: "https://ies9018malargue.edu.ar/",
  },
];

const Agreement: React.FC = () => {
  return (
    <div>
      {conveniosList.map((convenio: Convenio) => (
        <div className="p-1" key={convenio.id}>
          <AgreementCard agreement={convenio} />
        </div>
      ))}
    </div>
  );
};

export default Agreement;
