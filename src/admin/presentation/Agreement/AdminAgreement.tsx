import React, { useEffect, useState } from "react";
import fetchAllRequests from "../../../core/fetchAllRequests";
import { IRequestForm } from "../../../types";
import updateRequestState from "../../../core/updateRequestState";

const AdminAgreement: React.FC = () => {
  const [requests, setRequests] = useState<IRequestForm[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<IRequestForm | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<
    "pendiente" | "aceptada" | "rechazada" | ""
  >("");
  const [observations, setObservations] = useState<string>("");

  useEffect(() => {
    async function loadRequests() {
      const requestsData = await fetchAllRequests();
      setRequests(requestsData);
      setLoading(false);
    }
    loadRequests();
  }, []);

  const handleRequestClick = (request: IRequestForm) => {
    if (selectedRequest?.id === request.id) {
      setSelectedRequest(null);
      setState("");
      setObservations("");
    } else {
      setSelectedRequest(request);
      setState(request.estado);
      setObservations(request.observacionesAdmin || "");
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value as "pendiente" | "aceptada" | "rechazada");
  };

  const handleObservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObservations(e.target.value);
  };

  const handleSave = async () => {
    if (selectedRequest) {
      if (state) {
        updateRequestState(selectedRequest.id, state, observations).then(() => {
          alert("Estado actualizado correctamente");
        });
      } else {
        console.error("Invalid state value");
      }
      const updatedRequest: IRequestForm = {
        ...selectedRequest,
        estado: state as "pendiente" | "aceptada" | "rechazada",
        observacionesAdmin: observations,
      };
      setSelectedRequest(updatedRequest);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Gestión de Solicitudes
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando solicitudes...</p>
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Solicitudes</h2>
          <ul className="space-y-4">
            {requests.map((request) => (
              <li
                key={request.userId + request.fechaCreacion.seconds}
                onClick={() => handleRequestClick(request)}
                className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition duration-300"
              >
                <p>
                  <strong>
                    {request.userData.nombres} {request.userData.apellidos}
                  </strong>
                </p>
                <p>{request.userData.correoPersonal}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRequest && (
        <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Detalles de la Solicitud
          </h2>

          {/* Información General */}
          <section className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Datos del Usuario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p>
                <strong>Nombre:</strong> {selectedRequest.userData.nombres}{" "}
                {selectedRequest.userData.apellidos}
              </p>
              <p>
                <strong>Correo Personal:</strong>{" "}
                {selectedRequest.userData.correoPersonal}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {selectedRequest.userData.fechaNacimiento}
              </p>
              <p>
                <strong>Lugar de Nacimiento:</strong>{" "}
                {selectedRequest.userData.lugarNacimiento}
              </p>
              <p>
                <strong>Género:</strong> {selectedRequest.userData.genero}
              </p>
              <p>
                <strong>Nacionalidad:</strong>{" "}
                {selectedRequest.userData.nacionalidad}
              </p>
              <p>
                <strong>Identificación:</strong>{" "}
                {selectedRequest.userData.identificacion}
              </p>
              <p>
                <strong>Pasaporte:</strong> {selectedRequest.userData.pasaporte}
              </p>
            </div>
          </section>

          {/* Archivos Adjuntos */}
          <section className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Archivos Adjuntos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              {Object.entries(selectedRequest.userData.files).map(
                ([fileName, fileURL]) => (
                  <div key={fileName}>
                    <strong>{fileName}:</strong>{" "}
                    <a
                      href={fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Ver archivo
                    </a>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Datos de la Solicitud */}
          <section className="space-y-2">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Datos de la Solicitud
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <p>
                <strong>ID de Solicitud:</strong> {selectedRequest.id}
              </p>
              <p>
                <strong>Estado:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-white ${
                    selectedRequest.estado === "pendiente"
                      ? "bg-yellow-500"
                      : selectedRequest.estado === "aceptada"
                      ? "bg-green-600"
                      : "bg-red-500"
                  }`}
                >
                  {selectedRequest.estado.toUpperCase()}
                </span>
              </p>
              <p>
                <strong>Fecha de Creación:</strong>{" "}
                {new Date(
                  selectedRequest.fechaCreacion.seconds * 1000
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Observaciones Administrativas:</strong>{" "}
                {selectedRequest.observacionesAdmin || "Sin observaciones"}
              </p>
            </div>
          </section>

          {/* Formulario de cambio de estado */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Gestionar Estado
            </h3>

            <div>
              <label className="block font-medium mb-1 text-gray-600">
                Cambiar Estado
              </label>
              <select
                value={state}
                onChange={handleStateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aceptada">Aceptada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">
                Observación Administrativa
              </label>
              <input
                type="text"
                value={observations}
                onChange={handleObservationChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingrese una observación..."
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Guardar Cambios
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminAgreement;
