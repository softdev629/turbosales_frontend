import { useState, useEffect } from "react";

import {
  Container,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableFooter,
  TableBody,
  TableCell,
  TablePagination,
} from "@mui/material";

import {
  TablePaginationActions,
  StyledTableCell,
  StyledTableRow,
} from "./admin/hqcenters.page";
import StaffModal from "../components/modals/staff.modal";
import { useLazyGetStaffQuery } from "../redux/api/userApi";

const CenterSettingsPage = () => {
  const [openStaff, setOpenStaff] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [getStaff, getState] = useLazyGetStaffQuery();

  useEffect(() => {
    getStaff({ page, rowsPerPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = !getState.data
    ? rowsPerPage
    : page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - getState.data.total_counts)
    : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" color="primary.main">
            STAFF
          </Typography>
          <Button variant="contained" onClick={() => setOpenStaff(true)}>
            ADD STAFF
          </Button>
        </Box>
        <Typography textAlign="right" mt={3}>
          JOB: S = Sales Rep, I = Instructor, M = Manager{" "}
        </Typography>
        <TableContainer sx={{ px: 4, mt: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>NAME</StyledTableCell>
                <StyledTableCell align="center">JOB</StyledTableCell>
                <StyledTableCell align="center">START DATE</StyledTableCell>
                <StyledTableCell align="center">FREEZE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getState.data?.users &&
                getState.data.users.map((row, index) => (
                  <StyledTableRow key={`table_row_${index}`}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.role.toUpperCase()[0]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row.createdAt).toLocaleDateString("en-Us", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">FREEZE</StyledTableCell>
                  </StyledTableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={!getState.data ? 0 : getState.data.total_counts}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
      <StaffModal open={openStaff} setOpen={setOpenStaff} />
    </>
  );
};

export default CenterSettingsPage;
