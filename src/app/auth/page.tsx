"use client";

import type React from "react";
import styles from "./styles/auth.module.scss";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { phoneRegex } from "@/lib/regex";
import { CircleAlert } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button/button";

export default function AuthPage() {
  const [phone, setPhone] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(true);
  const router = useRouter();

  const phoneSchema = z.string().regex(new RegExp(phoneRegex));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const phoneRes = validatePhone(phone);

      if (!phoneRes.success) {
        setValidated(false);
        setIsLoading(false);

        toast.error("Enter a valid phone number!", { position: "top-right" });
      } else {
        setValidated(true);

        let data = await fetch("https://randomuser.me/api/?results=1&nat=us");
        let UserInfo = await data.json();

        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
          setIsLoading(false);
          toast.success("you signed in successfully!");
          router.push("/dashboard");
        } else {
          const data = await res.json();
          alert(data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert(err);
      setIsLoading(false);
    }
  }

  function validatePhone(phone: string) {
    const result = phoneSchema.safeParse(phone);
    return result;
  }

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}></div>
          </div>
          <h1 className={styles.title}>Welcome</h1>
          <p className={styles.subtitle}>Sign in to your account to continue</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <Input
              label="Phone"
              type="text"
              name="phone"
              id="phone input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone number"
              required
              fullWidth
            />

            {!validated && (
              <div className={styles.validateContainer}>
                <CircleAlert size={16} />
                <p>Enter a valid phone number</p>
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            data-full-width="true"
          >
            Sign In
          </Button>

          {/* <button
            type="submit"
            className={`${styles.submitButton} ${
              isLoading ? styles.loading : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <div className={styles.spinner} /> : "sign in"}
          </button> */}
        </form>
      </div>
      <Toaster />
    </div>
  );
}
