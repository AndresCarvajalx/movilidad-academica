import React, { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { FaEye } from "react-icons/fa";

import { Timestamp } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { getUserRequests } from "../core/getUserRequest";
import { useUser } from "../core/UserInfoProvider";
import { ContactoEmergencia, IRequestForm } from "../types";
import Button from "./components/Button";
import ConocimientoIdioma from "./components/RequestSteps/ConocimientoIdioma";
import ContactoCasoEmergencia from "./components/RequestSteps/ContactoCasoEmergencia";
import FormacionAcademica from "./components/RequestSteps/FormacionAcademica";
import InformacionPersonal from "./components/RequestSteps/InformacionPersonal";
import PosibilidadAcademica from "./components/RequestSteps/PosibilidadAcademica";
import createRequest from "../core/createRequest";

interface RequestStepsProp {
  setIsCreatingRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestForm: React.FC<RequestStepsProp> = ({ setIsCreatingRequest }) => {
  const { userData } = useUser();
  const { user: auth } = useAuth();
  const [requestForm, setRequestForm] = useState<IRequestForm>({
    id: "noId",
    userId: auth!.uid!,
    fechaCreacion: Timestamp.now(),
    estado: "pendiente",
    direccionResidencia: "",
    ciudadResidencia: "",
    telefonoSecundario: undefined,
    discapacidad: false,
    programaAcademico: "",
    semestreAcademico: "",
    promedioAcomulado: "",
    paisProcendencia: "",
    institucion: "",
    marco: "",
    programaACursar: "",
    nivelEstudio: "",
    posibilidadIntercambio: "",
    anioAcademico: "",
    duracionEnSemestres: "",
    categoriaMovilidad: "",
    contextoMovilidad: "",
    periodoDeseaIniciarIntercambio: "",
    fechaPlaneadaDeLlegada: "",
    certificadoIdiomaEspaniol: false,
    nombreCertificadoEspaniol: undefined,
    nivelEspaniol: undefined,
    financiacionMovilidad: "Recursos propios",
    contactoEmergencia: [
      {
        nombre: "",
        apellido: "",
        parentezco: "",
        celular: "",
        correo: "",
      },
    ],
    userData: userData!,
    vistoPorEstudiante: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      value === "true" ? true : value === "false" ? false : value;
    setRequestForm((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleContactoEmergenciaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setRequestForm((prev) => {
      const updatedContactos = [...prev.contactoEmergencia];
      updatedContactos[index] = {
        ...updatedContactos[index],
        [name]: value,
      };

      return { ...prev, contactoEmergencia: updatedContactos };
    });
  };

  const addContactoDeEmergencia = () => {
    setRequestForm((prev) => ({
      ...prev,
      contactoEmergencia: [
        ...prev.contactoEmergencia,
        {
          nombre: "",
          apellido: "",
          parentezco: "",
          celular: "",
          correo: "",
        },
      ],
    }));
  };

  const steps = [
    <InformacionPersonal
      form={requestForm}
      onHandleInput={handleInputChange}
    />,
    <FormacionAcademica form={requestForm} onHandleInput={handleInputChange} />,
    <ContactoCasoEmergencia
      form={requestForm}
      onHandleIndexedInput={handleContactoEmergenciaChange}
      onAddContactoEmergencia={addContactoDeEmergencia}
    />,
    <PosibilidadAcademica
      form={requestForm}
      onHandleInput={handleInputChange}
    />,
    <ConocimientoIdioma form={requestForm} onHandleInput={handleInputChange} />,
  ];

  if (!userData) return;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    for (const key in requestForm) {
      if (Object.prototype.hasOwnProperty.call(requestForm, key)) {
        if (key === "contactoEmergencia") {
          for (const contacto of requestForm.contactoEmergencia) {
            for (const contactoKey in contacto) {
              if (Object.prototype.hasOwnProperty.call(contacto, contactoKey)) {
                const value = contacto[contactoKey as keyof ContactoEmergencia];
                if (value === "") {
                  alert(
                    `Por favor complete en Contacto de Emergencia el campo: ${contactoKey}`
                  );
                  return;
                }
              }
            }
          }
        }
        if (key === "certificadoIdiomaEspaniol") {
          const value = requestForm[key as keyof IRequestForm];
          if (value === true) {
            if (
              requestForm.nivelEspaniol === undefined ||
              requestForm.nombreCertificadoEspaniol === undefined ||
              requestForm.nombreCertificadoEspaniol === ""
            ) {
              alert(
                `Por favor complete en Conocimiendo del idioma el campo: ${key}`
              );
              return;
            }
          }
        }
        const value = requestForm[key as keyof IRequestForm];
        if (value === "") {
          alert(`Por favor complete el campo: ${key}`);
          return;
        }
      }
    }
    console.log("Formulario enviado:", requestForm);
    const cleanedObj: any = {};
    Object.keys(requestForm).forEach((key) => {
      const value = requestForm[key as keyof IRequestForm];
      if (value !== undefined) {
        cleanedObj[key] = value;
      }
    });
    createRequest(cleanedObj)
      .then(() => {
        alert("Solicitud enviada correctamente");
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        alert("Error al enviar la solicitud. Por favor, inténtelo de nuevo.");
      })
      .finally(() => {
        setSubmitting(false);
        setIsCreatingRequest(false);
      });
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="Datos de Contacto" />
        <Step label="Formacion Academica" />
        <Step label="Contacto en caso de emergencia" />
        <Step label="Posibilidad Movilidad" />
        <Step label="Conocimiento del idioma" />
      </Stepper>
      <form className="space-y-4">{steps[activeStep]} </form>

      <div className="flex justify-between mt-4">
        {activeStep > 0 && <Button onClick={prevStep}>Anterior</Button>}
        {activeStep < steps.length - 1 ? (
          <Button onClick={nextStep}>Siguiente</Button>
        ) : (
          <Button type="submit" onClick={handleSubmit} disabled={submitting}>
            Enviar Solicitud
          </Button>
        )}
      </div>
    </div>
  );
};

type RequestCardProps = {
  request: IRequestForm;
};

const estadoColors = {
  aceptada: "text-white  bg-green-500",
  pendiente: "text-black border border-gray-300",
  rechazada: "text-white bg-red-500",
};

const estadoText = {
  aceptada: "Aprobada",
  pendiente: "En Revisión",
  rechazada: "Rechazada",
};

const RequestCard = ({ request }: RequestCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{request.institucion}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Programa:</span>{" "}
            {request.programaACursar}
          </p>
          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
            📅 Fecha de solicitud:{" "}
            {new Date(
              request.fechaCreacion.seconds * 1000
            ).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            estadoColors[request.estado]
          }`}
        >
          {estadoText[request.estado]}
        </span>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition"
        >
          <FaEye size={16} />
          {open ? "Ocultar Detalles" : "Ver Detalles"}
        </button>

        {open && (
          <div className="mt-4 space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">Dirección:</span>{" "}
              {request.direccionResidencia}
            </p>
            <p>
              <span className="font-semibold">Ciudad:</span>{" "}
              {request.ciudadResidencia}
            </p>
            {request.telefonoSecundario && (
              <p>
                <span className="font-semibold">Teléfono secundario:</span>{" "}
                {request.telefonoSecundario}
              </p>
            )}
            <p>
              <span className="font-semibold">Programa Académico:</span>{" "}
              {request.programaAcademico}
            </p>
            <p>
              <span className="font-semibold">Promedio Acumulado:</span>{" "}
              {request.promedioAcomulado}
            </p>
            <p>
              <span className="font-semibold">Financiación:</span>{" "}
              {request.financiacionMovilidad}
            </p>
            <p>
              <span className="font-semibold">Nivel de Español:</span>{" "}
              {request.certificadoIdiomaEspaniol
                ? request.nivelEspaniol
                : "No requiere"}
            </p>
            <p>
              <span className="font-semibold">Contacto de Emergencia:</span>{" "}
              {request.contactoEmergencia[0]?.nombre} (
              {request.contactoEmergencia[0]?.parentezco})
            </p>
            {request.observacionesAdmin && (
              <p className="text-red-500">
                <span className="font-semibold">Observaciones Admin:</span>{" "}
                {request.observacionesAdmin}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Requests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<IRequestForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getUserRequests(user.uid).then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="p-8">Cargando historial...</div>;

  return (
    <div className="p-8">
      {requests.length === 0 ? (
        <p>No tienes solicitudes aún.</p>
      ) : (
        requests.map((request) => (
          <RequestCard
            key={request.userId + request.fechaCreacion.seconds}
            request={request}
          />
        ))
      )}
    </div>
  );
};

const Solicitudes: React.FC = () => {
  const [isCreatingRequest, setIsCreatingRequest] = React.useState(false);

  const handleIsCreatingRequest = () => {
    setIsCreatingRequest(!isCreatingRequest);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 p-6 spaced-6">
        <h2 className="font-bold text-3xl">
          {isCreatingRequest ? "Nueva Solicitud" : "Mis Solicitudes"}
        </h2>
        <Button
          onClick={handleIsCreatingRequest}
          className="bg-yellow-50 border border-yellow-600 text-yellow-700 hover:bg-yellow-100"
        >
          {isCreatingRequest ? "Cancelar" : "Nueva Solicitud"}
        </Button>
      </div>
      <div className=" mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          {isCreatingRequest ? (
            <RequestForm setIsCreatingRequest={setIsCreatingRequest} />
          ) : (
            <Requests />
          )}
        </div>
      </div>
    </>
  );
};

export default Solicitudes;
