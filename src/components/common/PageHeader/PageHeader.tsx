import React from "react";
import { PageHeaderProps } from "./PageHeader.types";
import styles from "./PageHeader.module.css";
import InputField from "../InputField/InputField";
import QueueIcon from "@mui/icons-material/Queue";

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  searchable,
  searchValue,
  searchOnChange,
  buttonLabel,
  buttonOnClick,
}) => {
  return (
    <div className={styles.pageHeaderContainer}>
      <h3 className={styles.pageHeaderTitle}>{title}</h3>
      <div className={styles.pageHeaderContent}>
        {searchable && (
          <div className={styles.pageHeaderInputContainer}>
            <InputField
              id="search"
              label="Buscar"
              type="search"
              value={searchValue}
              onChange={searchOnChange ? searchOnChange : () => {}}
            />
          </div>
        )}
        {buttonLabel && (
          <div className={styles.btnRow}>
            <button
              title={buttonLabel}
              onClick={buttonOnClick}
              className={styles.btn}
              type="button"
            >
              <QueueIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
