export interface Convenio {
  id: string;
  institutionName: string;
  code: string;
  country: string;
  type: string;
  status: string;
  purpose: string;
  program: string;
  imageURL: string;
  siteURL: string;
}

export interface ITab {
  route: string;
  label: string;
  component: React.ReactNode;
}

export interface IUserData {
  uid: string;
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
  rol: string;
  files: IUserFiles;
}

interface ContactoEmergencia {
  nombre: string;
  apellido: string;
  parentezco: string;
  celular: string;
  correo: string;
}

interface IUserFiles {
  fotocopiaIdentificacion?: string;
  fotocopiaPasaporteDatosBiograficos?: string;
  fotografiaDeIdentificacion?: string;
  certificadoDeNotas?: string;
  cartaDePostulacionUniversidadDeOrigen?: string;
  hojaDeVida?: string;
  certificadoDeIdioma?: string;
}

export type IRequestForm = {
  id: string;
  userId: string;
  estado: "pendiente" | "aceptada" | "rechazada";
  fechaCreacion: Timestamp;
  observacionesAdmin?: string;

  direccionResidencia: string;
  ciudadResidencia: string;
  telefonoSecundario?: string;
  discapacidad: boolean;
  programaAcademico: string;
  semestreAcademico: "" | "5" | "6" | "7" | "8" | "9";
  promedioAcomulado: string;
  paisProcendencia: string;
  institucion: string;
  marco: string;
  programaACursar: string;
  nivelEstudio: string;
  posibilidadIntercambio: string;
  anioAcademico: string;
  duracionEnSemestres: string;
  categoriaMovilidad: string;
  contextoMovilidad: string;
  periodoDeseaIniciarIntercambio: string;
  fechaPlaneadaDeLlegada: string;
  certificadoIdiomaEspaniol: boolean;
  nombreCertificadoEspaniol?: string;
  nivelEspaniol?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  financiacionMovilidad:
    | "Apoyo Familiar"
    | "Credito"
    | "Otro"
    | "Recursos propios";
  contactoEmergencia: ContactoEmergencia[];
  userData: IUserData;
  vistoPorEstudiante: boolean;
};
