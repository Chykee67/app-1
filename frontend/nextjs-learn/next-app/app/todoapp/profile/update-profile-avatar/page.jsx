"use client";

import UploadAvatarForm from "../../components/uploadavatarform";
import { useProfile } from "../../layout";

export default function UpdateProfileAvatarPage() {
    const { avatarUrl } = useProfile();

    return (
        <div>
            <h1 className="text-bold text-gray-900 text-2xl m-2 p-2">Update Profile Avatar</h1>
            <img src={avatarUrl} alt="Avatar" width="150" height="150" className="m-2 p-2" />
            <UploadAvatarForm />
        </div>
    );
}