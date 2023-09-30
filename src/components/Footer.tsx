import {
  Box,
  Stack,
  Typography,
  Link,
  Divider,
  Container,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import LogoIcon from "../assets/images/logo_xavvi.svg";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box p={4} bgcolor="#ededed" mt={10}>
        <Container maxWidth="xl">
          <Box display="flex" flexWrap="wrap">
            <Stack
              flexDirection="row"
              gap={{ md: 20, xs: 5 }}
              alignItems="flex-start"
              flexWrap="wrap"
            >
              <Box>
                <img src={LogoIcon} alt="Logo" width={144} />
                <Typography pt={2}>{t("footer.str1")}</Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "#ea2049",
                    fontWeight: 700,
                  }}
                  mb={3}
                >
                  {t("header.more_menu.contact")}
                </Link>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "#ea2049",
                    fontWeight: 700,
                  }}
                  mb={3}
                >
                  {t("footer.terms_privacy")}
                </Link>
              </Box>
              <Box>
                <Typography mb={3} fontWeight={700}>
                  Xavvi
                </Typography>
                <Typography fontWeight={400} mb={1}>
                  {t("footer.str2")},
                </Typography>
                <Typography fontWeight={400} mb={1}>
                  {t("footer.str3")}
                </Typography>
                <Typography fontWeight={400} mb={1}>
                  {t("footer.str4")}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider sx={{ my: 4, borderColor: "#ea2049" }} />
          <Typography textAlign="center">{t("footer.str5")}</Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
