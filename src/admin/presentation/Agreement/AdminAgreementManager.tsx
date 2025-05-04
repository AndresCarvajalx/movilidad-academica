import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Convenio } from "../../../types";
import { db } from "../../../api/firebase";
import Button from "../../../presentation/components/Button";

// TODO validar si los campos estan llenos antes de guardar
const AdminAgreementManager: React.FC = () => {
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [selected, setSelected] = useState<Convenio | null>(null);

  const [form, setForm] = useState<Omit<Convenio, "id">>({
    institutionName: "",
    code: "",
    country: "",
    type: "",
    status: "",
    purpose: "",
    program: "",
    imageURL: "",
    siteURL: "",
  });

  const fetchConvenios = async () => {
    const snapshot = await getDocs(collection(db, "convenios"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Convenio[];
    setConvenios(data);
  };

  useEffect(() => {
    fetchConvenios();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveConvenio = async () => {
    if (!validateInputForm(form)) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (selected) {
      const ref = doc(db, "convenios", selected.id);
      await updateDoc(ref, form);
    } else {
      await addDoc(collection(db, "convenios"), form);
    }
    setForm({
      institutionName: "",
      code: "",
      country: "",
      type: "",
      status: "",
      purpose: "",
      program: "",
      imageURL: "",
      siteURL: "",
    });
    setSelected(null);
    fetchConvenios();
  };

  const validateInputForm = (form: Omit<Convenio, "id">) => {
    const { institutionName, code, country, type, status, purpose, program, imageURL, siteURL } = form;
    return (
      institutionName.trim() !== "" &&
      code.trim() !== "" &&
      country.trim() !== "" &&
      type.trim() !== "" &&
      status.trim() !== "" &&
      purpose.trim() !== "" &&
      program.trim() !== "" &&
      imageURL.trim() !== "" &&
      siteURL.trim() !== ""
    );
  }
     

  const deleteConvenio = async (id: string) => {
    await deleteDoc(doc(db, "convenios", id));
    fetchConvenios();
  };

  const startEdit = (convenio: Convenio) => {
    setSelected(convenio);
    setForm({ ...convenio });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Gestión de Convenios</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block capitalize mb-1 text-sm font-semibold">
              {key}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleInput}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <Button
          onClick={saveConvenio}
        >
          {selected ? "Actualizar" : "Agregar"} Convenio
        </Button>
        {selected && (
          <button
            onClick={() => {
              setSelected(null);
              setForm({
                institutionName: "",
                code: "",
                country: "",
                type: "",
                status: "",
                purpose: "",
                program: "",
                imageURL: "",
                siteURL: "",
              });
            }}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {convenios.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg p-4 shadow bg-white relative"
          >
            <img src={c.imageURL} alt={c.institutionName} className="h-24 object-contain mb-3" />
            <h3 className="text-lg font-semibold">{c.institutionName}</h3>
            <p className="text-sm text-gray-600 mb-2">{c.country}</p>
            <p className="text-xs text-gray-500 italic mb-3">{c.program}</p>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(c)}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => deleteConvenio(c.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAgreementManager;
