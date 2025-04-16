import React from "react";
import FileUpload from "./FileUpload";

const ArchivosAdjuntos: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Archivos Adjuntos</h2>
      <FileUpload
        label="Fotocopia documento de identidad (150%)"
        accept="application/pdf"
        fileTypeLabel="pdf"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="Fotocopia pasaporte datos biográficos"
        accept="application/pdf"
        fileTypeLabel="pdf"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="Fotocopia pasaporte datos biográficos"
        accept="application/pdf"
        fileTypeLabel="pdf"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="Fotografía de identificación"
        accept="image/*"
        fileTypeLabel="imagen"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="Expediente académico/ certificado de notas"
        accept="application/pdf"
        fileTypeLabel="pdf"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="Carta de postulación Universidad de Origen"
        accept="application/pdf"
        fileTypeLabel="pdf"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="Hoja de vida (sin soportes)"
        accept="application/pdf"
        fileTypeLabel="pdf"
        required={true}
        onFileSelect={() => {}}
      />
      <FileUpload
        label="El certificado de idioma español (si es aplicable)"
        accept="application/pdf"
        fileTypeLabel="pdf"
        onFileSelect={() => {}}
      />
    </div>
  );
};

export default ArchivosAdjuntos;
