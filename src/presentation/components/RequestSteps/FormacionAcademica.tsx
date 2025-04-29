import React from "react";

import { RequestStepsProp } from "./RequestStepsProp";
import Input from "../Input";
import Select from "../Select";

const FormacionAcademica: React.FC<RequestStepsProp> = ({
  form: requestForm,
  onHandleInput: handleInputChange,
}) => {
  if(!handleInputChange) return;
  return (
    <>
      <Input
        label="Programa Academico/Estudios"
        name="programaAcademico"
        value={requestForm.programaAcademico}
        onChange={handleInputChange}
      />

      <Select
        options={[
          { value: "", label: "Seleccione" },
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
        ]}
        label="Semestre Academico"
        name="semestreAcademico"
        value={requestForm.semestreAcademico}
        onChange={handleInputChange}
      />

      <Input
        label="Promedio academico acomulado"
        name="promedioAcomulado"
        value={requestForm.promedioAcomulado}
        onChange={handleInputChange}
      />

      {
        // TODO HACER QUE SE TRAIGAN LOS CONVENIOS DESDE EL FIRESTORE
      }
      <Select
        options={[
          { value: "", label: "Seleccione" },
          { value: "argentina", label: "Argentina" },
          { value: "brasil", label: "Brasil" },
          { value: "chile", label: "Chile" },
          { value: "colombia", label: "Colombia" },
        ]}
        label="Pais de procedencia"
        name="paisProcendencia"
        value={requestForm.paisProcendencia}
        onChange={handleInputChange}
      />

      <Input
        label="Institucion"
        name="institucion"
        value={requestForm.institucion}
        onChange={handleInputChange}
      />
      <Input
        label="Marco"
        name="marco"
        value={requestForm.marco}
        onChange={handleInputChange}
      />
    </>
  );
};

export default FormacionAcademica;
