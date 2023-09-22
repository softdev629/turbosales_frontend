import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import { useGetClientsQuery } from "../redux/api/clientApi";
import { StyledTableCell, StyledTableRow } from "./admin/hqcenters.page";
import ClientModal from "../components/modals/client.modal";

const MyClientsPage = () => {
  const [search, setSearch] = useState("");
  const [openClient, setOpenClient] = useState(false);

  const getClients = useGetClientsQuery();

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between" mt={6}>
          <Button variant="contained" onClick={() => setOpenClient(true)}>
            Add Client
          </Button>

          <Box width="25%">
            <FormControl fullWidth>
              <InputLabel id="status-label" size="small">
                Status
              </InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                label="Status"
                size="small"
                defaultValue=""
                onChange={(event) => {}}
              >
                <MenuItem value="P">Pitch</MenuItem>
                <MenuItem value="T">Test Drive</MenuItem>
                <MenuItem value="M">Member</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            sx={{ width: "25%" }}
            size="small"
            label="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Box>
        <Typography textAlign="center" color="#999999" mt={5}>
          STATUS: P = Pitch, T = Test Drive, M = Member (paid)
        </Typography>

        <TableContainer sx={{ px: 4, mt: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>COMPANY</StyledTableCell>
                <StyledTableCell align="center">CONTACT</StyledTableCell>
                <StyledTableCell align="center">STATUS</StyledTableCell>
                <StyledTableCell align="center">PURCHASES</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getClients.data &&
                getClients.data.map((row, index) =>
                  row.company.includes(search) || row.name.includes(search) ? (
                    <StyledTableRow
                      key={`table_row_${index}`}
                      // sx={{ bgcolor: "white" }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.company}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  ) : null
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ClientModal open={openClient} setOpen={setOpenClient} />
    </>
  );
};

export default MyClientsPage;
