import { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Stack } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as NewClientIcon } from "../assets/images/ico_new_client.svg";
// import { ReactComponent as PitchIcon } from "../assets/images/ico_pitch.svg";
import { ReactComponent as TestDriveIcon } from "../assets/images/ico_test_drive.svg";
import { ReactComponent as SoldIcon } from "../assets/images/ico_sold.svg";
// import { ReactComponent as TrainingIcon } from "../assets/images/ico_training.svg";
import { ReactComponent as ScheduleIcon } from "../assets/images/ico_schedule.svg";
import { ReactComponent as CommissionIcon } from "../assets/images/ico_commisions.svg";
import { ReactComponent as ClientsIcon } from "../assets/images/ico_clients.svg";

import ClientModal from "../components/modals/client.modal";
// import PitchModal from "../components/modals/pitch.modal";
import TestDriveModal from "../components/modals/testdrive.modal";
import SoldModal from "../components/modals/sold.modal";
import TrainingModal from "../components/modals/training.modal";
import { useAppSelector } from "../redux/store";
import { useLazyGetCenterSettingsQuery } from "../redux/api/centerApi";

const HomePage = () => {
  const { t } = useTranslation();

  const [openNewClient, setOpenNewClient] = useState(false);
  // const [openPitch, setOpenPitch] = useState(false);
  const [openTestDrive, setOpenTestDrive] = useState(false);
  const [openSold, setOpenSold] = useState(false);
  const [openTraining, setOpenTraining] = useState(false);

  const user = useAppSelector((state) => state.userState.user);
  const navigate = useNavigate();

  const [getCenterSettings] = useLazyGetCenterSettingsQuery();

  useEffect(() => {
    getCenterSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenTestDrive]);

  const actions = [
    {
      icon: <NewClientIcon width={48} height={48} fill="#ea2049" />,
      text: t("home.new_client") as string,
      click: () => {
        setOpenNewClient(true);
      },
    },
    // {
    //   icon: <PitchIcon width={48} height={48} fill="#ea2049" />,
    //   text: "Pitch",
    //   click: () => {
    //     setOpenPitch(true);
    //   },
    // },
    {
      icon: <TestDriveIcon width={48} height={48} fill="#ea2049" />,
      text: t("home.testdrive"),
      click: () => {
        setOpenTestDrive(true);
      },
    },
    {
      icon: <SoldIcon width={48} height={48} fill="#ea2049" />,
      text: t("home.sold"),
      click: () => {
        setOpenSold(true);
      },
    },
    // {
    //   icon: <TrainingIcon width={48} height={48} fill="#ea2049" />,
    //   text: "Training",
    //   click: () => {
    //     setOpenTraining(true);
    //   },
    // },
    {
      icon: <ScheduleIcon width={48} height={48} fill="#ea2049" />,
      text: t("header.schedule"),
      click: () => {
        navigate("/schedule");
      },
    },
    {
      icon: <CommissionIcon width={48} height={48} fill="#ea2049" />,
      text: t("home.commission"),
      click: () => {
        navigate("/commissions");
      },
    },
    {
      icon: <ClientsIcon width={48} height={48} fill="#ea2049" />,
      text: t("home.clients"),
      click: () => {
        navigate("/my_clients");
      },
    },
  ];

  if (user?.role === "admin") return <Navigate to="/admin/hq_dashboard" />;

  return (
    <>
      <Container maxWidth="xl" sx={{ p: { xs: 0 } }}>
        <Box
          sx={{
            borderBottomLeftRadius: { md: 40, xs: 0 },
            borderBottomRightRadius: { md: 40, xs: 0 },
            py: 2,
            bgcolor: "#ea2049",
          }}
        >
          <Typography color="white" variant="h5" textAlign="center">
            {t("home.slogan")}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack
            width={{ md: "60%", xs: "100%" }}
            flexDirection="row"
            p={3}
            mt={4}
            gap={3}
            alignItems="flex-start"
            justifyContent="center"
            flexWrap="wrap"
          >
            {actions.map((action, index) => (
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  border: "1px solid #999",
                  borderRadius: "20px",
                  p: 2,
                  width: { md: 192, xs: "40%" },
                }}
                key={`action_item_${index}`}
                onClick={action.click}
              >
                <Stack alignItems="center">
                  <Box my={2}>{action.icon}</Box>
                  {action.text}
                </Stack>
              </Button>
            ))}
          </Stack>
        </Box>
      </Container>
      <Box>
        <ClientModal setOpen={setOpenNewClient} open={openNewClient} />
        {/* <PitchModal setOpen={setOpenPitch} open={openPitch} /> */}
        <TestDriveModal setOpen={setOpenTestDrive} open={openTestDrive} />
        <SoldModal setOpen={setOpenSold} open={openSold} />
        <TrainingModal setOpen={setOpenTraining} open={openTraining} />
      </Box>
    </>
  );
};

export default HomePage;
