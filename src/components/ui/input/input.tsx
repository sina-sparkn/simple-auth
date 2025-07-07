"use client";
import type React from "react";
import { forwardRef } from "react";
import styles from "./input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  variant?: "default" | "filled";
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant = "default",
      fullWidth = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    // const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputClass = [
      styles.input,
      styles[variant],
      fullWidth ? styles.fullWidth : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.inputGroup}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={inputClass}
          {...props}
          type="text"
        />
      </div>
    );
  }
);

Input.displayName = "Input";
