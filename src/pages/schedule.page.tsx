import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  SvgIcon,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

import { ReactComponent as TestdriveIcon } from "../assets/images/ico_test_drive.svg";
import { ReactComponent as ClockIcon } from "../assets/images/ico_clock.svg";
import { ReactComponent as PCIcon } from "../assets/images/ico_pc.svg";

import {
  useLazyGetTestdriveByDateQuery,
  useLazyGetPenddingQuery,
  useAssignTestdriveMutation,
  useLazyGetConfirmQuery,
  useConfirmTestdriveMutation,
} from "../redux/api/testdriveApi";
import { useLazyGetCenterSettingsQuery } from "../redux/api/centerApi";
import { useLazyGetSalesQuery } from "../redux/api/userApi";

import { useAppSelector } from "../redux/store";
import { divideIntervals, fromDayjsToDate } from "../util";
import TestDriveModal from "../components/modals/testdrive.modal";
import { IUser } from "../redux/api/types";

const SchedulePage = () => {
  const { t } = useTranslation();

  const [openTestdrive, setOpenTestdrive] = useState(false);
  const [booked, setBooked] = useState<
    {
      start: string;
      end: string;
      workstation: { num: number; status: string }[];
    }[]
  >([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [roomInfo, setRoomInfo] = useState<{
    time: string;
    workstation: number;
    staff: string;
    client: string;
    company: string;
  }>();
  const [bookInfo, setBookInfo] = useState<{
    testdrive_id: string;
    date: string;
    staff_id: string;
    client: string;
    company: string;
  }>({
    testdrive_id: "",
    date: "",
    staff_id: "",
    client: "",
    company: "",
  });
  const [confirmInfo, setConfirmInfo] = useState<{
    testdrive_id: string;
    date: string;
    staff: string;
    client: string;
    company: string;
  }>({
    testdrive_id: "",
    date: "",
    staff: "",
    client: "",
    company: "",
  });
  const [sales, setSales] = useState<IUser[]>([]);

  const [getCenterSettings] = useLazyGetCenterSettingsQuery();
  const [getTestdriveByDate, getTestdriveState] =
    useLazyGetTestdriveByDateQuery();
  const [getPending, pendingState] = useLazyGetPenddingQuery();
  const [getSales, salesState] = useLazyGetSalesQuery();
  const [assignTestdrive, assignState] = useAssignTestdriveMutation();
  const [getConfirm, confirmingState] = useLazyGetConfirmQuery();
  const [confirmTestdrive, confirmState] = useConfirmTestdriveMutation();

  const settings = useAppSelector((state) => state.centerState.settings);
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    getCenterSettings();

    getSales();
    getPending();
    getConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getTestdriveState.isSuccess) {
      if (settings && date) {
        const testdrives = getTestdriveState.data;
        let booked_workstations: {
          [key: string]: { num: number; status: string }[];
        } = {};
        for (let i in testdrives) {
          for (let j in testdrives[i].time_rooms) {
            if (
              Object.keys(booked_workstations).includes(
                testdrives[i].time_rooms[j].start
              )
            ) {
              booked_workstations[testdrives[i].time_rooms[j].start].push({
                num: testdrives[i].time_rooms[j].workstation,
                status: testdrives[i].status,
              });
            } else {
              booked_workstations[testdrives[i].time_rooms[j].start] = [
                {
                  num: testdrives[i].time_rooms[j].workstation,
                  status: testdrives[i].status,
                },
              ];
            }
          }
        }
        const intervals = divideIntervals(
          settings.operating_hours[(date.day() + 6) % 7].start,
          settings.operating_hours[(date.day() + 6) % 7].end,
          settings.workstation_duration
        );
        let tempArray: {
          start: string;
          end: string;
          workstation: { num: number; status: string }[];
        }[] = [];
        for (let i in intervals) {
          if (Object.keys(booked_workstations).includes(intervals[i].start)) {
            tempArray.push({
              start: intervals[i].start,
              end: intervals[i].end,
              workstation: booked_workstations[intervals[i].start],
            });
          } else {
            tempArray.push({
              start: intervals[i].start,
              end: intervals[i].end,
              workstation: [],
            });
          }
        }
        setBooked([...tempArray]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTestdriveState]);

  useEffect(() => {
    if (pendingState.isSuccess && pendingState.data) {
      if (!pendingState.data) {
        setBookInfo({
          testdrive_id: "",
          date: "",
          staff_id: "",
          client: "",
          company: "",
        });
        return;
      }
      setBookInfo({
        testdrive_id: pendingState.data?._id as string,
        date: `${
          pendingState.data?.date &&
          new Date(pendingState.data?.date).getMonth() + 1
        }/${
          pendingState.data?.date && new Date(pendingState.data?.date).getDate()
        }/${
          pendingState.data?.date &&
          new Date(pendingState.data?.date).getFullYear()
        }`,
        staff_id: pendingState.data?.staff?._id as string,
        client: pendingState.data?.client_name as string,
        company: pendingState.data?.company as string,
      });
    }
  }, [pendingState]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (salesState.isSuccess && salesState.data) {
      setSales(salesState.data);
    }
  }, [salesState]);

  useEffect(() => {
    if (assignState.isSuccess) {
      toast.success("Assigned Successfully.");
      getPending();
    }
  }, [assignState]);

  useEffect(() => {
    if (confirmingState.isSuccess) {
      if (!confirmingState.data) {
        setConfirmInfo({
          testdrive_id: "",
          date: "",
          staff: "",
          client: "",
          company: "",
        });
        return;
      }
      console.log(confirmingState.data);
      setConfirmInfo({
        testdrive_id: confirmingState.data?._id as string,
        date: `${
          confirmingState.data?.date &&
          new Date(confirmingState.data?.date).getMonth() + 1
        }/${
          confirmingState.data?.date &&
          new Date(confirmingState.data?.date).getDate()
        }/${
          confirmingState.data?.date &&
          new Date(confirmingState.data?.date).getFullYear()
        }`,
        staff: confirmingState.data.staff.name,
        client: confirmingState.data.client_name as string,
        company: confirmingState.data.company as string,
      });
    }
  }, [confirmingState]);

  useEffect(() => {
    if (confirmState.isSuccess) {
      toast.success("Book confirmed Successfully.");
      getConfirm();
    }
  }, [confirmState]);

  return (
    <>
      <Box
        boxShadow="5px 5px 10px 0px #d4d4d4"
        zIndex={1}
        position="fixed"
        width="100%"
        bgcolor="white"
        top={96}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            py: 4,
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Button
            sx={{ width: 96, height: 96, borderRadius: 6 }}
            variant="outlined"
            onClick={() => setOpenTestdrive(true)}
          >
            <SvgIcon sx={{ width: 48, height: 48 }}>
              <TestdriveIcon />
            </SvgIcon>
          </Button>
          {user?.role === "manager" ? (
            <Box
              width="100%"
              maxWidth={350}
              borderRadius={6}
              bgcolor="rgba(217, 217, 217, 0.15)"
              border="1px solid #D9D9D9"
              p={2}
            >
              <Box display="flex" mb={1}>
                <Typography
                  color="primary.main"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SvgIcon sx={{ fill: "#ea2049", mr: 1 }}>
                    <ClockIcon />
                  </SvgIcon>
                  {bookInfo?.date}
                </Typography>
              </Box>
              <Box display="flex" mb={1} justifyContent="space-between">
                <Typography
                  color="#595959"
                  sx={{ display: "flex", alignItems: "center" }}
                  width="30%"
                >
                  {t("home.common.staff")}
                </Typography>
                <Box width="60%">
                  <FormControl fullWidth>
                    <Select
                      labelId="staff-name-label"
                      id="staff-name-select"
                      size="small"
                      value={bookInfo?.staff_id}
                      onChange={(event) => {
                        setBookInfo({
                          ...bookInfo,
                          staff_id: event.target.value,
                        });
                      }}
                    >
                      {sales.map((sale, index) => (
                        <MenuItem key={`sale_item_${index}`} value={sale._id}>
                          {sale.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box display="flex" mb={1} justifyContent="space-between">
                <Typography
                  color="#595959"
                  sx={{ display: "flex", alignItems: "center" }}
                  width="30%"
                >
                  {t("home.common.client")}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  width="60%"
                >
                  {bookInfo?.client}
                </Typography>
              </Box>

              <Box display="flex" mb={1} justifyContent="space-between">
                <Typography
                  color="#595959"
                  sx={{ display: "flex", alignItems: "center" }}
                  width="30%"
                >
                  {t("home.common.company")}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  width="60%"
                >
                  {bookInfo?.company}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <LoadingButton
                  variant="contained"
                  onClick={() => {
                    assignTestdrive({
                      testdrive_id: bookInfo.testdrive_id,
                      staff_id: bookInfo.staff_id,
                    });
                  }}
                >
                  {t("home.common.confirm")}
                </LoadingButton>
              </Box>
            </Box>
          ) : null}

          {user?.role === "sales" ? (
            <Box
              width="100%"
              maxWidth={350}
              borderRadius={6}
              bgcolor="rgba(217, 217, 217, 0.15)"
              border="1px solid #D9D9D9"
              p={2}
            >
              <Box display="flex" mb={1}>
                <Typography
                  color="primary.main"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SvgIcon sx={{ fill: "#ea2049", mr: 1 }}>
                    <ClockIcon />
                  </SvgIcon>
                  {confirmInfo?.date}
                </Typography>
              </Box>
              <Box display="flex" mb={1} justifyContent="space-between">
                <Typography
                  color="#595959"
                  sx={{ display: "flex", alignItems: "center" }}
                  width="30%"
                >
                  {t("home.common.staff")}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  width="60%"
                >
                  {confirmInfo?.staff}
                </Typography>
              </Box>
              <Box display="flex" mb={1} justifyContent="space-between">
                <Typography
                  color="#595959"
                  sx={{ display: "flex", alignItems: "center" }}
                  width="30%"
                >
                  {t("home.common.client")}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  width="60%"
                >
                  {confirmInfo?.client}
                </Typography>
              </Box>

              <Box display="flex" mb={1} justifyContent="space-between">
                <Typography
                  color="#595959"
                  sx={{ display: "flex", alignItems: "center" }}
                  width="30%"
                >
                  {t("home.common.company")}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  width="60%"
                >
                  {confirmInfo?.company}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="flex-end">
                <LoadingButton
                  variant="contained"
                  onClick={() => {
                    confirmTestdrive({
                      testdrive_id: confirmInfo.testdrive_id,
                    });
                  }}
                >
                  {t("home.common.confirm")}
                </LoadingButton>
              </Box>
            </Box>
          ) : null}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ width: { md: "fit-content", xs: "100%" } }}
            >
              <DatePicker
                label={t("schedule.book_date_picker")}
                value={date}
                onChange={(value) => {
                  setDate(value);
                  if (value) {
                    getTestdriveByDate({
                      date: fromDayjsToDate(value),
                    });
                  }
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Box
            width="100%"
            maxWidth={350}
            borderRadius={6}
            bgcolor="rgba(217, 217, 217, 0.15)"
            border="1px solid #D9D9D9"
            p={2}
          >
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="primary.main"
                variant="h5"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                <SvgIcon sx={{ fill: "#ea2049", mr: 1 }}>
                  <ClockIcon />
                </SvgIcon>
                {roomInfo?.time}
              </Typography>
              <Typography
                color="primary.main"
                variant="h5"
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                <SvgIcon sx={{ fill: "#ea2049", mr: 1 }}>
                  <PCIcon />
                </SvgIcon>
                {t("schedule.workstation")}{" "}
                {String.fromCharCode(
                  "A".charCodeAt(0) + (roomInfo?.workstation as number)
                )}
              </Typography>
            </Box>
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="#595959"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                {t("home.common.staff")}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                {roomInfo?.staff}
              </Typography>
            </Box>
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="#595959"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                {t("home.common.client")}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                {roomInfo?.client}
              </Typography>
            </Box>
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="#595959"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                {t("home.common.company")}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                {roomInfo?.company}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container sx={{ mt: { md: 50, xs: 95 }, minHeight: 400 }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          flexWrap="wrap"
          alignItems="center"
          gap={2}
        >
          <Typography>{t("schedule.legend")}</Typography>
          <Box
            width={{ md: "10%", xs: "30%" }}
            height={35}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(76, 195, 102, 0.4)"
            borderRadius={2}
          >
            {t("schedule.free")}
          </Box>
          <Box
            width={{ md: "10%", xs: "30%" }}
            height={35}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(245, 153, 4, 0.4)"
            borderRadius={2}
          >
            {t("schedule.pending")}
          </Box>
          <Box
            width={{ md: "10%", xs: "30%" }}
            height={35}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(150, 223, 74, 0.4)"
            borderRadius={2}
          >
            {t("schedule.confirming")}
          </Box>
          <Box
            width={{ md: "10%", xs: "30%" }}
            height={35}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(225, 71, 71, 0.4)"
            borderRadius={2}
          >
            {t("schedule.booked")}
          </Box>
        </Box>
        <Box mt={5}>
          {booked.map((booked_item, booked_index) => (
            <Box
              key={`book_time_${booked_index}`}
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <Box width="15%" textAlign="center">
                {booked_item.start} to {booked_item.end}
              </Box>
              <Box
                width="80%"
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={1}
              >
                {Array.from({
                  length: settings?.workstations as number,
                }).map((_, index) => (
                  <Box
                    key={`workstation_row_${booked_index}_item_${index}`}
                    width="15%"
                    height={45}
                    bgcolor={
                      booked[booked_index].workstation.some(
                        (obj) => obj.num === index
                      )
                        ? booked[booked_index].workstation.find(
                            (obj) => obj.num === index
                          )?.status === "pending"
                          ? "rgba(245, 153, 4, 0.4)"
                          : booked[booked_index].workstation.find(
                              (obj) => obj.num === index
                            )?.status === "confirming"
                          ? "rgba(150, 223, 74, 0.4)"
                          : "rgba(225, 71, 71, 0.4)"
                        : "rgba(76, 195, 102, 0.4)"
                    }
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => {
                      if (
                        booked[booked_index].workstation.some(
                          (obj) => obj.num === index
                        )
                      ) {
                        const sel = booked[booked_index].workstation.find(
                          (obj) => obj.num === index
                        );
                        if (sel?.status !== "booked") return;
                        for (let i in getTestdriveState.data) {
                          const testdrive = getTestdriveState.data[parseInt(i)];
                          let flag = false;
                          for (
                            let j = 0;
                            j < testdrive.time_rooms.length;
                            ++j
                          ) {
                            const frame = testdrive.time_rooms[j];
                            if (
                              frame.start === booked_item.start &&
                              frame.workstation === index
                            ) {
                              flag = true;
                              setRoomInfo({
                                time: booked_item.start,
                                workstation: index,
                                staff: testdrive.staff?.name,
                                client: (testdrive.type === "local"
                                  ? testdrive.client?.name
                                  : testdrive.client_name) as string,
                                company: (testdrive.type === "local"
                                  ? testdrive.client?.company
                                  : testdrive.company) as string,
                              });
                              break;
                            }
                          }
                          if (flag) break;
                        }
                        return;
                      }
                      setRoomInfo({
                        time: booked_item.start,
                        workstation: index,
                        staff: "",
                        client: "",
                        company: "",
                      });
                    }}
                  >
                    {String.fromCharCode("A".charCodeAt(0) + index)}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
      <TestDriveModal open={openTestdrive} setOpen={setOpenTestdrive} />
    </>
  );
};

export default SchedulePage;
