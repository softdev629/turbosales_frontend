import {
  Container,
  Box,
  Typography,
  Stack,
  SvgIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ReactComponent as BoxIcon } from "../../assets/images/ico_box.svg";
import WhiteMoneyBagIcon from "../../assets/images/ico_white_money_bag.svg";
import { ReactComponent as MembersIcon } from "../../assets/images/ico_members.svg";
import { ReactComponent as MoneyIcon } from "../../assets/images/ico_money.svg";
import { ReactComponent as MembershipIcon } from "../../assets/images/ico_membership.svg";
import { ReactComponent as FrenchiseIcon } from "../../assets/images/ico_franchise.svg";
import { ReactComponent as MarketingIcon } from "../../assets/images/ico_marketing.svg";
// import { ReactComponent as GiftIcon } from "../../assets/images/ico_gift.svg";
// import MoneyBagIcon from "../../assets/images/ico_moneybag.svg";
import { ReactComponent as ContactIcon } from "../../assets/images/ico_contact.svg";
import { useGetHQDashboardQuery } from "../../redux/api/transactionApi";
import FullScreenLoader from "../../components/FullscreenLoader";
import { formatNumber } from "../../util";

const HQDashboardPage = () => {
  const { t } = useTranslation();
  const stats = useGetHQDashboardQuery();

  if (!stats.data || stats.isLoading) return <FullScreenLoader />;

  return (
    <>
      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          mt: 20,
        }}
      >
        <Box bgcolor="primary.main" width="100%">
          <Typography textAlign="center" color="#D9D9D9" variant="h5" py={4}>
            {t("hq_dashboard.year_stats")}
          </Typography>
          <Stack direction="row" justifyContent="space-evenly" pb={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <BoxIcon />
              </SvgIcon>
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                {stats.data.aiCenters}
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.ai_centers.0")}
                <br />
                {t("hq_dashboard.ai_centers.1")}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                component="img"
                src={WhiteMoneyBagIcon}
                width={40}
                height={40}
              />
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                €{formatNumber(stats.data.totalIncome)}
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.total_income.0")}
                <br />
                {t("hq_dashboard.total_income.1")}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <MembersIcon />
              </SvgIcon>
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                {formatNumber(stats.data.totalMembers)}
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.total_members.0")}
                <br />
                {t("hq_dashboard.total_members.1")}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <MoneyIcon />
              </SvgIcon>
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                €{formatNumber(stats.data.gmv)}
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                {t("hq_dashboard.gmv")}
              </Typography>
            </Box>
          </Stack>
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
              {t("hq_dashboard.income")}
            </Typography>
            <Typography width="25%" textAlign="center">
              {t("hq_dashboard.month")}
            </Typography>
            <Typography width="25%" textAlign="center">
              {t("hq_dashboard.year")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 32 },
                  height: { md: 48, xs: 32 },
                }}
              >
                <MembershipIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" fontSize={{ md: 24, xs: 18 }}>
              {t("hq_dashboard.membership_packs.0")}
              <br />
              {t("hq_dashboard.membership_packs.1")}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €2K
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €10K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 32 },
                  height: { md: 48, xs: 32 },
                }}
              >
                <FrenchiseIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" fontSize={{ md: 24, xs: 18 }}>
              {t("hq_dashboard.franchise_starter_kits.0")}
              <br />
              {t("hq_dashboard.franchise_starter_kits.1")}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €10K
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €100.3K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 32 },
                  height: { md: 48, xs: 32 },
                }}
              >
                <MarketingIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" fontSize={{ md: 24, xs: 18 }}>
              {t("hq_dashboard.tiktok_services.0")}
              <br />
              {t("hq_dashboard.tiktok_services.1")}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €500K
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €750.7K
            </Typography>
          </Box>
          {/* <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon
                sx={{
                  fill: "#ea2049",
                  width: { md: 48, xs: 32 },
                  height: { md: 48, xs: 32 },
                }}
              >
                <GiftIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" fontSize={{ md: 24, xs: 18 }}>
              International
              <br />
              Sales
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €500K
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €750.7K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <Box component="img" src={MoneyBagIcon} width={40} height={40} />
            </Box>
            <Typography width="25%" fontSize={{ md: 24, xs: 18 }}>
              Membership
              <br />
              Packs
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €2K
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 32, xs: 24 }}
              color="primary.main"
              textAlign="center"
            >
              €10K
            </Typography>
          </Box> */}
        </Box>

        <Box
          width={{ md: "70%", xs: "100%" }}
          border="1px solid #D9D9D9"
          borderRadius={4}
          mt={6}
          p={{ md: 3, xs: 1 }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Typography variant="h5" color="primary.main" flexGrow={1}>
              {t("dashboard.commissions")}
            </Typography>
            <Box width={192} mr={7}>
              <FormControl fullWidth>
                <InputLabel id="client-name-label" size="small">
                  {t("hq_dashboard.ai_center")}
                </InputLabel>
                <Select
                  labelId="client-name-label"
                  id="client-name-select"
                  label="AI Center"
                  size="small"
                  defaultValue=""
                >
                  <MenuItem value={10}>Sales Rep 1</MenuItem>
                  <MenuItem value={20}>Sales Rep 2</MenuItem>
                  <MenuItem value={30}>Instructor 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
              <ContactIcon />
            </SvgIcon>
          </Box>
          <Box
            display="flex"
            textAlign="center"
            bgcolor="rgba(217, 217, 217, 0.2)"
            py={1}
            mt={2}
          >
            <Typography width="20%" fontSize={{ md: 18, xs: 12 }}>
              {t("dashboard.sales_date")}
            </Typography>
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("home.common.company")}
            </Typography>
            <Typography width="20%" fontSize={{ md: 18, xs: 12 }}>
              {t("hq_dashboard.ai_center")}
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              {t("home.sold_modal.amount")}
            </Typography>
            <Typography fontSize={{ md: 18, xs: 12 }} width="15%">
              {t("dashboard.paid")}
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-02-13
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              ABC
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Amy Adams
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
            <Typography width="15%" textAlign="center">
              <Checkbox
                defaultChecked
                sx={{ "&.MuiCheckbox-root": { p: 0 } }}
              />
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-02-14
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              DEF
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Barry Bard
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €3,000
            </Typography>
            <Typography width="15%" textAlign="center">
              <Checkbox
                defaultChecked
                sx={{ "&.MuiCheckbox-root": { p: 0 } }}
              />
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-03-15
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              GHI
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Cindy Craw
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
            <Typography
              width="15%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              <Checkbox
                defaultChecked
                sx={{ "&.MuiCheckbox-root": { p: 0 } }}
              />
            </Typography>
          </Box>
        </Box>

        <Box
          width={{ md: "70%", xs: "100%" }}
          border="1px solid #D9D9D9"
          borderRadius={4}
          mt={6}
          p={{ md: 3, xs: 1 }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Typography variant="h5" color="primary.main" flexGrow={1}>
              {t("dashboard.marketing_services_big")}
            </Typography>
            <Box width={192} mr={7}>
              <FormControl fullWidth>
                <InputLabel id="client-name-label" size="small">
                  {t("hq_dashboard.ai_center")}
                </InputLabel>
                <Select
                  labelId="client-name-label"
                  id="client-name-select"
                  label="AI Center"
                  size="small"
                  defaultValue=""
                >
                  <MenuItem value={10}>Sales Rep 1</MenuItem>
                  <MenuItem value={20}>Sales Rep 2</MenuItem>
                  <MenuItem value={30}>Instructor 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
              <ContactIcon />
            </SvgIcon>
          </Box>
          <Box
            display="flex"
            textAlign="center"
            bgcolor="rgba(217, 217, 217, 0.2)"
            py={1}
            mt={2}
          >
            <Typography width="20%" fontSize={{ md: 18, xs: 12 }}>
              {t("home.testdrive_modal.date")}
            </Typography>
            <Typography width="20%" fontSize={{ md: 18, xs: 12 }}>
              {t("home.common.company")}
            </Typography>
            <Typography width="20%" fontSize={{ md: 18, xs: 12 }}>
              {t("dashboard.service")}
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              {t("home.sold_modal.amount")}
            </Typography>
            <Typography
              width="20%"
              textAlign="right"
              fontSize={{ md: 18, xs: 12 }}
            >
              {t("hq_dashboard.income")}
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-02-13
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              ABC
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              TikTok Ads
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-02-14
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              DEF
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Xiao Hong Shu
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €3,000
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €3,000
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-03-15
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              GHI
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              TikTok Ads
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
            <Typography
              width="20%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
          </Box>
        </Box>

        <Box
          width={{ md: "70%", xs: "100%" }}
          border="1px solid #D9D9D9"
          borderRadius={4}
          mt={6}
          p={{ md: 3, xs: 1 }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Typography variant="h5" color="primary.main" flexGrow={1}>
              {t("hq_dashboard.international_sales")}
            </Typography>
            <Box width={192} mr={7}>
              <FormControl fullWidth>
                <InputLabel id="client-name-label" size="small">
                  {t("hq_dashboard.ai_center")}
                </InputLabel>
                <Select
                  labelId="client-name-label"
                  id="client-name-select"
                  label="AI Center"
                  size="small"
                  defaultValue=""
                >
                  <MenuItem value={10}>Sales Rep 1</MenuItem>
                  <MenuItem value={20}>Sales Rep 2</MenuItem>
                  <MenuItem value={30}>Instructor 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
              <ContactIcon />
            </SvgIcon>
          </Box>
          <Box
            display="flex"
            textAlign="center"
            bgcolor="rgba(217, 217, 217, 0.2)"
            py={1}
            mt={2}
          >
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("dashboard.sales_date")}
            </Typography>
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("home.common.company")}
            </Typography>
            <Typography
              width="25%"
              textAlign="right"
              fontSize={{ md: 18, xs: 12 }}
            >
              {t("home.sold_modal.amount")}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              {t("hq_dashboard.income")}
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-02-13
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              ABC
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €3,000
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-02-14
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              DEF
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300,000
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €3,000
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              2023-03-15
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              GHI
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €30,000
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300
            </Typography>
          </Box>
        </Box>

        <Box
          width={{ md: "70%", xs: "100%" }}
          border="1px solid #D9D9D9"
          borderRadius={4}
          mt={6}
          p={{ md: 3, xs: 1 }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Typography variant="h5" color="primary.main" flexGrow={1}>
              {t("hq_dashboard.ai_centers_big")}
            </Typography>
            <Box width={192} mr={7}>
              <FormControl fullWidth>
                <InputLabel id="client-name-label" size="small">
                  {t("hq_dashboard.ai_center")}
                </InputLabel>
                <Select
                  labelId="client-name-label"
                  id="client-name-select"
                  label="AI Center"
                  size="small"
                  defaultValue=""
                >
                  <MenuItem value={10}>Sales Rep 1</MenuItem>
                  <MenuItem value={20}>Sales Rep 2</MenuItem>
                  <MenuItem value={30}>Instructor 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
              <ContactIcon />
            </SvgIcon>
          </Box>
          <Box
            display="flex"
            textAlign="center"
            bgcolor="rgba(217, 217, 217, 0.2)"
            py={1}
            mt={2}
          >
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("hq_clients.center")}
            </Typography>
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("contact.title")}
            </Typography>
            <Typography
              width="25%"
              textAlign="right"
              fontSize={{ md: 18, xs: 12 }}
            >
              {t("hq_dashboard.members")}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              {t("hq_dashboard.sales")}
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              ABC
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Amy Adams
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              2023-02-13
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              2023-02-21
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              DEF
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Barry. Brad
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              2023-02-14
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              Not yet
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              GHI
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              Cindy Craw
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              2023-03-15
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              2023-03-18
            </Typography>
          </Box>
        </Box>

        <Box
          width={{ md: "70%", xs: "100%" }}
          border="1px solid #D9D9D9"
          borderRadius={4}
          mt={6}
          p={{ md: 3, xs: 1 }}
        >
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Typography variant="h5" color="primary.main" flexGrow={1}>
              {t("dashboard.members")}
            </Typography>
            <Box width={{ md: "30%", xs: "40%" }} mr={7}>
              <TextField fullWidth size="small" label="Search" />
            </Box>
            <Box width={192} mr={7}>
              <FormControl fullWidth>
                <InputLabel id="client-name-label" size="small">
                  {t("hq_dashboard.ai_center")}
                </InputLabel>
                <Select
                  labelId="client-name-label"
                  id="client-name-select"
                  label="AI Center"
                  size="small"
                  defaultValue=""
                >
                  <MenuItem value={10}>Sales Rep 1</MenuItem>
                  <MenuItem value={20}>Sales Rep 2</MenuItem>
                  <MenuItem value={30}>Instructor 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <SvgIcon sx={{ fill: "#ea2049", width: 30, height: 35 }}>
              <ContactIcon />
            </SvgIcon>
          </Box>
          <Box
            display="flex"
            textAlign="center"
            bgcolor="rgba(217, 217, 217, 0.2)"
            py={1}
            mt={2}
          >
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("home.common.company")}
            </Typography>
            <Typography width="25%" fontSize={{ md: 18, xs: 12 }}>
              {t("commissions.expiration")}
            </Typography>
            <Typography
              width="25%"
              textAlign="right"
              fontSize={{ md: 18, xs: 12 }}
            >
              {t("home.common.price")}
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              {t("header.commissions")}
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              ABC
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              2023-02-13
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €2,000.00
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300.00
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              DEF
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              2023-02-14
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              Not yet
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              NA
            </Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              color="primary.main"
            >
              GHI
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="center"
            >
              2023-03-15
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €2,000.00
            </Typography>
            <Typography
              width="25%"
              fontSize={{ md: 18, xs: 12 }}
              textAlign="right"
            >
              €300.00
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HQDashboardPage;
