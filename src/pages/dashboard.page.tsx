import {
  Container,
  Box,
  Typography,
  SvgIcon,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ReactComponent as MembershipIcon } from "../assets/images/ico_membership.svg";
import { ReactComponent as FrenchiseIcon } from "../assets/images/ico_franchise.svg";
import { ReactComponent as MarketingIcon } from "../assets/images/ico_marketing.svg";
import MoneyBagIcon from "../assets/images/ico_moneybag.svg";
import { ReactComponent as MembersIcon } from "../assets/images/ico_members.svg";
import { ReactComponent as TestdriveIcon } from "../assets/images/ico_testdrive.svg";
import { ReactComponent as QuestionIcon } from "../assets/images/ico_question.svg";
import { ReactComponent as ContactIcon } from "../assets/images/ico_contact.svg";

import { useAppSelector } from "../redux/store";
import { useGetDashboardQuery } from "../redux/api/transactionApi";
import FullScreenLoader from "../components/FullscreenLoader";
import { formatNumber } from "../util";
import { useGetCenterInfoQuery } from "../redux/api/centerApi";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const user = useAppSelector((state) => state.userState.user);
  const { t } = useTranslation();
  const dashboardData = useGetDashboardQuery();
  const centerData = useGetCenterInfoQuery();
  const navigate = useNavigate();

  if (!dashboardData.data || !centerData.data) return <FullScreenLoader />;

  return (
    <>
      <Container
        sx={{
          mt: 20,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" alignItems="center" flexDirection="column">
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
              width="100%"
              alignItems="center"
            >
              <Typography color="white" width="40%" textAlign="right" pr={4}>
                {t("dashboard.center_id")}
              </Typography>
              <Typography variant="h5" color="white" width="40%">
                {user?.center_id}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              alignItems="center"
              mt={1}
            >
              <Typography color="white" width="40%" textAlign="right" pr={4}>
                {t("dashboard.level")}
              </Typography>
              <Typography variant="h5" color="white" width="40%">
                {centerData.data.level}
              </Typography>
            </Box>
          </Box>
          <Typography color="#E14747" maxWidth={500} textAlign="center" mt={3}>
            {t("dashboard.dashboard_tips")}
          </Typography>
        </Box>

        <Box
          border="1px solid #D9D9D9"
          mt={4}
          width={{ md: "80%", xs: "100%" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            bgcolor="rgba(217, 217, 217, 0.2)"
          >
            <Box width="10%"></Box>
            <Typography width="25%" variant="h5" color="primary.main">
              {t("dashboard.income")}
            </Typography>
            <Typography width="25%" textAlign="center">
              {t("dashboard.month")}
            </Typography>
            <Typography width="25%" textAlign="center">
              {t("dashboard.year")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 36 },
                  height: { md: 48, xs: 36 },
                }}
              >
                <MembershipIcon />
              </SvgIcon>
            </Box>
            <Box width="25%">
              <Typography
                width={{ md: 150, xs: 120 }}
                variant="h5"
                fontSize={{ md: 24, xs: 18 }}
              >
                {t("dashboard.membership_sales")}
              </Typography>
            </Box>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €{formatNumber(dashboardData.data.month_membership_sales)}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €{formatNumber(dashboardData.data.year_membership_sales)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 36 },
                  height: { md: 48, xs: 36 },
                }}
              >
                <FrenchiseIcon />
              </SvgIcon>
            </Box>

            <Box width="25%">
              <Typography
                width={{ md: 150, xs: 120 }}
                fontSize={{ md: 24, xs: 18 }}
              >
                {t("dashboard.ai_center_referrals")}
              </Typography>
            </Box>

            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €{formatNumber(dashboardData.data.month_ai_referral)}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €{formatNumber(dashboardData.data.year_ai_referral)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 36 },
                  height: { md: 48, xs: 36 },
                }}
              >
                <MarketingIcon />
              </SvgIcon>
            </Box>
            <Box width="25%">
              <Typography
                width={{ md: 150, xs: 120 }}
                fontSize={{ md: 24, xs: 18 }}
              >
                {t("hq_dashboard.tiktok_services.0")}
                <br />
                {t("hq_dashboard.tiktok_services.1")}
              </Typography>
            </Box>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €500K
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €750.7K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <Box
                component="img"
                src={MoneyBagIcon}
                width={{ md: 40, xs: 30 }}
                height={{ md: 40, xs: 30 }}
              />
            </Box>
            <Box width="25%">
              <Typography
                width={{ md: 150, xs: 100 }}
                fontSize={{ md: 24, xs: 18 }}
              >
                {t("dashboard.total_income")}
              </Typography>
            </Box>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €{formatNumber(dashboardData.data.month_total_income)}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 36, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €{formatNumber(dashboardData.data.year_total_income)}
            </Typography>
          </Box>
        </Box>

        <Box
          width={{ md: "90%", xs: "100%" }}
          maxWidth={800}
          border="1px solid #D9D9D9"
          borderRadius={4}
          p={3}
          mt={10}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" gap={2} alignItems="center">
              <Typography
                color="primary.main"
                variant="h5"
                width={150}
                textAlign="right"
              >
                {t("dashboard.membership_remaining")}:
              </Typography>
              <Typography color="primary.main" fontSize={{ md: 44, xs: 24 }}>
                {centerData.data.membership_remaining}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ height: { md: 48, xs: 36 }, fontSize: { md: 18, xs: 12 } }}
              onClick={() => {
                if (centerData.data?.subdomain)
                  window.location.href = `https://${centerData.data?.subdomain}`;
              }}
            >
              {t("dashboard.recharge")}
            </Button>
          </Box>
          <Box
            border="1px solid #999999"
            height={50}
            bgcolor="rgba(217, 217, 217, 0.5)"
            mt={4}
          >
            <Box
              bgcolor="#4CC366"
              width={`${centerData.data.membership_remaining}%`}
              height="100%"
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            {[0, 25, 50, 75, 100].map((item, index) => (
              <Typography key={`charge_num_${index}`}>{item}</Typography>
            ))}
          </Box>
        </Box>

        <Box bgcolor="primary.main" width="100%" mt={6}>
          <Stack direction="row" justifyContent="space-evenly" py={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <TestdriveIcon />
              </SvgIcon>
              <Typography variant="h4" color="white" mt={2}>
                {dashboardData.data.month_testdrives}
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.month")}
                <br />
                {t("home.testdrive")}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <MembersIcon />
              </SvgIcon>
              <Typography variant="h4" color="white" mt={2}>
                {dashboardData.data.total_members}
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.total_members.0")}
                <br />
                {t("hq_dashboard.total_members.1")}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <QuestionIcon />
              </SvgIcon>
              <Typography variant="h4" color="white" mt={2}>
                5,000
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.total_income.0")}
                <br />
                {t("commissions.leads")}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center" mt={4} width="100%">
          <Stack
            width={{ md: "70%", xs: "100%" }}
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={4}
            gap={2}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >
              <Typography color="primary.main" variant="h5">
                {t("dashboard.commissions")}
              </Typography>
              <Box display="flex" gap={8}>
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
                <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
                  <ContactIcon />
                </SvgIcon>
              </Box>
            </Box>
            <Box
              display="flex"
              bgcolor="rgba(217, 217, 217, 0.2)"
              textAlign="center"
              py={1}
            >
              <Typography width="20%" sx={{ color: "#595959" }}>
                {t("dashboard.sales_date")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.common.company")}
              </Typography>
              <Typography width="20%" sx={{ color: "#595959" }}>
                {t("dashboard.referrer")}
              </Typography>
              <Typography
                width="20%"
                sx={{ color: "#595959" }}
                textAlign="right"
              >
                {t("home.sold_modal.amount")}
              </Typography>
              <Typography width="15%" sx={{ color: "#595959" }}>
                {t("dashboard.paid")}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="20%" color="primary.main">
                2023-02-13
              </Typography>
              <Typography width="25%" textAlign="center">
                ABC
              </Typography>
              <Typography width="20%" textAlign="center">
                Amy Adams
              </Typography>
              <Typography width="20%" textAlign="right">
                €300
              </Typography>
              <Box width="15%" textAlign="right">
                <Checkbox sx={{ p: 0 }} defaultChecked />
              </Box>
            </Box>
            <Box display="flex">
              <Typography width="20%" color="primary.main">
                2023-02-14
              </Typography>
              <Typography width="25%" textAlign="center">
                DEF
              </Typography>
              <Typography width="20%" textAlign="center">
                Barry. Brad
              </Typography>
              <Typography width="20%" textAlign="right">
                €3,000
              </Typography>
              <Box width="15%" textAlign="right">
                <Checkbox sx={{ p: 0 }} defaultChecked />
              </Box>
            </Box>
            <Box display="flex">
              <Typography width="20%" color="primary.main">
                2023-03-15
              </Typography>
              <Typography width="25%" textAlign="center">
                GHI
              </Typography>
              <Typography width="20%" textAlign="center">
                Cindy Craw
              </Typography>
              <Typography width="20%" textAlign="right">
                €300
              </Typography>
              <Box width="15%" textAlign="right">
                <Checkbox sx={{ p: 0 }} defaultChecked />
              </Box>
            </Box>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center" width="100%" mt={4}>
          <Stack
            width={{ md: "70%", xs: "100%" }}
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={4}
            gap={2}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >
              <Typography color="primary.main" variant="h5">
                {t("dashboard.marketing_services_big")}
              </Typography>
              <Box display="flex" gap={8}>
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
                <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
                  <ContactIcon />
                </SvgIcon>
              </Box>
            </Box>
            <Box display="flex">
              <Typography>{t("dashboard.memebers_in_tiktok")}</Typography>
              <Typography color="primary.main" variant="h5" ml={3}>
                500
              </Typography>
              <Typography color="primary.main" variant="h5" ml={3}>
                33%
              </Typography>
            </Box>
            <Box display="flex">
              <Typography>
                {t("dashboard.latest_tiktok_ad_spending_commissions")}
              </Typography>
              <Typography color="primary.main" variant="h5" ml={3}>
                1.3%
              </Typography>
            </Box>
            <Box
              display="flex"
              bgcolor="rgba(217, 217, 217, 0.2)"
              textAlign="center"
              py={1}
            >
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("dashboard.sales_date")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.common.company")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("dashboard.service")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.testdrive")}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                ABC
              </Typography>
              <Typography width="25%" textAlign="center">
                Amy Adams
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-13
              </Typography>
              <Typography width="25%" textAlign="right">
                2023-02-21
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                DEF
              </Typography>
              <Typography width="25%" textAlign="center">
                Barry. Brad
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-14
              </Typography>
              <Typography width="25%" textAlign="right">
                Not yet
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                GHI
              </Typography>
              <Typography width="25%" textAlign="center">
                Cindy Craw
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-03-15
              </Typography>
              <Typography width="25%" textAlign="right">
                2023-03-18
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center" width="100%" mt={4}>
          <Stack
            width={{ md: "70%", xs: "100%" }}
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={4}
            gap={2}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >
              <Typography color="primary.main" variant="h5">
                {t("dashboard.leads")}
              </Typography>
              <Box display="flex" gap={8}>
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
                <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
                  <ContactIcon />
                </SvgIcon>
              </Box>
            </Box>
            <Box
              display="flex"
              bgcolor="rgba(217, 217, 217, 0.2)"
              textAlign="center"
              py={1}
            >
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.common.company")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("contact.title")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("dashboard.referrer")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.testdrive")}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                ABC
              </Typography>
              <Typography width="25%" textAlign="center">
                Amy Adams
              </Typography>
              <Typography width="25%" textAlign="center"></Typography>
              <Typography width="25%" textAlign="right">
                2023-02-21
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                DEF
              </Typography>
              <Typography width="25%" textAlign="center">
                Barry. Brad
              </Typography>
              <Typography width="25%" textAlign="center">
                ABC
              </Typography>
              <Typography width="25%" textAlign="right">
                Not yet
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                GHI
              </Typography>
              <Typography width="25%" textAlign="center">
                Cindy Craw
              </Typography>
              <Typography width="25%" textAlign="center">
                DEF
              </Typography>
              <Typography width="25%" textAlign="right">
                2023-03-18
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center" mt={4} width="100%">
          <Stack
            width={{ md: "70%", xs: "100%" }}
            border="1px solid #D9D9D9"
            borderRadius={5}
            p={4}
            gap={2}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >
              <Typography color="primary.main" variant="h5">
                {t("dashboard.members")}
              </Typography>
              <Box display="flex" gap={8}>
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
                <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
                  <ContactIcon />
                </SvgIcon>
              </Box>
            </Box>
            <Box
              display="flex"
              bgcolor="rgba(217, 217, 217, 0.2)"
              textAlign="center"
              py={1}
            >
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.common.company")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("commissions.expiration")}
              </Typography>
              <Typography width="25%" sx={{ color: "#595959" }}>
                {t("home.common.price")}
              </Typography>
              <Typography
                width="25%"
                sx={{ color: "#595959", overflowWrap: "break-word" }}
              >
                {t("header.commissions")}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                ABC
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-13
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
              >
                €2,000.00
              </Typography>
              <Typography
                width="25%"
                textAlign="right"
                sx={{ overflowWrap: "break-word" }}
              >
                €300.00
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                DEF
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-02-14
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
              >
                Not yet
              </Typography>
              <Typography
                width="25%"
                textAlign="right"
                sx={{ overflowWrap: "break-word" }}
              >
                NA
              </Typography>
            </Box>
            <Box display="flex">
              <Typography width="25%" color="primary.main">
                GHI
              </Typography>
              <Typography width="25%" textAlign="center">
                2023-03-15
              </Typography>
              <Typography
                width="25%"
                textAlign="center"
                sx={{ overflowWrap: "break-word" }}
              >
                €60,000.00
              </Typography>
              <Typography
                width="25%"
                textAlign="right"
                sx={{ overflowWrap: "break-word" }}
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

export default DashboardPage;
