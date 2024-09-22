import Link from "next/link";
import styles from "@/styles/404.module.scss";

export default function NotFound() {
  return (
    <div>
    <div className={styles.notFoundContainer}>
      <div className={styles.glitchText} title="404">
        404
      </div>
    </div>
      <Link href="/">Return Home</Link>
    </div>
  );
}
