"use client";

import { UploadFileMutation } from '../mutations'
import { useMutation } from '@apollo/client/react';

const UploadAvatarForm = () => {
    const [uploadFile, { data, loading, error }] = useMutation(UploadFileMutation);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fileInput = e.target.elements.avatar;
        const file = fileInput.files[0];

        if (file) {
            uploadFile({ variables: { file: file } });
            fileInput.value = null; // Clear the input after upload
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" name="avatar" accept="image/*" required 
                    className='border-black-400 border-2 m-2 p-2'
                /><br />
                <button type="submit"
                    className="hover:underline text-black-400 bg-amber-400 border-amber-500 rounded px-4 py-2 m-2"
                ><span className="font-bold text-gray-700">Upload Avatar</span></button>
            </form>
            {data && data.uploadFile.success && (
                <p className="text-green-500">Avatar uploaded successfully!</p>
            )}
            {error && (
                <p className="text-red-500">Error uploading avatar: {error.message}</p>
            )}
            {loading && <p>Uploading...</p>}
        </>
    );
}

export default UploadAvatarForm;