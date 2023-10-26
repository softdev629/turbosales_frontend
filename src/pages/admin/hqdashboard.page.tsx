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
} from "@mui/material";

import { ReactComponent as BoxIcon } from "../../assets/images/ico_box.svg";
import WhiteMoneyBagIcon from "../../assets/images/ico_white_money_bag.svg";
import { ReactComponent as MembersIcon } from "../../assets/images/ico_members.svg";
import { ReactComponent as MoneyIcon } from "../../assets/images/ico_money.svg";
import { ReactComponent as MembershipIcon } from "../../assets/images/ico_membership.svg";
import { ReactComponent as FrenchiseIcon } from "../../assets/images/ico_franchise.svg";
import { ReactComponent as MarketingIcon } from "../../assets/images/ico_marketing.svg";
import { ReactComponent as GiftIcon } from "../../assets/images/ico_gift.svg";
import MoneyBagIcon from "../../assets/images/ico_moneybag.svg";
import { ReactComponent as ContactIcon } from "../../assets/images/ico_contact.svg";

const HQDashboardPage = () => {
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
            YEAR STATS
          </Typography>
          <Stack direction="row" justifyContent="space-evenly" pb={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <BoxIcon />
              </SvgIcon>
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                500
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                AI
                <br />
                Centers
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
                €100.6M
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                Total
                <br />
                Income
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <MembersIcon />
              </SvgIcon>
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                50.2K
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                Total
                <br />
                Members
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SvgIcon sx={{ fill: "white", width: 40, height: 40 }}>
                <MoneyIcon />
              </SvgIcon>
              <Typography color="white" mt={2} fontSize={{ md: 32, xs: 18 }}>
                €500.9M
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                GMV
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
              INCOME
            </Typography>
            <Typography width="25%" textAlign="center">
              MONTH
            </Typography>
            <Typography width="25%" textAlign="center">
              YEAR
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
              Franchise
              <br />
              Starter Kits
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
              Marketing
              <br />
              Services
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
          </Box>
        </Box>

        <Box
          width={{ md: "70%", xs: "100%" }}
          border="1px solid #D9D9D9"
          mt={6}
          p={3}
        >
          <Box display="flex">
            <Typography variant="h5" color="primary.main" flexGrow={1}>
              Commissions
            </Typography>
            <Box width={192} mr={7}>
              <FormControl fullWidth>
                <InputLabel id="client-name-label" size="small">
                  AI Center
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
          >
            <Typography width="20%">Sales Date</Typography>
            <Typography width="25%">Company</Typography>
            <Typography width="20%">AI Center</Typography>
            <Typography width="20%">Amount</Typography>
            <Typography width="15%">Paid</Typography>
          </Box>
          <Box display="flex" py={1}>
            <Typography width="20%" color="primary.main">
              2023-02-13
            </Typography>
            <Typography width="25%">ABC</Typography>
            <Typography width="20%">Amy Adams</Typography>
            <Typography width="20%">€300</Typography>
            <Typography width="15%"></Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HQDashboardPage;
