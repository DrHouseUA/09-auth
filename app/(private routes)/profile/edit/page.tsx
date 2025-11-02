"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/api/clientApi";
import { useState } from "react";

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  const [username, setUsername] = useState(user?.username);

  const handleCancelBtn = () => {
    router.push("/profile");
  };

  const handleSubmit = async (formData: FormData) => {
    const userName = formData.get("username") as string;

    const data = { username: userName };
    const updatedRes = await updateUser(data);
    setUser(updatedRes);
    router.push("/profile");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar as string}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancelBtn}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
