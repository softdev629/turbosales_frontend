import { Container, Box, Typography, Stack, SvgIcon } from "@mui/material";

import { ReactComponent as BoxIcon } from "../../assets/images/ico_box.svg";
import WhiteMoneyBagIcon from "../../assets/images/ico_white_money_bag.svg";
import { ReactComponent as MembersIcon } from "../../assets/images/ico_members.svg";
import { ReactComponent as MoneyIcon } from "../../assets/images/ico_money.svg";
import { ReactComponent as MembershipIcon } from "../../assets/images/ico_membership.svg";
import { ReactComponent as FrenchiseIcon } from "../../assets/images/ico_franchise.svg";
import { ReactComponent as MarketingIcon } from "../../assets/images/ico_marketing.svg";
import { ReactComponent as GiftIcon } from "../../assets/images/ico_gift.svg";
import MoneyBagIcon from "../../assets/images/ico_moneybag.svg";

const HQDashboardPage = () => {
  return (
    <>
      <Container
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
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
              <Typography variant="h4" color="white" mt={2}>
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
              <Typography variant="h4" color="white" mt={2}>
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
              <Typography variant="h4" color="white" mt={2}>
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
              <Typography variant="h4" color="white" mt={2}>
                €500.9M
              </Typography>
              <Typography color="#D9D9D9" textAlign="center" mt={1}>
                GMV
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box border="1px solid #D9D9D9" mt={4} width="80%">
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
              <SvgIcon sx={{ fill: "#ea2049", width: 48, height: 48 }}>
                <MembershipIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" variant="h5">
              Membership
              <br />
              Packs
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €2K
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €10K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon sx={{ fill: "#ea2049", width: 48, height: 48 }}>
                <FrenchiseIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" variant="h5">
              Franchise
              <br />
              Starter Kits
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €10K
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €100.3K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon sx={{ fill: "#ea2049", width: 48, height: 48 }}>
                <MarketingIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" variant="h5">
              Marketing
              <br />
              Services
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €500K
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €750.7K
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box width="10%" display="flex" justifyContent="center">
              <SvgIcon sx={{ fill: "#ea2049", width: 48, height: 48 }}>
                <GiftIcon />
              </SvgIcon>
            </Box>
            <Typography width="25%" variant="h5">
              International
              <br />
              Sales
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €500K
            </Typography>
            <Typography
              width="25%"
              variant="h4"
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
            <Typography width="25%" variant="h5">
              Membership
              <br />
              Packs
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €2K
            </Typography>
            <Typography
              width="25%"
              variant="h4"
              color="primary.main"
              textAlign="center"
            >
              €10K
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HQDashboardPage;
