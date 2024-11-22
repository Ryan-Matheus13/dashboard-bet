/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableProps } from "./Table.types";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ActionButton from "../ActionButton/ActionButton";
import { splitArrayIntoChunks } from "@/utils/utils.helper";
import Pagination from "../Pagination/Pagination";

const Table: React.FC<TableProps> = ({
  rows,
  columns,
  onEdit,
  onDelete,
  onReadData,
  onOpenHistory,
}) => {
  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const handleProcessing = () => {
    const dados = splitArrayIntoChunks(rows);
    setData(dados);
    setTotalPages(dados.length);
  };
  useEffect(() => {
    handleProcessing();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </caption>
        <TableHead>
          <TableRow>
            {columns.map((col: string, index: number) => {
              return (
                <TableCell key={index} className={styles.cell}>
                  {col}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 && (
            <>
              {data[currentPage - 1].map((row: any, rowIndex: number) => (
                <>
                  <TableRow key={rowIndex}>
                    {Object.keys(row)
                      .filter((key) => key !== "id")
                      .map((key) => (
                        <>
                          <TableCell>{row[key]}</TableCell>
                        </>
                      ))}
                    <TableCell>
                      <div>
                        <ActionButton
                          onClick={() => onReadData(row.id)}
                          Icon={() => <InfoRoundedIcon />}
                        />
                        <ActionButton
                          onClick={() => onEdit(row.id)}
                          Icon={() => <EditNoteRoundedIcon />}
                        />
                        <ActionButton
                          onClick={() => onOpenHistory(row.id)}
                          Icon={() => <HistoryRoundedIcon />}
                        />
                        <ActionButton
                          onClick={() => onDelete(row.id)}
                          Icon={() => <DeleteRoundedIcon />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
