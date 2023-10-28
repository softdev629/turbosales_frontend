import {
  Container,
  Box,
  Link,
  Typography,
  SvgIcon,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as EditIcon } from "../../assets/images/ico_edit.svg";

const CenterProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ mt: 20 }}>
        <Box display="flex" justifyContent="end" mb={5}>
          <Link
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack /> {t("profile_client.back")}
          </Link>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box
              display="flex"
              flexWrap="wrap"
              gap={1}
              justifyContent={{ md: "space-between", xs: "center" }}
              mb={1}
            >
              <Typography color="primary.main" variant="h5">
                {t("profile_center.ai_center")}
              </Typography>
              <Box
                border="1px solid #D9D9D9"
                bgcolor="rgba(217, 217, 217, 0.2)"
                display="flex"
                gap={1}
                width={{ md: "30%", xs: "80%" }}
                justifyContent="center"
                py={1}
              >
                <Typography color="#999999">
                  {t("profile_center.level")}
                </Typography>
                <Typography color="primary.main" fontWeight={600}>
                  {t("profile_center.silver")}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.ai_center_id")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                33-1-A01
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_center.subdomain")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                33-1-A01.savvi.centre
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_center.city_country")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Paris, France
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_center.franchise_license_expiration")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                2024-10-23
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_center.membership_packs_purchased")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                5
              </Typography>
            </Box>
          </Box>

          <Box
            width={{ md: "90%", xs: "100%" }}
            maxWidth={800}
            border="1px solid #D9D9D9"
            borderRadius={4}
            p={3}
            mt={1}
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
                  80
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  height: { md: 48, xs: 36 },
                  fontSize: { md: 18, xs: 12 },
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
              <Box bgcolor="#4CC366" width="80%" height="100%" />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={1}>
              {[0, 25, 50, 75, 100].map((item, index) => (
                <Typography key={`charge_num_${index}`}>{item}</Typography>
              ))}
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_center.managers")}
            </Typography>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="primary.main">
                {t("profile_center.owner_name")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Amy Adams
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.email")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                amy@amy.com
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.mobile")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                33 190454854850858
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="primary.main">
                {t("home.common.manager")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Amy Adams
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.email")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                amy@amy.com
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.mobile")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                33 190454854850858
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_center.address")}
            </Typography>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.address")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Taylor Swift Road 23
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.city")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Paris
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.area_code_state")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                93300 Ille de. France
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("hq_clients.country")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                France
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_client.referral")}
            </Typography>
            <Box display="flex" gap={1}>
              <Typography color="#999999" width="35%">
                {t("profile_center.referred_to_by")}
              </Typography>
              <Typography width="50%">49-6-A04</Typography>
            </Box>
            <Typography color="primary.main" textAlign="center" mt={2}>
              {t("profile_center.referral_sentence_1")}
            </Typography>
            <Box>
              <Box
                bgcolor="rgba(217, 217, 217, 0.2)"
                gap={1}
                py={1}
                display="flex"
              >
                <Typography width="25%" textAlign="center" color="#595959">
                  {t("profile_center.role")}
                </Typography>
                <Typography width="15%" textAlign="center" color="#595959">
                  {t("profile_center.quantity")}
                </Typography>
                <Typography width="15%" textAlign="center" color="#595959">
                  {t("profile_center.membership")}
                </Typography>
                <Typography width="15%" textAlign="center" color="#595959">
                  {t("profile_center.centers")}
                </Typography>
                <Typography width="15%" textAlign="center" color="#595959">
                  {t("profile_client.training")}
                </Typography>
              </Box>
              <Box gap={1} py={1} display="flex">
                <Typography width="25%">
                  {t("profile_center.managers")}
                </Typography>
                <Typography width="15%" textAlign="center">
                  2
                </Typography>
                <Typography width="15%" textAlign="center">
                  5%
                </Typography>
                <Typography width="15%" textAlign="center">
                  5%
                </Typography>
                <Typography width="15%" textAlign="center">
                  NA
                </Typography>
              </Box>
              <Box gap={1} py={1} display="flex">
                <Typography width="25%">
                  {t("profile_center.sales_reps")}
                </Typography>
                <Typography width="15%" textAlign="center">
                  6
                </Typography>
                <Typography width="15%" textAlign="center">
                  €300
                </Typography>
                <Typography width="15%" textAlign="center">
                  5%
                </Typography>
                <Typography width="15%" textAlign="center">
                  NA
                </Typography>
              </Box>
              <Box gap={1} py={1} display="flex">
                <Typography width="25%">
                  {t("profile_center.resellers")}
                </Typography>
                <Typography width="15%" textAlign="center">
                  2
                </Typography>
                <Typography width="15%" textAlign="center">
                  €300
                </Typography>
                <Typography width="15%" textAlign="center">
                  5%
                </Typography>
                <Typography width="15%" textAlign="center">
                  €50
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_client.sales_funnel")}
            </Typography>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.pitch")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                2023-10-13
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.testdrive")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                2023-10-18
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.deal_signed")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                2023-10-24
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.training")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                2023-11-15, 2023-11-16, 2023-11-17
              </Typography>
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_client.purchases")}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>
                {t("profile_client.total_purchases")}
              </Typography>
              <Typography color="primary.main">€170,000.00</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2023-10-12</Typography>
              <Typography width="50%">Franchise Fee</Typography>
              <Typography width="30%" textAlign="right">
                €100,000.00
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2023-10-12</Typography>
              <Typography width="50%">Equipment</Typography>
              <Typography width="30%" textAlign="right">
                €10 ,000.00
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2024-11-12</Typography>
              <Typography width="50%">100 Membership Pack</Typography>
              <Typography width="30%" textAlign="right">
                €60 ,000.00
              </Typography>
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={{ md: 4, xs: 2 }}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_center.equipment")}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>
                {t("profile_center.total_workstations")}
              </Typography>
              <Typography color="primary.main">24</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2023-10-12</Typography>
              <Typography width="50%">AI Workstation</Typography>
              <Typography width="30%" textAlign="right">
                20
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2023-12-12</Typography>
              <Typography width="50%">AI Superstation</Typography>
              <Typography width="30%" textAlign="right">
                2
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2024-12-12</Typography>
              <Typography width="50%">AI Workstation</Typography>
              <Typography width="30%" textAlign="right">
                2
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" fontWeight={700}>
                Activation Codes
              </Typography>
              <Box width="50%">
                <Typography>34DHYT7989Hgfhdey89</Typography>
                <Typography>34DHYT7989Hgfhdey89</Typography>
                <Typography>34DHYT7989Hgfhdey89</Typography>
                <Typography>34DHYT7989Hgfhdey89</Typography>
                <Typography>34DHYT7989Hgfhdey89</Typography>
                <Typography>34DHYT7989Hgfhdey89</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CenterProfilePage;
