"use client";
import Link from "next/link";
import styles from "./styles/dashboard.module.scss";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Dashboard</h1>

      <div className={styles.ButtonContainer}>
        <Link href={"/"}>back to home</Link>
      </div>

      <Toaster />
    </div>
  );
}
