/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// MODO MOBILE COM LINHAS VIRANDO CARDS
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
import router from "next/router";

// import PhotosIcon from "@mui/icons-material/PhotoLibrarySharp";
// import MapsIcon from "@mui/icons-material/Map";
// import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import EditIcon from "@mui/icons-material/Edit";
// import RefreshIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
// import Pagination from "../Pagination/Pagination";
import ActionButton from "../ActionButton/ActionButton";
import { Stack } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
// import { useAppSelector } from "../../../store/hooks/useAppSelector";
// import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
// import {
//   pageChange,
//   perPageChange,
// } from "../../../store/applicationStore/actions";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: "7.5px",
//   border: theme.palette.mode === "dark" ? "none" : "1px solid #dcdcdc",
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     // marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     width: "100% !important",
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     backgroundColor: "rgba(255, 255, 255, 0.595) !important",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

const Table: React.FC<TableProps> = ({
  rows,
  error,
  columns,
  hiddenColumns,
  onEdit,
  onDelete,
  isLoading,
}) => {
  // const { application } = useAppSelector((store) => store.application);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (error == "Token não fornecido.") {
      router.push("/auth/login");
    }
    if (error) {
      toast.error(String(error));
    }
  }, [error]);

  const [data, setData] = useState<Array<any>>([]);
  // const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    handleProcessing();
  }, [rows]);

  const handleProcessing = () => {
    // if (application.total > application.perPage) {
    //   setTotalPages(application.total / application.perPage);
    // } else {
    //   setTotalPages(1);
    // }
    setData(rows ? rows : []);
  };

  // const handlePageChange = (page: number) => {
  //   dispatch(pageChange(page));
  // };

  // const handlePerPageChange = (value: number) => {
  //   dispatch(pageChange(1));
  //   dispatch(perPageChange(value));
  // };

  return (
    <div className={styles.container}>
      {/* <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search> */}
      <TableContainer
        sx={{ position: "relative", width: "100%" }}
        component={Paper}
      >
        {isLoading && <Loading />}
        <MuiTable
          sx={{
            minWidth: 650,
            width: "100%",
            borderRadius: "0.5rem",
            borderCollapse: "separate",
            boxShadow: "none",
            backgroundColor: "transparent",
          }}
          aria-label="caption table"
        >
          {/* <caption style={{ backgroundColor: "#f8ffff" }}>
            <Pagination
              totalPages={totalPages}
              currentPage={application.page}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handlePerPageChange}
              totalItems={application.total}
              itemsPerPage={application.perPage}
            />
          </caption> */}
          <TableHead>
            <TableRow>
              {columns && (
                <>
                  {columns.map((col: string, index: number) => {
                    return (
                      <>
                        {index == columns.length - 1 && (
                          <TableCell
                            key={index}
                            sx={{
                              maxWidth: 100,
                              flex: 0,
                            }}
                            className={styles.cell}
                          >
                            {col}
                          </TableCell>
                        )}
                        {index != columns.length - 1 && (
                          <TableCell key={index} className={styles.cell}>
                            {col}
                          </TableCell>
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: "400px" }}>
            {data.length > 0 && !isLoading && (
              <>
                {data.map((row: any, rowIndex: number) => (
                  <>
                    <TableRow key={rowIndex}>
                      {Object.keys(row)
                        .filter(
                          (key) => key !== "id" && !hiddenColumns?.includes(key)
                        )
                        .map((key) => (
                          <>
                            {key == "gameImg" && (
                              <TableCell
                                style={{
                                  fontWeight: "normal",
                                  color: "#555",
                                  width: 120,
                                }}
                              >
                                <img height={60} width={60} src={row[key]} />
                              </TableCell>
                            )}
                            {key != "gameImg" && (
                              <TableCell
                                style={{
                                  fontWeight: "normal",
                                  color: "#555",
                                }}
                              >
                                {row[key].length > 100
                                  ? row[key].substring(0, 100) + "..."
                                  : row[key]}
                              </TableCell>
                            )}
                          </>
                        ))}
                      <TableCell
                        sx={{
                          width: 180,
                          flex: 0,
                        }}
                      >
                        <div className={styles.actionBtnContainer}>
                          <Stack direction="row" spacing={1}>
                            <ActionButton
                              title="Editar Game"
                              className={styles.btnAction}
                              onClick={() => onEdit(row)}
                              Icon={() => <EditIcon fontSize="small" />}
                            />
                            <ActionButton
                              title="Excluir Game"
                              className={styles.btnAction}
                              onClick={() => onDelete(row)}
                              Icon={() => <DeleteIcon fontSize="small" />}
                            />
                          </Stack>
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
    </div>
  );
};

export default Table;
