import React from "react";
import { RequestStepsProp } from "./RequestStepsProp";
import Input from "../Input";
import RadioYesOrNo from "../RadioYesOrNo";

const InformacionPersonal: React.FC<RequestStepsProp> = ({
  form,
  onHandleInput: handleInputChange,
}) => {
  if(!handleInputChange) return;
  return (
    <>
      <Input
        label="Direccion de residencia"
        name="direccionResidencia"
        value={form.direccionResidencia}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Ciudad de residencia"
        name="ciudadResidencia"
        value={form.ciudadResidencia}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Telefono secundario (opcional)"
        name="telefonoSecundario"
        value={form.telefonoSecundario}
        onChange={handleInputChange}
      />
      <RadioYesOrNo
        label="¿Tiene alguna discapacidad?"
        value={form.discapacidad}
        name="discapacidad"
        onChange={handleInputChange}
        required
      />
    </>
  );
};

export default InformacionPersonal;