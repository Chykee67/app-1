"use client"

import { UploadFileMutation } from "../mutations";

import { useMutation } from "@apollo/client/react";

import { useProfile } from "../layout";

export default function UploadPage() {

    const { username, avatarUrl } = useProfile();

    const [uploadFile, { data, loading, error }] = useMutation(UploadFileMutation);

    const handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.file.files[0];
        if (file) {
            uploadFile({ variables: { file: file } });
        }
    };

    if(data){
        console.log("File Upload Data: ", data);
    }

    return (
        <div>
            <h1>Upload a File</h1>
            <p>Logged in as: {username}</p>
            {avatarUrl && <img src={avatarUrl} alt="Avatar" width="100" height="100" />}
            <form method="post" encType="multipart/form-data" onSubmit={handleFileChange}>
                <input type="file" name="file" 
                    className="mb-4 border border-gray-300 rounded px-3 py-2"
                    id="file" 
                />
                <br />
                <button type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Upload
                </button>
            </form>
            {loading && <p>Uploading...</p>}
            {error && <p>Error uploading file: {error.message}</p>}
            {data && data.uploadFile.success && <p>File uploaded successfully!</p>}
        </div>
    );
}