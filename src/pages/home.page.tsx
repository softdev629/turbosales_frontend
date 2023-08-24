import { Container, Box, Typography, Button, Stack } from "@mui/material";

import Header from "../components/Header";

import { ReactComponent as NewClientIcon } from "../assets/images/ico_new_client.svg";
import { ReactComponent as PitchIcon } from "../assets/images/ico_pitch.svg";
import { ReactComponent as TestDriveIcon } from "../assets/images/ico_test_drive.svg";
import { ReactComponent as SoldIcon } from "../assets/images/ico_sold.svg";
import { ReactComponent as TrainingIcon } from "../assets/images/ico_training.svg";
import { ReactComponent as ScheduleIcon } from "../assets/images/ico_schedule.svg";
import { ReactComponent as CommissionIcon } from "../assets/images/ico_commisions.svg";
import { ReactComponent as ClientsIcon } from "../assets/images/ico_clients.svg";
import Footer from "../components/Footer";
import { useState } from "react";
import NewClientModal from "../components/modals/newclient.modal";
import PitchModal from "../components/modals/pitch.modal";

const HomePage = () => {
  const [openNewClient, setOpenNewClient] = useState(false);
  const [openPitch, setOpenPitch] = useState(false);

  const actions = [
    {
      icon: <NewClientIcon width={48} height={48} fill="#ea2049" />,
      text: "New Client",
      click: () => {
        setOpenNewClient(true);
      },
    },
    {
      icon: <PitchIcon width={48} height={48} fill="#ea2049" />,
      text: "Pitch",
      click: () => {
        setOpenPitch(true);
      },
    },
    {
      icon: <TestDriveIcon width={48} height={48} fill="#ea2049" />,
      text: "Test Drive",
    },
    {
      icon: <SoldIcon width={48} height={48} fill="#ea2049" />,
      text: "Sold!",
    },
    {
      icon: <TrainingIcon width={48} height={48} fill="#ea2049" />,
      text: "Training",
    },
    {
      icon: <ScheduleIcon width={48} height={48} fill="#ea2049" />,
      text: "Schedule",
    },
    {
      icon: <CommissionIcon width={48} height={48} fill="#ea2049" />,
      text: "Commission",
    },
    {
      icon: <ClientsIcon width={48} height={48} fill="#ea2049" />,
      text: "Clients",
    },
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ p: { xs: 0 } }}>
        <Header />
        <Box
          sx={{
            borderBottomLeftRadius: { md: 40, xs: 0 },
            borderBottomRightRadius: { md: 40, xs: 0 },
            py: 2,
            bgcolor: "#ea2049",
          }}
        >
          <Typography color="white" variant="h5" textAlign="center">
            Let's sale! Select an action.
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
        <Footer />
      </Container>
      <Box>
        <NewClientModal setOpen={setOpenNewClient} open={openNewClient} />
        <PitchModal setOpen={setOpenPitch} open={openPitch} />
      </Box>
    </>
  );
};

export default HomePage;
