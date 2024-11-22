import { CircularProgress } from "@mui/material";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
}
