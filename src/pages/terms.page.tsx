import { Container, Typography, Box, Link } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useGetTermsQuery } from "../redux/api/authApi";
import FullScreenLoader from "../components/FullscreenLoader";

const TermsPage = () => {
  const termsData = useGetTermsQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (termsData.isLoading) return <FullScreenLoader />;

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
        <Typography textAlign="center" color="primary.main" variant="h4" my={8}>
          {t("footer.terms_privacy")}
        </Typography>
        <Box bgcolor="rgba(217, 217, 217, 0.2)" p={8} borderRadius={4}>
          {termsData.data &&
            termsData.data
              .split("\n")
              .map((item) =>
                item === "" ? (
                  <br />
                ) : (
                  <Typography fontSize={18}>{item}</Typography>
                )
              )}
        </Box>
      </Container>
    </>
  );
};

export default TermsPage;
