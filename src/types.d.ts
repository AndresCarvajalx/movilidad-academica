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
} 