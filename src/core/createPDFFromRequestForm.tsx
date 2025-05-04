import jsPDF from "jspdf";
import { IRequestForm } from "../types";
import autoTable from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export const createPDFFromRequestForm = (request: IRequestForm) => {
  const user = request.userData;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Reporte de Solicitud de Movilidad", 20, 20);

  doc.setFontSize(14);
  doc.text("Información Personal", 20, 30);
  autoTable(doc, {
    startY: 35,
    theme: "grid",
    body: [
      ["Nombres", user.nombres],
      ["Apellidos", user.apellidos],
      ["Fecha de nacimiento", user.fechaNacimiento],
      ["Lugar de nacimiento", user.lugarNacimiento],
      ["Género", user.genero],
      ["Nacionalidad", user.nacionalidad],
      ["Identificación", user.identificacion],
      ["Pasaporte", user.pasaporte],
      ["Correo personal", user.correoPersonal],
      ["Teléfono", user.telefono],
      ["Rol", user.rol],
    ],
  });

  doc.text("Archivos Cargados", 20, doc.lastAutoTable.finalY + 10);
  const fileKeys = Object.entries(user.files || {}).map(([key, value]) => [
    key,
    value ? "Subido" : "No disponible",
  ]);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Documento", "Estado"]],
    body: fileKeys.length > 0 ? fileKeys : [["Sin archivos", ""]],
  });

  doc.text("Detalles de la Solicitud", 20, doc.lastAutoTable.finalY + 20);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 25,
    body: [
      ["Estado", request.estado],
      [
        "Fecha de creación",
        new Date(request.fechaCreacion.seconds * 1000).toLocaleDateString(),
      ],
      ["Dirección", request.direccionResidencia],
      ["Ciudad", request.ciudadResidencia],
      ["Teléfono secundario", request.telefonoSecundario || "No especificado"],
      ["Discapacidad", request.discapacidad ? "Sí" : "No"],
      ["Programa académico", request.programaAcademico],
      ["Semestre", request.semestreAcademico || "No especificado"],
      ["Promedio acumulado", request.promedioAcomulado],
      ["País de procedencia", request.paisProcendencia],
      ["Institución", request.institucion],
      ["Marco", request.marco],
      ["Programa a cursar", request.programaACursar],
      ["Nivel de estudio", request.nivelEstudio],
      ["Intercambio posible", request.posibilidadIntercambio],
      ["Año académico", request.anioAcademico],
      ["Duración en semestres", request.duracionEnSemestres],
      ["Categoría de movilidad", request.categoriaMovilidad],
      ["Contexto movilidad", request.contextoMovilidad],
      ["Periodo de inicio", request.periodoDeseaIniciarIntercambio],
      ["Fecha planeada de llegada", request.fechaPlaneadaDeLlegada],
      [
        "Certificado de español",
        request.certificadoIdiomaEspaniol
          ? `${request.nombreCertificadoEspaniol || ""} - Nivel ${
              request.nivelEspaniol
            }`
          : "No",
      ],
      ["Financiación", request.financiacionMovilidad],
    ],
  });

  doc.text("Contacto(s) de Emergencia", 20, doc.lastAutoTable.finalY + 10);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Nombre", "Apellido", "Parentesco", "Celular", "Correo"]],
    body:
      request.contactoEmergencia.length > 0
        ? request.contactoEmergencia.map((c) => [
            c.nombre,
            c.apellido,
            c.parentezco,
            c.celular,
            c.correo,
          ])
        : [["-", "-", "-", "-", "-"]],
  });

  if (request.observacionesAdmin) {
    doc.text(
      "Observaciones Administrativas",
      20,
      doc.lastAutoTable.finalY + 10
    );
    doc.setFontSize(12);
    doc.text(request.observacionesAdmin, 20, doc.lastAutoTable.finalY + 20, {
      maxWidth: 170,
    });
  }
  
  doc.save(`Solicitud_${user.nombres}_${user.apellidos}.pdf`);
};
