import { FiUpload } from "react-icons/fi";
import React, { ChangeEvent, useId, useState } from "react";

interface FileUploadProps {
  label?: string;
  accept?: string;
  required?: boolean;
  fileTypeLabel?: string;
  onFileSelect?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Certificado de Idioma",
  accept = "application/*",
  required = false,
  fileTypeLabel,
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState<string>();
  const id = useId();
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-gray-700">{label}</span>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        <FiUpload className="w-8 h-8 text-gray-500 mb-4" />

        <label
          htmlFor={id}
          className="cursor-pointer inline-block bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition"
        >
          Seleccionar Archivo
        </label>
        <input
          id={id}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          required={required}
        />
        <p className="text-sm text-gray-500 mt-2">
          {fileName ? (
            <span className="text-green-600 font-semibold">
              Archivo: {fileName}
            </span>
          ) : (
            <> {fileTypeLabel ?? ""} (máx. 5MB)</>
          )}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
