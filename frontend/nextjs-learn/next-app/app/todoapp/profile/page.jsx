"use client";

import { useProfile } from "../layout";

export default function ProfilePage() {

    const { username, avatarUrl } = useProfile();

    return (
        <div>
            <h1 className="text-bold text-gray-900 text-2xl m-2 p-2">Welcome {username}!</h1>
            <a href="/todoapp/profile/update-profile-avatar">
                <img src={avatarUrl} alt="Avatar" width="200" height="200" className="m-2 p-2" />
            </a>
        </div>
    );
}