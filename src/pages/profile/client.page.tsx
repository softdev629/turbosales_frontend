import { Box, Container, Link, SvgIcon, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import { ReactComponent as EditIcon } from "../../assets/images/ico_edit.svg";
import { useNavigate } from "react-router-dom";

const ClientProfilePage = () => {
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
            p={4}
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
                {t("profile_client.brand_or_buyer")}
              </Typography>
              <Box
                border="1px solid #D9D9D9"
                bgcolor="rgba(217, 217, 217, 0.2)"
                display="flex"
                gap={1}
                width={{ md: "30%", xs: "60%" }}
                justifyContent="center"
                py={1}
              >
                <Typography color="#999999">
                  {t("profile_client.status")}
                </Typography>
                <Typography color="primary.main" fontWeight={600}>
                  Pitch
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.company_or_name")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Swift
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("home.common.website")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                swift.com
              </Typography>
              <Typography width="10%">
                <SvgIcon sx={{ fill: "#999999", width: 24, height: 24 }}>
                  <EditIcon />
                </SvgIcon>
              </Typography>
            </Box>
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
            p={4}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
            bgcolor="rgba(217, 217, 217, 0.2)"
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_client.membership")}
            </Typography>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#595959">
                {t("profile_client.membership_expiration")}
              </Typography>
              <Typography width="50%" fontWeight={600}>
                2024-10-23
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#595959">
                {t("profile_client.activation_code")}
              </Typography>
              <Typography width="50%" fontWeight={600}>
                34DHYT7989Hgfhdey89
              </Typography>
            </Box>
          </Box>
          <Box
            border="1px solid #D9D9D9"
            p={4}
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
              <Typography>€4,000.00</Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2023-10-12</Typography>
              <Typography width="50%">Membership 2023</Typography>
              <Typography width="30%" textAlign="right">
                €2,000.00
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="20%">2023-10-12</Typography>
              <Typography width="50%">Membership 2024</Typography>
              <Typography width="30%" textAlign="right">
                €2,000.00
              </Typography>
            </Box>
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={4}
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
            p={4}
            borderRadius={4}
            width={{ md: "70%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography color="primary.main" variant="h5" mb={2}>
              {t("profile_client.contact_person")}
            </Typography>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.contact_name")}
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
                {t("profile_client.title")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                CEO
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
          </Box>

          <Box
            border="1px solid #D9D9D9"
            p={4}
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
              <Typography width="35%" color="#999999">
                {t("profile_client.ai_center_id")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                33-1-A04
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.ai_center_city")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Paris
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.deal_signed")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                33-1-A04-S23
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Typography width="35%" color="#999999">
                {t("profile_client.name_of_referrer")}
              </Typography>
              <Typography fontWeight={700} width="50%">
                Betty Blue
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ClientProfilePage;
