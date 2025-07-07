import Link from "next/link";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>main page</h1>

      <div className={styles.ButtonContainer}>
        <Link className={styles.Button} href={"/auth"}>
          login
        </Link>
        <Link className={styles.Button} href={"/dashboard"}>
          dashboard
        </Link>
      </div>
    </div>
  );
}
