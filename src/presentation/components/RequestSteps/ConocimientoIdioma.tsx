import React from "react";

import RadioYesOrNo from "../RadioYesOrNo";
import Input from "../Input";
import Select from "../Select";
import { RequestStepsProp } from "./RequestStepsProp";

const ConocimientoIdioma: React.FC<RequestStepsProp> = ({
  form,
  onHandleInput,
}) => {
  if (!onHandleInput) return;
  return (
    <>
      <RadioYesOrNo
        label="Tiene certificado para el idioma español?"
        value={form.certificadoIdiomaEspaniol}
        name="certificadoIdiomaEspaniol"
        onChange={onHandleInput}
        required
      />
      {form.certificadoIdiomaEspaniol ? (
        <>
          <Input
            label="Nombre del certificado"
            name="nombreCertificadoEspaniol"
            value={form.nombreCertificadoEspaniol || ""}
            onChange={onHandleInput}
            required
          />
          <Select
            label="Nivel de español"
            name="nivelEspaniol"
            value={form.nivelEspaniol || ""}
            onChange={onHandleInput}
            options={[
              { value: "", label: "Seleccione" },
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" },
              { value: "B1", label: "B1" },
              { value: "B2", label: "B2" },
              { value: "C1", label: "C1" },
              { value: "C2", label: "C2" },
            ]}
          />
        </>
      ) : (
        <div>No se requiere certificado</div>
      )}
    </>
  );
};

export default ConocimientoIdioma;
