import { useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";

import CenterModal from "../../components/modals/center.modal";
import { ReactComponent as PlusIcon } from "../../assets/images/ico_plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/images/ico_minus.svg";
import {
  useGetTermsQuery,
  useUpdateTermsMutation,
} from "../../redux/api/authApi";
import { toast } from "react-toastify";

const HQSettingsPage = () => {
  const { t } = useTranslation();
  const [openCenter, setOpenSenter] = useState(false);

  const termsData = useGetTermsQuery();
  const [updateTerms, termsStatus] = useUpdateTermsMutation();

  const [terms, setTerms] = useState("");

  // const [hqSettings, setHQSettings] = useState<{
  //   center_referal_amount: number;
  //   center_referal_type: string;
  //   tiktok_spending_amount: number;
  //   tiktok_spending_type: string;
  // }>();

  useEffect(() => {
    if (termsData.isSuccess) {
      setTerms(termsData.data);
    }
  }, [termsData]);

  useEffect(() => {
    if (termsStatus.isSuccess) {
      toast.success("Terms saved successfully.");
    }
  }, [termsStatus]);

  return (
    <>
      <Container sx={{ mt: 20 }}>
        <Typography color="primary.main" textAlign="center" variant="h4" mt={4}>
          {t("header.more_menu.hq_settings")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Typography color="primary.main" variant="h4">
            {t("hq_settings.add_new_center")}
          </Typography>
          <Button
            variant="contained"
            sx={{ height: "fit-content" }}
            onClick={() => setOpenSenter(true)}
          >
            {t("hq_settings.add_center")}
          </Button>
        </Box>
        <Box borderRadius={4} mt={6} bgcolor="rgba(217, 217, 217, 0.2)" p={4}>
          <Typography variant="h5" textAlign="center" color="primary.main">
            {t("header.commissions")}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            gap={4}
            mt={4}
            sx={{ flexDirection: { xs: "column", sm: "column", md: "row" } }}
          >
            <Box
              bgcolor="rgba(234, 32, 73, 0.1)"
              border="1px solid #D9D9D9"
              width={{ xs: "100%", sm: "70%", md: "30%" }}
              p={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography textAlign="center" variant="h5">
                {t("hq_settings.ai_center_referral")}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                mt={3}
              >
                <Typography flexGrow={1}>
                  {t("home.sold_modal.amount")}
                </Typography>
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
                <Typography flexGrow={3}>
                  {t("center_settings.type")}
                </Typography>
                <Box display="flex" flexGrow={7}>
                  <FormControl fullWidth>
                    <InputLabel id="money-unit-select-label">
                      {t("center_settings.type")}
                    </InputLabel>
                    <Select
                      labelId="money-unit-select-label"
                      id="money-unit-select"
                      label={t("center_settings.type")}
                      defaultValue={""}
                    >
                      <MenuItem value={"€"}>€</MenuItem>
                      <MenuItem value={"%"}>%</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box
              bgcolor="rgba(133, 220, 255, 0.2)"
              border="1px solid #D9D9D9"
              width={{ xs: "100%", sm: "70%", md: "30%" }}
              p={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography textAlign="center" variant="h5">
                {t("hq_settings.titok_ad_spending")}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                mt={3}
              >
                <Typography flexGrow={1}>
                  {t("home.sold_modal.amount")}
                </Typography>
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
                <Typography flexGrow={3}>
                  {t("center_settings.type")}
                </Typography>
                <Box display="flex" flexGrow={7}>
                  <FormControl fullWidth>
                    <InputLabel id="money-unit-select-label">
                      {t("center_settings.type")}
                    </InputLabel>
                    <Select
                      labelId="money-unit-select-label"
                      id="money-unit-select"
                      label={t("center_settings.type")}
                      defaultValue=""
                    >
                      <MenuItem value={"€"}>€</MenuItem>
                      <MenuItem value={"%"}>%</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={8}>
          <Box
            maxWidth={1000}
            width="100%"
            bgcolor="rgba(217, 217, 217, 0.2)"
            borderRadius={4}
            p={6}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography color="primary.main" variant="h5">
                {t("hq_settings.set_terms")}
              </Typography>
              <LoadingButton
                variant="contained"
                onClick={() => updateTerms({ terms })}
                loading={termsStatus.isLoading}
              >
                {t("hq_settings.save")}
              </LoadingButton>
            </Box>
            <TextField
              multiline
              fullWidth
              sx={{ mt: 4, bgcolor: "white" }}
              rows={30}
              value={terms}
              onChange={(event) => setTerms(event.target.value)}
            />
          </Box>
        </Box>
        <CenterModal open={openCenter} setOpen={setOpenSenter} />
      </Container>
    </>
  );
};

export default HQSettingsPage;
