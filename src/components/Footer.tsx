import {
  Box,
  Stack,
  Typography,
  Link,
  Divider,
  Container,
} from "@mui/material";

import LogoIcon from "../assets/images/logo_xavvi.svg";

const Footer = () => {
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
                <Typography pt={2}>Plug & Play AI for Brands</Typography>
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
                  Contact
                </Link>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "#ea2049",
                    fontWeight: 700,
                  }}
                  mb={3}
                >
                  Terms & Privacy
                </Link>
              </Box>
              <Box>
                <Typography mb={3} fontWeight={700}>
                  Xavvi
                </Typography>
                <Typography fontWeight={400} mb={1}>
                  Tabivere alevik, Voldi tee 9,
                </Typography>
                <Typography fontWeight={400} mb={1}>
                  Tarfu maakond, Tartu vald
                </Typography>
                <Typography fontWeight={400} mb={1}>
                  49127 Estonia
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider sx={{ my: 4, borderColor: "#ea2049" }} />
          <Typography textAlign="center">
            © 2023 Xavvi, All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
