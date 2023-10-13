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
import { useTranslation } from "react-i18next";

import { useGetClientsQuery } from "../redux/api/clientApi";
import { StyledTableCell, StyledTableRow } from "./admin/hqcenters.page";
import ClientModal from "../components/modals/client.modal";

const CenterClientPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [openClient, setOpenClient] = useState(false);

  const getClients = useGetClientsQuery();

  return (
    <>
      <Container sx={{ mt: 20 }}>
        <Box
          display="flex"
          justifyContent="space-around"
          mt={6}
          flexWrap="wrap"
          gap={2}
        >
          <Button variant="contained" onClick={() => setOpenClient(true)}>
            {t("my_clients.add_client")}
          </Button>
          <Box width={192}>
            <FormControl fullWidth>
              <InputLabel id="status-label" size="small">
                {t("dashboard.referrer")}
              </InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                label={t("my_clients.status")}
                size="small"
                defaultValue=""
              >
                <MenuItem value="1">Sales Rep 1</MenuItem>
                <MenuItem value="2">Sales Rep 2</MenuItem>
                <MenuItem value="3">Instructor</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box width={{ md: "25%", xs: "30%" }}>
            <FormControl fullWidth>
              <InputLabel id="status-label" size="small">
                {t("my_clients.status")}
              </InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                label={t("my_clients.status")}
                size="small"
                defaultValue=""
              >
                <MenuItem value="P">{t("my_clients.pitch")}</MenuItem>
                <MenuItem value="T">{t("home.testdrive")}</MenuItem>
                <MenuItem value="M">{t("my_clients.member")}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            sx={{ width: { md: "25%", xs: 192 } }}
            size="small"
            label={t("my_clients.search")}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Box>
        <Typography textAlign="center" color="#999999" mt={5}>
          {t("my_clients.status")}: P = {t("my_clients.pitch")}, T ={" "}
          {t("home.testdrive")}, M = {t("my_clients.member")} (
          {t("commissions.members_paid.1")})
        </Typography>

        <TableContainer sx={{ px: 4, mt: 3 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t("home.common.company")}</StyledTableCell>
                <StyledTableCell align="center">
                  {t("contact.title")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("my_clients.status")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("my_clients.purchases")}
                </StyledTableCell>
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
                        <Typography color="primary.main">
                          {row.company}
                        </Typography>
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

export default CenterClientPage;
