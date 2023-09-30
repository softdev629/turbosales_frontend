import { useState, useEffect } from "react";
import { Box, Typography, Container, Button, SvgIcon } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { ReactComponent as TestdriveIcon } from "../assets/images/ico_test_drive.svg";
import { ReactComponent as ClockIcon } from "../assets/images/ico_clock.svg";
import { ReactComponent as PCIcon } from "../assets/images/ico_pc.svg";

import { useLazyGetTestdriveByDateQuery } from "../redux/api/testdriveApi";
import { useLazyGetCenterSettingsQuery } from "../redux/api/centerApi";
import { useAppSelector } from "../redux/store";
import { divideIntervals, fromDayjsToDate } from "../util";
import TestDriveModal from "../components/modals/testdrive.modal";

const SchedulePage = () => {
  const { t } = useTranslation();

  const [openTestdrive, setOpenTestdrive] = useState(false);
  const [booked, setBooked] = useState<
    { start: string; end: string; workstation: number[] }[]
  >([]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [roomInfo, setRoomInfo] = useState<{
    time: string;
    workstation: number;
    staff: string;
    client: string;
    company: string;
  }>();

  const [getCenterSettings] = useLazyGetCenterSettingsQuery();
  const [getTestdriveByDate, getTestdriveState] =
    useLazyGetTestdriveByDateQuery();
  const settings = useAppSelector((state) => state.centerState.settings);

  useEffect(() => {
    getCenterSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getTestdriveState.isSuccess) {
      if (settings && date) {
        const testdrives = getTestdriveState.data;
        let booked_workstations: { [key: string]: number[] } = {};
        for (let i in testdrives) {
          for (let j in testdrives[i].time_rooms) {
            if (
              Object.keys(booked_workstations).includes(
                testdrives[i].time_rooms[j].start
              )
            ) {
              booked_workstations[testdrives[i].time_rooms[j].start].push(
                testdrives[i].time_rooms[j].workstation
              );
            } else {
              booked_workstations[testdrives[i].time_rooms[j].start] = [
                testdrives[i].time_rooms[j].workstation,
              ];
            }
          }
        }
        const intervals = divideIntervals(
          settings.operating_hours[(date.day() + 6) % 7].start,
          settings.operating_hours[(date.day() + 6) % 7].end,
          settings.workstation_duration
        );
        let tempArray: { start: string; end: string; workstation: number[] }[] =
          [];
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
          sx={{ display: "flex", justifyContent: "space-between", py: 4 }}
        >
          <Box
            width="60%"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
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
          </Box>
          <Box
            width="35%"
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
      <Container sx={{ mt: 45, minHeight: 400 }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <Typography>LEGEND</Typography>
          <Box
            width="10%"
            height={35}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(76, 195, 102, 0.4)"
            borderRadius={2}
          >
            FREE
          </Box>
          <Box
            width="10%"
            height={35}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(225, 71, 71, 0.4)"
            borderRadius={2}
          >
            Booked
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
                      booked[booked_index].workstation.includes(index)
                        ? "rgba(225, 71, 71, 0.4)"
                        : "rgba(76, 195, 102, 0.4)"
                    }
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => {
                      if (booked[booked_index].workstation.includes(index)) {
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
                                staff: testdrive.staff.name,
                                client: testdrive.client.name,
                                company: testdrive.client.company,
                              });
                              break;
                            }
                          }
                          if (flag) break;
                        }
                      } else {
                        setRoomInfo({
                          time: booked_item.start,
                          workstation: index,
                          staff: "",
                          client: "",
                          company: "",
                        });
                      }
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
