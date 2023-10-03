import { useEffect, useState } from "react";
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
import { string } from "zod";
import { toast } from "react-toastify";

import { ReactComponent as ReferLinkIcon } from "../assets/images/ico_refer_link.svg";
import { ReactComponent as RoleIcon } from "../assets/images/ico_role.svg";
import { useAppSelector } from "../redux/store";
import { useUpdateMeMutation } from "../redux/api/userApi";

const AccountPage = () => {
  const { t } = useTranslation();
  const [isChangeMobile, setIsChangeMobile] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);

  const user = useAppSelector((state) => state.userState.user);
  const [mobile, setMobile] = useState(user?.mobile);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [updateMe, updateState] = useUpdateMeMutation();

  useEffect(() => {
    if (updateState.isSuccess) {
      toast.success("Profile updated successfully.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateState]);

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
            {isChangeMobile ? (
              <TextField
                size="small"
                value={mobile as string}
                onChange={(event) => setMobile(event.target.value)}
              />
            ) : (
              <Typography color="primary.main">{user?.mobile}</Typography>
            )}
          </Box>
          <Typography fontSize={12} mt={1}>
            {t("account.mobile_tip")}
          </Typography>
          <LoadingButton
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => {
              const valid = string()
                .min(1, "Mobile field can't be empty.")
                .regex(/^\+\d{1,3} \d+$/, "Invalid mobile format.")
                .safeParse(mobile);

              if (isChangeMobile) {
                if (!valid.success) {
                  toast.error(valid.error.errors[0].message);
                  return;
                }
                updateMe({ mobile });
              }
              setIsChangeMobile(!isChangeMobile);
            }}
          >
            {!isChangeMobile ? t("account.change") : t("hq_settings.save")}
          </LoadingButton>
        </Box>
        <Box mt={3} border="1px solid #D9D9D9" p={2} borderRadius={4}>
          <Box display="flex">
            <Typography width={192}>{t("home.common.email")}</Typography>
            {isChangeEmail ? (
              <TextField
                size="small"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            ) : (
              <Typography color="primary.main">{user?.email}</Typography>
            )}
          </Box>
          <LoadingButton
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => {
              const valid = string()
                .min(1, "Email is required")
                .email("Invalid email format")
                .safeParse(email);
              if (isChangeMobile) {
                if (!valid.success) {
                  toast.error(valid.error.errors[0].message);
                  return;
                }
                updateMe({ email });
              }
              setIsChangeEmail(!isChangeEmail);
            }}
          >
            {!isChangeEmail ? t("account.change") : t("hq_settings.save")}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              label={t("account.confirm_password")}
              sx={{ width: 220, mt: 2 }}
              size="small"
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </Stack>
          <LoadingButton
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => {
              const passwordValid = string()
                .min(1, "Password can't be empty!")
                .min(8, "Password must be longer than 8 characters.")
                .safeParse(password);
              const confirmValid = string()
                .min(1, "Confirm password can't be empty!")
                .safeParse(confirm);
              if (passwordValid.success) {
                if (confirmValid.success) {
                  if (password === confirm) updateMe({ password });
                  else toast.error("Password do not match!");
                } else toast.error(confirmValid.error.errors[0].message);
              } else toast.error(passwordValid.error.errors[0].message);
            }}
          >
            {t("account.change")}
          </LoadingButton>
        </Box>
      </Container>
    </>
  );
};

export default AccountPage;
