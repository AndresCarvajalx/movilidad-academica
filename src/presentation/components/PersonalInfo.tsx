import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

import { useAuth } from "../../auth/AuthProvider";
import { countries } from "../../data/Countries";
import { useUser } from "../../domain/UserInfoProvider";

type PersonalForm = {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  genero: string;
  nacionalidad: string;
  identificacion: string;
  pasaporte: string;
  correoPersonal: string;
  telefono: string;
};

const PersonalInfo: React.FC = () => {
  const [form, setForm] = useState<PersonalForm>({
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    genero: "",
    nacionalidad: "",
    identificacion: "",
    pasaporte: "",
    correoPersonal: "",
    telefono: "",
  });

  const { user } = useAuth();
  const { userData } = useUser();
  const { updateUserData } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (userData) {
      setForm(userData);
    }
  }, [userData]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const genders = [
    { value: "", label: "Selecciona una opcion" },
    { value: "femenino", label: "Femenino" },
    { value: "masculino", label: "Masculino" },
    { value: "no_aplica", label: "No Aplica" },
    { value: "no_binario", label: "No Binario" },
    { value: "otro", label: "Otro" },
    { value: "prefiero_no_especificar", label: "Prefiero no especificar" },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateUserData(form).then(() => {
      alert("Datos actualizados correctamente");
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Información Personal</h2>
      <p className="text-gray-600">
        Revisa y actualiza tu información personal. Esta sección ha sido
        diseñada para facilitar y agilizar el proceso al momento de realizar tu
        solicitud académica
      </p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            name="nombres"
            value={form.nombres}
            onChange={handleInputChange}
            label="Nombre(s)"
            placeholder="Nombre(s)"
            required
          />

          <Input
            name="apellidos"
            value={form.apellidos}
            onChange={handleInputChange}
            label="Apellido(s)"
            placeholder="Apellido(s)"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleInputChange}
              label="Fecha de nacimiento"
              placeholder="Fecha de nacimiento"
              type="date"
              required
            />

            <Input
              name="lugarNacimiento"
              value={form.lugarNacimiento}
              onChange={handleInputChange}
              label="Lugar de nacimiento"
              placeholder="Lugar de nacimiento"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Genero"
              options={genders}
              value={form.genero}
              name="genero"
              onChange={handleSelectChange}
            />

            <Select
              label="Nacionalidad"
              options={countries}
              value={form.nacionalidad}
              name="nacionalidad"
              onChange={handleSelectChange}
            />
          </div>

          <Input
            name="identificacion"
            value={form.identificacion}
            onChange={handleInputChange}
            label="Documento de identificacion"
            placeholder="Documento de identificacion"
            type="number"
            required
          />

          <Input
            name="pasaporte"
            value={form.pasaporte}
            onChange={handleInputChange}
            label="Numero de Pasaporte"
            placeholder="Numero de Pasaporte"
            type="number"
            required
          />

          <Input
            name="correoInstitucional"
            value={user!.email!}
            onChange={() => {}}
            label="Correo Institucional"
            placeholder={user!.email!}
            type="email"
            disabled
          />

          <Input
            name="correoPersonal"
            value={form.correoPersonal}
            onChange={handleInputChange}
            label="Correo Personal (opcional)"
            placeholder="Correo Personal"
            type="email"
          />

          <Input
            name="telefono"
            value={form.telefono}
            onChange={handleInputChange}
            label="Telefono movil"
            placeholder="Telefono movil"
            type="number"
            required
          />

          <Button
            className="w-full"
            onClick={() => console.log(form.genero)}
            type="submit"
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
