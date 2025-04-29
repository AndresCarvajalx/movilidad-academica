import React from "react";

import Select from "../Select";
import { RequestStepsProp } from "./RequestStepsProp";
import Input from "../Input";

const PosibilidadAcademica: React.FC<RequestStepsProp> = ({
  form,
  onHandleInput,
}) => {
  const programas = [
    { value: "", label: "Seleccione" },
    { value: "ingenieriaDeSistemas", label: "Ingenieria de sistemas" },
  ];

  const posibilidades = [{ value: "", label: "Seleccione" },{ value: "100", label: "100 %" }];

  const nivelesDeEstudio = [
    { value: "", label: "Seleccione" },
    { value: "undergraduate/bachelor", label: "Undergraduate/Bachelor" },
    { value: "shortCycle", label: "Short Cycle" },
    { value: "postgraduate/master", label: "Postgraduate/Master" },
    { value: "multipleCycles", label: "Multiple Cycles" },
    { value: "doctorate", label: "Doctorate" },
  ];

  if (!onHandleInput) return;
  return (
    <>
      <Select
        options={programas}
        name="programaACursar"
        value={form.programaACursar}
        label="Seleccione programa que quiere cursar"
        onChange={onHandleInput}
      />

      <Select
        options={nivelesDeEstudio}
        name="nivelEstudio"
        value={form.nivelEstudio}
        label="Nivel de estudios"
        onChange={onHandleInput}
      />

      <Select
        options={posibilidades}
        name="posibilidadIntercambio"
        value={form.posibilidadIntercambio}
        label="Posibilidad de intercambio"
        onChange={onHandleInput}
      />

      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <Select
          options={[
            { value: "", label: "Seleccione" },
            { value: "2022", label: "2022" },
            { value: "2023", label: "2023" },
            { value: "2024", label: "2024" },
          ]}
          name="anioAcademico"
          value={form.anioAcademico}
          label="Año Academico"
          onChange={onHandleInput}
        />
        <Select
          options={[
            { value: "", label: "Seleccione" },
            { value: "1", label: "1 semestre" },
            { value: "2", label: "2 semestres" },
            { value: "3", label: "3 semestres" },
            { value: "4", label: "4 semestres" },
          ]}
          name="duracionEnSemestres"
          value={form.duracionEnSemestres}
          label="Duracion en semestres"
          onChange={onHandleInput}
        />
        <Select
          options={[
            { value: "", label: "Seleccione" },
            { value: "curso corto", label: "Curso corto" },
            {
              value: "opcion de trabajo de grado: pasantia internacional",
              label: "Opcion de trabajo de grado: pasantia internacional",
            },
            {
              value: "practica internacional",
              label: "Practica internacional",
            },
            { value: "rotacion medica", label: "Rotacion medica" },
            { value: "semestre academico", label: "Semestre academicos" },
          ]}
          name="categoriaMovilidad"
          value={form.categoriaMovilidad}
          label="Categoria de movilidad"
          onChange={onHandleInput}
        />
        <Select
          options={[
            { value: "", label: "Seleccione" },
            { value: "internacional", label: "Internacional" },
            { value: "nacional", label: "Nacional" },
          ]}
          name="contextoMovilidad"
          value={form.contextoMovilidad}
          label="Contexto de movilidad"
          onChange={onHandleInput}
        />
        <Select
          options={[
            { value: "", label: "Seleccione" },
            { value: "otro", label: "Otro" },
            { value: "semestre A", label: "Semestre A - Febrero/Junio" },
            { value: "semestre B", label: "Semestre B - Agosto/Diciembre" },
          ]}
          name="periodoDeseaIniciarIntercambio"
          value={form.periodoDeseaIniciarIntercambio}
          label="Periodo academico en el que desea iniciar"
          onChange={onHandleInput}
        />
        <Input
          type="date"
          name="fechaPlaneadaDeLlegada"
          value={form.fechaPlaneadaDeLlegada}
          label="Fecha planeada de llegada"
          onChange={onHandleInput}
          min="2025-01-01"
          max="2027-12-31"
        />
      </div>
    </>
  );
};

export default PosibilidadAcademica;
