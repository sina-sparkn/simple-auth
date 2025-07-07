import type React from "react";
import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "apple";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} disabled={disabled || loading} {...props}>
      {loading ? <div className={styles.spinner}></div> : children}
    </button>
  );
}
