import { Container, Box, Typography, SvgIcon, Stack } from "@mui/material";
import { useAppSelector } from "../redux/store";

import { ReactComponent as PitchesModeIcon } from "../assets/images/ico_pitchesmode.svg";
import { ReactComponent as MoneyUnitIcon } from "../assets/images/ico_moneyunit.svg";
import MoneyBagIcon from "../assets/images/ico_moneybag.svg";
import { ReactComponent as MembersPaidIcon } from "../assets/images/ico_memeberspaid.svg";
import { ReactComponent as ContactIcon } from "../assets/images/ico_contact.svg";

const CommissionsPage = () => {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="center">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            maxWidth={500}
            sx={{
              backgroundImage:
                "linear-gradient(90deg, rgb(234, 32, 73) 29.00%,rgb(244, 128, 7) 100.00%);",
            }}
            p={2}
            borderRadius={4}
          >
            <Box
              display="flex"
              justifyContent="center"
              gap={5}
              width="100%"
              alignItems="center"
            >
              <Typography color="white">
                {user?.role === "manager"
                  ? "Manager"
                  : user?.role === "sales_rep"
                  ? "Sales Rep"
                  : "Instructor"}
              </Typography>
              <Typography variant="h5" color="white">
                {user?.name}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              gap={5}
              width="100%"
              alignItems="center"
              mt={3}
            >
              <Typography color="white">Referal link</Typography>
              <Typography variant="h5" color="white">
                {user?.center_id}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-evenly" my={10}>
          <Box textAlign="center">
            <SvgIcon sx={{ fill: "#ea2049", height: 48, width: 48 }}>
              <MoneyUnitIcon />
            </SvgIcon>
            <Typography color="primary.main" variant="h4" fontWeight={700}>
              €1,000
            </Typography>
            <Typography>
              Upcoming
              <br />
              Commissions
            </Typography>
          </Box>
          <Box textAlign="center">
            <Box
              component="img"
              src={MoneyBagIcon}
              alt="MoneyBag"
              width={48}
              height={48}
            />
            <Typography color="primary.main" variant="h4" fontWeight={700}>
              €10,000
            </Typography>
            <Typography>
              All-time
              <br />
              Commissions
            </Typography>
          </Box>
          <Box textAlign="center">
            <SvgIcon sx={{ fill: "#ea2049", height: 48, width: 48 }}>
              <PitchesModeIcon />
            </SvgIcon>
            <Typography color="primary.main" variant="h4" fontWeight={700}>
              500
            </Typography>
            <Typography>
              Pitches
              <br />
              Made
            </Typography>
          </Box>
          <Box textAlign="center">
            <SvgIcon sx={{ fill: "#ea2049", height: 48, width: 48 }}>
              <MembersPaidIcon />
            </SvgIcon>
            <Typography color="primary.main" variant="h4" fontWeight={700}>
              50
            </Typography>
            <Typography>
              Members
              <br />
              (Paid)
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Stack
            width="70%"
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={4}
            gap={2}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography color="primary.main" variant="h5">
                LEADS
              </Typography>
              <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
                <ContactIcon />
              </SvgIcon>
            </Box>
            <Box
              display="flex"
              bgcolor="rgba(217, 217, 217, 0.2)"
              textAlign="center"
              py={1}
            >
              <Typography width="25%" sx={{ color: "#595959" }}>
                Company
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                Contact
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                Pitch
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                Test Drive
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" sx={{ color: "#595959" }}>
                ABC
              </Typography>
              <Typography width="25%" textAlign="center">
                Amy Adams
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-13
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-21
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" sx={{ color: "#595959" }}>
                DEF
              </Typography>
              <Typography width="25%" textAlign="center">
                Barry. Brad
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-14
              </Typography>
              <Typography width="25%" textAlign="center">
                Not yet
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" sx={{ color: "#595959" }}>
                GHI
              </Typography>
              <Typography width="25%" textAlign="center">
                Cindy Craw
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-03-15
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-03-18
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Stack
            width="70%"
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={4}
            gap={2}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography color="primary.main" variant="h5">
                MEMBERS
              </Typography>
              <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
                <ContactIcon />
              </SvgIcon>
            </Box>
            <Box
              display="flex"
              bgcolor="rgba(217, 217, 217, 0.2)"
              textAlign="center"
              py={1}
            >
              <Typography width="25%" sx={{ color: "#595959" }}>
                Company
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                Expiration
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                Price
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                Commissions
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" sx={{ color: "#595959" }}>
                ABC
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-13
              </Typography>
              <Typography width="25%" textAlign="center">
                €2,000.00
              </Typography>
              <Typography width="25%" textAlign="center">
                €300.00
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" sx={{ color: "#595959" }}>
                DEF
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-14
              </Typography>
              <Typography width="25%" textAlign="center">
                Not yet
              </Typography>
              <Typography width="25%" textAlign="center">
                NA
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" sx={{ color: "#595959" }}>
                GHI
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-03-15
              </Typography>
              <Typography width="25%" textAlign="center">
                €60,000.00
              </Typography>
              <Typography width="25%" textAlign="center">
                €3,000.00
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default CommissionsPage;