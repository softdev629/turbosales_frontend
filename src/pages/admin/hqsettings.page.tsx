import {
  Container,
  Typography,
  Box,
  Button,
  SvgIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

import CenterModal from "../../components/modals/center.modal";
import { ReactComponent as PlusIcon } from "../../assets/images/ico_plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/images/ico_minus.svg";

const HQSettingsPage = () => {
  const [openCenter, setOpenSenter] = useState(false);
  return (
    <>
      <Container>
        <Typography color="primary.main" textAlign="center" variant="h4" mt={4}>
          HQ Settings
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Typography color="primary.main" variant="h5">
            ADD NEW CENTER
          </Typography>
          <Button variant="contained" onClick={() => setOpenSenter(true)}>
            ADD CENTER
          </Button>
        </Box>
        <Box borderRadius={4} mt={6} bgcolor="rgba(217, 217, 217, 0.2)" p={4}>
          <Typography variant="h5" textAlign="center" color="primary.main">
            Commisions
          </Typography>
          <Box display="flex" justifyContent="center" gap={4}>
            <Box
              bgcolor="rgba(234, 32, 73, 0.1)"
              border="1px solid #D9D9D9"
              width="30%"
              p={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography textAlign="center" variant="h5">
                AI Centers Referal
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                mt={3}
              >
                <Typography flexGrow={1}>Amount</Typography>
                <Box display="flex" flexGrow={1} justifyContent="space-between">
                  <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                    <PlusIcon />
                  </SvgIcon>
                  <Typography variant="h5">{10}</Typography>
                  <SvgIcon sx={{ fill: "#999999", width: 32, height: 32 }}>
                    <MinusIcon />
                  </SvgIcon>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                mt={3}
              >
                <Typography flexGrow={3}>Type</Typography>
                <Box display="flex" flexGrow={7}>
                  <FormControl fullWidth>
                    <InputLabel id="money-unit-select-label">Age</InputLabel>
                    <Select
                      labelId="money-unit-select-label"
                      id="money-unit-select"
                      label="Age"
                    >
                      <MenuItem value={"€"}>€</MenuItem>
                      <MenuItem value={"%"}>%</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box
              bgcolor="rgba(234, 32, 73, 0.1)"
              border="1px solid #D9D9D9"
              width="30%"
            >
              <Typography>AI Centers Referal</Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography flexGrow={1}>Amount</Typography>
                <Box display="flex" flexGrow={1}>
                  <SvgIcon sx={{ fill: "#999999" }}>
                    <PlusIcon />
                  </SvgIcon>
                  {10}
                  <SvgIcon sx={{ fill: "#999999" }}>
                    <MinusIcon />
                  </SvgIcon>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <CenterModal open={openCenter} setOpen={setOpenSenter} />
      </Container>
    </>
  );
};

export default HQSettingsPage;
