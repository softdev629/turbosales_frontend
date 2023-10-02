import {
  Box,
  Container,
  Typography,
  SvgIcon,
  TextField,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

import { ReactComponent as ReferLinkIcon } from "../assets/images/ico_refer_link.svg";
import { ReactComponent as RoleIcon } from "../assets/images/ico_role.svg";
import { useAppSelector } from "../redux/store";

const AccountPage = () => {
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.userState.user);

  return (
    <>
      <Container sx={{ mt: 20 }}>
        <Box display="flex" alignItems="center" mt={3}>
          <Box display="flex" flexGrow={1}>
            <Box flexGrow={1} display="flex" gap={1}>
              <SvgIcon sx={{ width: 30, height: 30 }}>
                <ReferLinkIcon fill="#EA2049" />
              </SvgIcon>
              <Typography variant="h5">{user?.center_id}</Typography>
            </Box>
            <Box flexGrow={1} display="flex" gap={1}>
              <SvgIcon sx={{ width: 30, height: 30 }}>
                <RoleIcon fill="#EA2049" />
              </SvgIcon>
              <Typography variant="h5">
                {user?.role === "sales"
                  ? t("home.common.sales_rep")
                  : user?.role === "manager"
                  ? t("home.common.manager")
                  : t("home.common.instructor")}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexGrow={1}
            bgcolor="rgba(234, 32, 73, 0.15)"
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            gap={6}
            py={2}
          >
            <Typography color="black">{t("account.referal_link")}</Typography>
            <Typography variant="h5" color="primary.main">
              33-1-A01-S01
            </Typography>
          </Box>
        </Box>
        <Box
          mt={6}
          border="1px solid #D9D9D9"
          display="flex"
          p={2}
          borderRadius={4}
        >
          <Typography width={192}>{t("home.common.name")}</Typography>
          <Typography color="primary.main">{user?.name}</Typography>
        </Box>
        <Box mt={3} border="1px solid #D9D9D9" p={2} borderRadius={4}>
          <Box display="flex">
            <Typography width={192}>{t("home.common.mobile")}</Typography>
            <Typography color="primary.main">{user?.mobile}</Typography>
          </Box>
          <Typography fontSize={12} mt={1}>
            {t("account.mobile_tip")}
          </Typography>
          <LoadingButton variant="outlined" sx={{ mt: 3 }}>
            {t("account.change")}
          </LoadingButton>
        </Box>
        <Box mt={3} border="1px solid #D9D9D9" p={2} borderRadius={4}>
          <Box display="flex">
            <Typography width={192}>{t("home.common.email")}</Typography>
            <Typography color="primary.main">{user?.email}</Typography>
          </Box>
          <LoadingButton variant="outlined" sx={{ mt: 3 }}>
            {t("account.change")}
          </LoadingButton>
        </Box>
        <Box mt={3} border="1px solid #D9D9D9" p={2} borderRadius={4}>
          <Typography fontWeight={600}>
            {t("account.change_password")}
          </Typography>
          <Typography fontSize={12} mt={2}>
            {t("account.password_tip")}
          </Typography>
          <Stack>
            <TextField
              label={t("account.new_password")}
              sx={{ width: 220, mt: 2 }}
              size="small"
              type="password"
            />
            <TextField
              label={t("account.confirm_password")}
              sx={{ width: 220, mt: 2 }}
              size="small"
              type="password"
            />
          </Stack>
          <LoadingButton variant="outlined" sx={{ mt: 3 }}>
            {t("account.change")}
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
};

export default AccountPage;
