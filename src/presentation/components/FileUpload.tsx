import { FiUpload } from "react-icons/fi";
import React, { ChangeEvent, useEffect, useId, useState } from "react";
import { useUser } from "../../core/UserInfoProvider";

interface FileUploadProps {
  label?: string;
  accept?: string;
  required?: boolean;
  fileTypeLabel?: string;
  fileKey: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = "Archivo",
  accept = "application/pdf",
  required = false,
  fileTypeLabel,
  fileKey,
}) => {
  const id = useId();
  const { uploadUserFiles, userData } = useUser();
  const [fileName, setFileName] = useState<string>();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);


  useEffect(() => {
    const existingUrl = userData?.files?.[fileKey as keyof typeof userData.files];
    if (existingUrl) {
      setUploadedUrl(existingUrl);
      const nameFromUrl = existingUrl.substring(existingUrl.lastIndexOf("%2F") + 3, existingUrl.indexOf("?"));
      setFileName(nameFromUrl);
    }
  }, [userData, fileKey]);

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const url = await uploadUserFiles(fileKey, file);
    if (url) {
      setUploadedUrl(url);
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
            <>{fileTypeLabel ?? "PDF requerido (máx. 5MB)"}</>
          )}
        </p>

        {uploadedUrl && (
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm mt-1"
          >
            Ver archivo subido
          </a>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
