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