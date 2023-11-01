import { useEffect, useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import { object, string, boolean, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useAddClientMutation } from "../../redux/api/clientApi";
import { useAppSelector } from "../../redux/store";
import { countries } from "../../pages/admin/hqcenters.page";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #999",
  borderRadius: "20px",
  p: 2,
  maxHeight: "80vh",
  overflow: "auto",
};

const newClientInfoSchema = object({
  center_id: string().min(1, "Client ID is required.").optional(),
  sales_rep_referal_link: string()
    .min(1, "Sales rep referal link is required.")
    .optional(),
  name: string().min(1, "Name is required"),
  title: string().min(1, "Title is required"),
  mobile: string()
    .min(1, "Mobile is required")
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid mobile format."),
  email: string().min(1, "Email is required").email("Invalid email format"),
  company: string().optional(),
  website: string().url("Invalid url format").optional(),
  street: string().min(1, "Street is required"),
  city: string().min(1, "City is required"),
  zip_code: string().min(1, "Zip Code is required"),
  country: string().min(1, "Country is required"),
  business_activity: string().min(1, "Business activity is required."),
  check_annual: boolean(),
  check_ai_center: boolean(),
  check_international: boolean(),
});

export type NewClientSaveInput = TypeOf<typeof newClientInfoSchema>;

const ClientModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const { t } = useTranslation();

  const [salesReferalLink, setSalesReferalLink] = useState("");
  const user = useAppSelector((state) => state.userState.user);
  const centers = useAppSelector((state) => state.centerState.centers);

  const [addClient, addState] = useAddClientMutation();

  useEffect(() => {
    if (user?.role === "admin") return;
    fetch(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/api/clients/sales-rep-referal-link`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data: { sales_rep_referal_link: string }) =>
        setSalesReferalLink(data.sales_rep_referal_link)
      );
  }, [props.open]);

  useEffect(() => {
    if (addState.isSuccess) {
      toast.success(t("home.new_client_modal.success_msg"));
    }
    if (addState.isError) {
      console.log(addState.error);
      if (Array.isArray((addState.error as any).data.error))
        (addState.error as any).data.error.forEach((el: any) =>
          toast.error(el.message)
        );
      else toast.error((addState.error as any).data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addState]);

  const methods = useForm<NewClientSaveInput>({
    resolver: zodResolver(newClientInfoSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<NewClientSaveInput> = (
    values: NewClientSaveInput
  ) => {
    addClient(values);
    reset();
    props.setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={() => props.setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            textAlign="center"
            color="primary.main"
            mt={2}
            mb={6}
          >
            {t("home.new_client")}
          </Typography>
          <Typography mb={4}>{t("home.common.required")}</Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
            >
              <Box display="flex" gap={2} flexWrap="wrap">
                <Box width={288}>
                  {user?.role !== "admin" ? (
                    <Controller
                      control={control}
                      name="center_id"
                      defaultValue={user?.center_id}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          label={t("home.new_client_modal.center_id")}
                          size="small"
                          disabled
                          sx={{
                            ".Mui-disabled": {
                              bgcolor: "rgba(217, 217,217, .41)",
                            },
                          }}
                          value={value}
                          onChange={() => {
                            fetch(
                              `${process.env.REACT_APP_SERVER_ENDPOINT}/api/clients/sales-rep-referal-link`,
                              {
                                credentials: "include",
                              }
                            )
                              .then((res) => res.json())
                              .then(
                                (data: { sales_rep_referal_link: string }) =>
                                  setSalesReferalLink(
                                    data.sales_rep_referal_link
                                  )
                              );
                          }}
                          error={!!errors["center_id"]}
                          fullWidth
                        />
                      )}
                    />
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="center-label" size="small">
                        {t("hq_dashboard.ai_center")}
                      </InputLabel>
                      <Select
                        {...register("center_id")}
                        labelId="center-label"
                        id="center-select"
                        label={t("hq_dashboard.ai_center")}
                        defaultValue=""
                        size="small"
                        onChange={(event) => {
                          fetch(
                            `${process.env.REACT_APP_SERVER_ENDPOINT}/api/clients/sales-rep-referal-link?center_id=${event.target.value}`,
                            {
                              credentials: "include",
                            }
                          )
                            .then((res) => res.json())
                            .then((data: { sales_rep_referal_link: string }) =>
                              setSalesReferalLink(data.sales_rep_referal_link)
                            );
                        }}
                      >
                        {centers.map((item, index) => (
                          <MenuItem key={`center_item_${index}`} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
                <Box width={288}>
                  {user?.role !== "admin" ? (
                    <Controller
                      control={control}
                      name="sales_rep_referal_link"
                      defaultValue={salesReferalLink}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          required
                          label={t(
                            "home.new_client_modal.sales_rep_referal_link"
                          )}
                          helperText={errors["sales_rep_referal_link"]?.message}
                          fullWidth
                          size="small"
                          disabled
                          sx={{
                            ".Mui-disabled": {
                              bgcolor: "rgba(217, 217,217, .41)",
                            },
                            ".MuiInputBase-input": {
                              textAlign: "center",
                            },
                          }}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      label={t("home.new_client_modal.sales_rep_referal_link")}
                      fullWidth
                      size="small"
                      disabled
                      sx={{
                        ".Mui-disabled": {
                          bgcolor: "rgba(217, 217,217, .41)",
                        },
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      value={salesReferalLink}
                    />
                  )}
                </Box>
              </Box>

              <Box mt={2}>
                <Typography>
                  {t("home.new_client_modal.client_info")}
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Box width={288}>
                    <TextField
                      {...register("name")}
                      label={t("home.common.name")}
                      error={!!errors["name"]}
                      helperText={
                        errors["name"]?.message
                          ? t("home.common.name_required")
                          : null
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      {...register("title")}
                      label={t("home.common.title")}
                      error={!!errors["title"]}
                      helperText={
                        errors["title"]?.message
                          ? t("home.common.title_required")
                          : null
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      {...register("mobile")}
                      label={t("home.common.mobile")}
                      error={!!errors["mobile"]}
                      helperText={
                        !errors["mobile"]?.message
                          ? null
                          : errors["mobile"].message.includes("required")
                          ? t("home.common.mobile_required")
                          : t("home.common.mobile_invalid")
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      {...register("email")}
                      label={t("home.common.email")}
                      error={!!errors["email"]}
                      helperText={
                        !errors["email"]?.message
                          ? null
                          : errors["email"].message.includes("required")
                          ? t("home.common.email_required")
                          : t("home.common.email_invalid")
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label={t("home.common.company")}
                      {...register("company")}
                      error={!!errors["company"]}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label={t("home.common.website")}
                      {...register("website")}
                      error={!!errors["website"]}
                      helperText={
                        errors["website"]?.message
                          ? t("home.common.website_invalid")
                          : null
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Please include https:// in your url."
                    />
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography>{t("home.common.address")}</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Box width={288}>
                    <TextField
                      label={t("home.common.street")}
                      {...register("street")}
                      error={!!errors["street"]}
                      helperText={
                        errors["street"]?.message
                          ? t("home.common.street_required")
                          : null
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label={t("home.common.city")}
                      {...register("city")}
                      error={!!errors["city"]}
                      helperText={
                        errors["city"]?.message
                          ? t("home.common.city_required")
                          : null
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter city here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label={t("home.common.zip_code")}
                      {...register("zip_code")}
                      error={!!errors["zip_code"]}
                      helperText={
                        errors["zip_code"]?.message
                          ? t("home.common.zip_code_required")
                          : null
                      }
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </Box>
                  <Box width={288}>
                    <Autocomplete
                      id="country-select-demo-2"
                      options={countries}
                      autoHighlight
                      size="small"
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...register("country")}
                          {...params}
                          label={t("home.common.choose_country")}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography>
                  {t("home.new_client_modal.business_activity")}
                </Typography>
                <Box width={288}>
                  <TextField
                    {...register("business_activity")}
                    error={!!errors["business_activity"]}
                    helperText={
                      errors["business_activity"]?.message
                        ? t("home.new_client_modal.business_activity_required")
                        : null
                    }
                    fullWidth
                    size="small"
                    sx={{
                      ".MuiInputBase-input": {
                        textAlign: "center",
                      },
                    }}
                    placeholder="Enter client's biz activity here."
                  />
                </Box>
              </Box>
              <FormControl sx={{ mt: 4 }}>
                <FormLabel sx={{ color: "black" }}>
                  {t("home.new_client_modal.client_interest")}
                </FormLabel>
                <FormGroup sx={{ flexDirection: "row" }}>
                  <FormControlLabel
                    control={<Checkbox {...register("check_annual")} />}
                    label={t("home.new_client_modal.annual_membership")}
                  />
                  <FormControlLabel
                    control={<Checkbox {...register("check_ai_center")} />}
                    label={t("home.new_client_modal.ai_center_franchise")}
                  />
                  <FormControlLabel
                    control={<Checkbox {...register("check_international")} />}
                    label={t(
                      "home.new_client_modal.international_sales_services"
                    )}
                  />
                </FormGroup>
              </FormControl>
              <Stack flexDirection="row" justifyContent="center" gap={2} mt={4}>
                <LoadingButton type="submit" variant="contained" fullWidth>
                  {t("home.common.confirm")}
                </LoadingButton>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => props.setOpen(false)}
                >
                  {t("home.common.cancel")}
                </Button>
              </Stack>
            </Box>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClientModal;
