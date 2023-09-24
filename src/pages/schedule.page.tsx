import { useState } from "react";
import { Box, Typography, Container, Button, SvgIcon } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

import { ReactComponent as TestdriveIcon } from "../assets/images/ico_test_drive.svg";
import { ReactComponent as ClockIcon } from "../assets/images/ico_clock.svg";
import { ReactComponent as PCIcon } from "../assets/images/ico_pc.svg";

const SchedulePage = () => {
  const [date, setDate] = useState<Dayjs | null>();

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between" py={4}>
          <Box
            width="60%"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Button
              sx={{ width: 96, height: 96, borderRadius: 6 }}
              variant="outlined"
            >
              <SvgIcon sx={{ width: 48, height: 48 }}>
                <TestdriveIcon />
              </SvgIcon>
            </Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Book date picker"
                  value={date}
                  onChange={(value) => setDate(value)}
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
                3:30
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
                Room A
              </Typography>
            </Box>
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="#595959"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                STAFF
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                Amy Adams
              </Typography>
            </Box>
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="#595959"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                CLIENT
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                Barry Bard
              </Typography>
            </Box>
            <Box display="flex" mb={1} justifyContent="space-between">
              <Typography
                color="#595959"
                sx={{ display: "flex", alignItems: "center" }}
                width="30%"
              >
                COMPANY
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                width="60%"
              >
                Amy ABC, Inc
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SchedulePage;
