import { useState } from "react";

export default function FileUploader() {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);

        const formData = new FormData();
        formData.append("file", file);

        await fetch("/api/upload", { method: "POST", body: formData });
    };

    return (
        <div className="p-4">
            <input type="file" onChange={handleFileUpload} className="p-2" />
            {uploadedFile && <p className="text-sm text-gray-600">File uploaded: {uploadedFile.name}</p>}
        </div>
    );
}
