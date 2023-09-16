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
  SvgIcon,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import {
  TablePaginationActions,
  StyledTableCell,
  StyledTableRow,
} from "./admin/hqcenters.page";
import StaffModal from "../components/modals/staff.modal";
import { useLazyGetStaffQuery } from "../redux/api/userApi";

import { ReactComponent as PlusIcon } from "../assets/images/ico_plus.svg";
import { ReactComponent as MinusIcon } from "../assets/images/ico_minus.svg";
import {
  useGetCenterSettingsQuery,
  useUpdateCenterSettingsMutation,
} from "../redux/api/centerApi";
import { ICenterSettings } from "../redux/api/types";
import FullScreenLoader from "../components/FullscreenLoader";

const CenterSettingsPage = () => {
  const [openStaff, setOpenStaff] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [settings, setSettings] = useState<ICenterSettings>();

  const [getStaff, getState] = useLazyGetStaffQuery();

  const getSettings = useGetCenterSettingsQuery();
  const [updateSettings] = useUpdateCenterSettingsMutation();

  useEffect(() => {
    setSettings(getSettings.data);
  }, [getSettings]);

  useEffect(() => {
    if (settings) updateSettings(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

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

  if (!settings) return <FullScreenLoader />;

  return (
    <>
      <Container>
        <Typography color="primary.main" variant="h4" textAlign="center">
          AI Center Settings
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            borderRadius={6}
            mt={6}
            bgcolor="rgba(217, 217, 217, 0.2)"
            p={4}
            maxWidth={1000}
            width="100%"
          >
            <Typography color="primary.main" variant="h5" textAlign="center">
              ROOMS & WORKSPACES
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Box
                border="1px solid #D9D9D9"
                bgcolor="#FFF"
                p={2}
                width="40%"
                borderRadius={4}
              >
                <Typography textAlign="center">Meeting Rooms</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Rooms</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      onClick={() => {
                        setSettings({
                          ...settings,
                          meeting_rooms: settings.meeting_rooms + 1,
                        });
                      }}
                      display="flex"
                      alignItems="center"
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>

                    {settings?.meeting_rooms}
                    <Box
                      onClick={() => {
                        if (settings.meeting_rooms > 1) {
                          setSettings({
                            ...settings,
                            meeting_rooms: settings.meeting_rooms - 1,
                          });
                        }
                      }}
                      display="flex"
                      alignItems="center"
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Duration</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.meeting_duration}
                        onChange={(event) => {
                          if (settings) {
                            setSettings({
                              ...settings,
                              meeting_duration: parseFloat(
                                event.target.value as string
                              ),
                            });
                          }
                        }}
                      >
                        <MenuItem value={1}>1 hour</MenuItem>
                        <MenuItem value={1.5}>1.5 hours</MenuItem>
                        <MenuItem value={2}>2 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                border="1px solid #D9D9D9"
                bgcolor="#FFF"
                p={2}
                width="40%"
                borderRadius={4}
              >
                <Typography textAlign="center">Workstations</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Workstations</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          workstations: settings.workstations + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.workstations}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.workstations > 1)
                          setSettings({
                            ...settings,
                            workstations: settings.workstations - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Duration</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.workstation_duration}
                        onChange={(event) => {
                          setSettings({
                            ...settings,
                            workstation_duration: parseFloat(
                              event.target.value as string
                            ),
                          });
                        }}
                      >
                        <MenuItem value={2}>2 hour</MenuItem>
                        <MenuItem value={2.5}>2.5 hours</MenuItem>
                        <MenuItem value={3}>3 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            borderRadius={6}
            mt={6}
            bgcolor="rgba(217, 217, 217, 0.2)"
            p={4}
            maxWidth={1000}
            width="100%"
          >
            <Typography color="primary.main" variant="h5" textAlign="center">
              OPERATING HOURS
            </Typography>
            <Box display="flex" justifyContent="center" mt={4}>
              <Box
                border="1px solid #D9D9D9"
                bgcolor="#FFF"
                p={4}
                width="100%"
                borderRadius={4}
                display="flex"
                flexDirection="column"
                gap={3}
              >
                {settings.operating_hours.map((row, index) => (
                  <Box
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    key={`operating_hour_${index}`}
                  >
                    <Typography width="20%">{row.day}</Typography>
                    <Box width="20%">
                      <FormControl fullWidth>
                        <Select
                          labelId="client-name-label"
                          id="client-name-select"
                          size="small"
                          value={row.start}
                          onChange={(event) => {
                            setSettings({
                              ...settings,
                              operating_hours: settings.operating_hours.map(
                                (
                                  item: {
                                    day: string;
                                    start: string;
                                    end: string;
                                  },
                                  item_index
                                ) =>
                                  item_index === index
                                    ? {
                                        ...item,
                                        start: event.target.value as string,
                                      }
                                    : item
                              ),
                            });
                          }}
                        >
                          <MenuItem value={"9:00"}>9:00</MenuItem>
                          <MenuItem value={"9.30"}>9:30</MenuItem>
                          <MenuItem value={"10:00"}>10:00</MenuItem>
                          <MenuItem value={"10.30"}>10:30</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box width="20%">
                      <FormControl fullWidth>
                        <Select
                          labelId="client-name-label"
                          id="client-name-select"
                          size="small"
                          value={row.end}
                          onChange={(event) => {
                            setSettings({
                              ...settings,
                              operating_hours: settings.operating_hours.map(
                                (
                                  item: {
                                    day: string;
                                    start: string;
                                    end: string;
                                  },
                                  item_index
                                ) =>
                                  item_index === index
                                    ? {
                                        ...item,
                                        end: event.target.value as string,
                                      }
                                    : item
                              ),
                            });
                          }}
                        >
                          <MenuItem value={"18:00"}>18:00</MenuItem>
                          <MenuItem value={"18.30"}>18:30</MenuItem>
                          <MenuItem value={"19:00"}>19:00</MenuItem>
                          <MenuItem value={"10.30"}>10:30</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            borderRadius={6}
            mt={6}
            bgcolor="rgba(217, 217, 217, 0.2)"
            p={4}
            maxWidth={1000}
            width="100%"
          >
            <Typography color="primary.main" variant="h5" textAlign="center">
              COMMISSIONS
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              mt={4}
              flexWrap="wrap"
              gap={4}
            >
              <Box
                width="30%"
                border="1px solid #D9D9D9"
                bgcolor="rgba(234, 32, 73, 0.1)"
                borderRadius={6}
                p={2}
                textAlign="center"
              >
                <Typography>
                  Manager:
                  <br />
                  per Membership
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Amount</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          manager_membership_amount:
                            settings.manager_membership_amount + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.manager_membership_amount}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.manager_membership_amount > 1)
                          setSettings({
                            ...settings,
                            manager_membership_amount:
                              settings.manager_membership_amount - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Type</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.manager_membership_type}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            manager_membership_type: event.target
                              .value as string,
                          })
                        }
                      >
                        <MenuItem value={"€"}>€</MenuItem>
                        <MenuItem value={"%"}>%</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                width="30%"
                border="1px solid #D9D9D9"
                bgcolor="rgba(234, 32, 73, 0.1)"
                borderRadius={6}
                p={2}
                textAlign="center"
              >
                <Typography>
                  Manager:
                  <br />
                  per AI Center
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Amount</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          manager_aicenter_amount:
                            settings.manager_aicenter_amount + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.manager_aicenter_amount}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.manager_aicenter_amount > 1)
                          setSettings({
                            ...settings,
                            manager_aicenter_amount:
                              settings.manager_aicenter_amount - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Type</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.manager_aicenter_type}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            manager_aicenter_type: event.target.value as string,
                          })
                        }
                      >
                        <MenuItem value={"€"}>€</MenuItem>
                        <MenuItem value={"%"}>%</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                width="30%"
                border="1px solid #D9D9D9"
                bgcolor="rgba(133, 220, 255, 0.2)"
                borderRadius={6}
                p={2}
                textAlign="center"
              >
                <Typography>
                  Sales Rep:
                  <br />
                  per Membership
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Amount</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          salesrep_membership_amount:
                            settings.salesrep_membership_amount + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.salesrep_membership_amount}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.salesrep_membership_amount > 1)
                          setSettings({
                            ...settings,
                            salesrep_membership_amount:
                              settings.salesrep_membership_amount - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Type</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.salesrep_membership_type}
                        onChange={(event) => {
                          setSettings({
                            ...settings,
                            salesrep_membership_type: event.target
                              .value as string,
                          });
                        }}
                      >
                        <MenuItem value={"€"}>€</MenuItem>
                        <MenuItem value={"%"}>%</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                width="30%"
                border="1px solid #D9D9D9"
                bgcolor="rgba(133, 220, 255, 0.2)"
                borderRadius={6}
                p={2}
                textAlign="center"
              >
                <Typography>
                  Sales Rep:
                  <br />
                  per AI Center
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Amount</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          salesrep_aicenter_amount:
                            settings.salesrep_aicenter_amount + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.salesrep_aicenter_amount}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.salesrep_aicenter_amount > 1)
                          setSettings({
                            ...settings,
                            salesrep_aicenter_amount:
                              settings.salesrep_aicenter_amount - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Type</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.salesrep_aicenter_type}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            salesrep_aicenter_type: event.target
                              .value as string,
                          })
                        }
                      >
                        <MenuItem value={"€"}>€</MenuItem>
                        <MenuItem value={"%"}>%</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                width="30%"
                border="1px solid #D9D9D9"
                bgcolor="rgba(76, 195, 102, 0.2)"
                borderRadius={6}
                p={2}
                textAlign="center"
              >
                <Typography>
                  Manager:
                  <br />
                  per Membership
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Amount</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          instructor_membership_amount:
                            settings.instructor_membership_amount + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.instructor_membership_amount}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.instructor_membership_amount > 1)
                          setSettings({
                            ...settings,
                            instructor_membership_amount:
                              settings.instructor_membership_amount - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Type</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.instructor_membership_type}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            instructor_membership_type: event.target
                              .value as string,
                          })
                        }
                      >
                        <MenuItem value={"€"}>€</MenuItem>
                        <MenuItem value={"%"}>%</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box
                width="30%"
                border="1px solid #D9D9D9"
                bgcolor="rgba(76, 195, 102, 0.2)"
                borderRadius={6}
                p={2}
                textAlign="center"
              >
                <Typography>
                  Manager:
                  <br />
                  per Membership
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Amount</Typography>
                  <Box
                    display="flex"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        setSettings({
                          ...settings,
                          instructor_aicenter_amount:
                            settings.instructor_aicenter_amount + 1,
                        });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <PlusIcon />
                      </SvgIcon>
                    </Box>
                    {settings.instructor_aicenter_amount}
                    <Box
                      display="flex"
                      alignItems="center"
                      onClick={() => {
                        if (settings.instructor_aicenter_amount > 1)
                          setSettings({
                            ...settings,
                            instructor_aicenter_amount:
                              settings.instructor_aicenter_amount - 1,
                          });
                      }}
                    >
                      <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                        <MinusIcon />
                      </SvgIcon>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography flexGrow={1}>Type</Typography>
                  <Box flexGrow={1}>
                    <FormControl fullWidth>
                      <Select
                        labelId="client-name-label"
                        id="client-name-select"
                        size="small"
                        value={settings.instructor_aicenter_type}
                        onChange={(event) =>
                          setSettings({
                            ...settings,
                            instructor_aicenter_type: event.target
                              .value as string,
                          })
                        }
                      >
                        <MenuItem value={"€"}>€</MenuItem>
                        <MenuItem value={"%"}>%</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={10}>
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
