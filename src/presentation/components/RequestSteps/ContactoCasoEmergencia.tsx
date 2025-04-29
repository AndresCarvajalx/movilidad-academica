import React from "react";

import Input from "../Input";
import { RequestStepsProp } from "./RequestStepsProp";

const ContactoCasoEmergencia: React.FC<RequestStepsProp> = ({
  form: requestForm,
  onHandleIndexedInput: handleContactoEmergenciaChange,
  onAddContactoEmergencia
}) => {
  if (!handleContactoEmergenciaChange) return;
  return (
    <>
      <h2 className="text-2xl font-semibold">
        Contactos en casos de emergencia(maximo 2)
      </h2>

      {requestForm.contactoEmergencia.map((contacto, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-4"
        >
          <Input
            label="Nombre"
            name="nombre"
            value={contacto.nombre}
            onChange={(e) => handleContactoEmergenciaChange(e, index)}
            required
          />
          <Input
            label="Apellido"
            name="apellido"
            value={contacto.apellido}
            onChange={(e) => handleContactoEmergenciaChange(e, index)}
            required
          />
          <Input
            label="Parentezco"
            name="parentezco"
            value={contacto.parentezco}
            onChange={(e) => handleContactoEmergenciaChange(e, index)}
            required
          />
          <Input
            label="Celular"
            name="celular"
            value={contacto.celular}
            onChange={(e) => handleContactoEmergenciaChange(e, index)}
            required
          />
          <Input
            label="Correo"
            name="correo"
            value={contacto.correo}
            onChange={(e) => handleContactoEmergenciaChange(e, index)}
            required
          />
        </div>
      ))}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (
            requestForm.contactoEmergencia.length >= 2 ||
            !onAddContactoEmergencia
          )
            return;
          onAddContactoEmergencia();
        }}
        className={`text-sm ${
          requestForm.contactoEmergencia.length >= 2
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-600 hover:text-blue-800 cursor-pointer underline"
        }`}
      >
        {requestForm.contactoEmergencia.length >= 2
          ? "Máximo 2 contactos"
          : "+ Agregar otro contacto de emergencia"}
      </a>
    </>
  );
};

export default ContactoCasoEmergencia;
