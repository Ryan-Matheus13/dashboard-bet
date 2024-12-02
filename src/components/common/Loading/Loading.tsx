/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress } from "@mui/material";
import styles from "./Loading.module.css";

export default function Loading({ transparent }: any) {
  return (
    <>
      {transparent && (
        <div className={styles.container + " " + styles.transparent}>
          <CircularProgress />
        </div>
      )}
      {!transparent && (
        <div className={styles.container}>
          <CircularProgress />
        </div>
      )}
    </>
  );
}
