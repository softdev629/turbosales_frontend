import { Container, Box, Typography, SvgIcon, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ReactComponent as PitchesModeIcon } from "../assets/images/ico_pitchesmode.svg";
import { ReactComponent as MoneyUnitIcon } from "../assets/images/ico_moneyunit.svg";
import MoneyBagIcon from "../assets/images/ico_moneybag.svg";
import { ReactComponent as MembersPaidIcon } from "../assets/images/ico_memeberspaid.svg";
import { ReactComponent as ContactIcon } from "../assets/images/ico_contact.svg";

import { useAppSelector } from "../redux/store";

const CommissionsPage = () => {
  const user = useAppSelector((state) => state.userState.user);
  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ mt: 20 }}>
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
                  ? t("home.common.manager")
                  : user?.role === "sales_rep"
                  ? t("home.common.sales_rep")
                  : t("home.common.instructor")}
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
              mt={1}
            >
              <Typography color="white">
                {t("commissions.referal_link")}
              </Typography>
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
            <Typography
              color="primary.main"
              fontWeight={700}
              fontSize={{ md: 32, xs: 18 }}
            >
              €1,000
            </Typography>
            <Typography>
              {t("commissions.upcoming_commissions.0")}
              <br />
              {t("commissions.upcoming_commissions.1")}
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
            <Typography
              color="primary.main"
              fontSize={{ md: 32, xs: 18 }}
              fontWeight={700}
            >
              €10,000
            </Typography>
            <Typography>
              {t("commissions.all_time_commissions.0")}
              <br />
              {t("commissions.all_time_commissions.1")}
            </Typography>
          </Box>
          <Box textAlign="center">
            <SvgIcon sx={{ fill: "#ea2049", height: 48, width: 48 }}>
              <PitchesModeIcon />
            </SvgIcon>
            <Typography
              color="primary.main"
              fontSize={{ md: 32, xs: 18 }}
              fontWeight={700}
            >
              500
            </Typography>
            <Typography>
              {t("commissions.testdrives_made.0")}
              <br />
              {t("commissions.testdrives_made.1")}
            </Typography>
          </Box>
          <Box textAlign="center">
            <SvgIcon sx={{ fill: "#ea2049", height: 48, width: 48 }}>
              <MembersPaidIcon />
            </SvgIcon>
            <Typography
              color="primary.main"
              fontSize={{ md: 32, xs: 18 }}
              fontWeight={700}
            >
              50
            </Typography>
            <Typography>
              {t("commissions.members_paid.0")}
              <br />({t("commissions.members_paid.1")})
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Stack
            width={{ md: "70%", xs: "100%" }}
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={{ md: 4, xs: 2 }}
            gap={2}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography color="primary.main" variant="h5">
                {t("dashboard.leads")}
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
              <Typography
                width="33%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                {t("home.common.company")}
              </Typography>
              <Typography
                width="33%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                {t("contact.title")}
              </Typography>
              <Typography
                width="33%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                {t("home.testdrive")}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="33%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                ABC
              </Typography>
              <Typography
                width="33%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                Amy Adams
              </Typography>
              <Typography
                width="33%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                2023-02-21
              </Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="33%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                DEF
              </Typography>
              <Typography
                width="33%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                Barry. Brad
              </Typography>
              <Typography
                width="33%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              ></Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="33%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                GHI
              </Typography>
              <Typography
                width="33%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                Cindy Craw
              </Typography>
              <Typography
                width="33%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                2023-03-18
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Stack
            width={{ md: "70%", xs: "100%" }}
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={{ md: 4, xs: 2 }}
            gap={2}
          >
            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Typography color="primary.main" variant="h5">
                {t("dashboard.members")}
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
              <Typography
                width="25%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                {t("home.common.company")}
              </Typography>
              <Typography
                width="25%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                {t("commissions.expiration")}
              </Typography>
              <Typography
                width="20%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                {t("my_clients.purchases")}
              </Typography>
              <Typography
                width="30%"
                fontSize={{ md: 18, xs: 12 }}
                sx={{ color: "#595959", overflowWrap: "break-word" }}
              >
                {t("header.commissions")}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="25%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                ABC
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                2023-02-13
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                €2,000.00
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                €300.00
              </Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="25%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                DEF
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                2023-02-14
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                Not yet
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                NA
              </Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="25%"
                sx={{ color: "#595959" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                GHI
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                fontSize={{ md: 18, xs: 12 }}
              >
                2023-03-15
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
                fontSize={{ md: 18, xs: 12 }}
              >
                €60,000.00
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
                fontSize={{ md: 18, xs: 12 }}
              >
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
