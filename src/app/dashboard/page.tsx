"use client";
import Link from "next/link";
import styles from "./styles/dashboard.module.scss";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Welcome to Dashboard</h1>

      <div className={styles.ButtonContainer}>
        <Link className={styles.Button} href={"/"}>
          back to home
        </Link>
      </div>

      <Toaster />
    </div>
  );
}
