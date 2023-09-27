import { useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  FormControl,
  Stack,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { fromDayjsToDate } from "../../util";
import { useGetClientsQuery } from "../../redux/api/clientApi";
import { IClient } from "../../redux/api/types";
import { useAppSelector } from "../../redux/store";
import { useCreateSoldMutation } from "../../redux/api/soldApi";

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

const newSoldSchema = object({
  referal_link: string().min(1, "Referal link is required."),
  client: string().min(1, "Client field is required."),
  company: string().min(1, "Company is required"),
  date: string(),
  commission_rate: string().min(1, "Commission rate is required."),
  product: string().min(1, "Product field is required."),
  amount: string().refine((value) => !isNaN(Number(value)), {
    message: "Invalid amount format",
  }),
  commissions: string().min(1, "Commission field is required"),
  payment_type: string().min(1, "Payment type is required"),
});

export type NewSoldSaveSchema = TypeOf<typeof newSoldSchema>;

const SoldModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const clientState = useGetClientsQuery();
  const [createSold, createState] = useCreateSoldMutation();

  const user = useAppSelector((state) => state.userState.user);
  const settings = useAppSelector((state) => state.centerState.settings);

  const { t } = useTranslation();

  const methods = useForm<NewSoldSaveSchema>({
    resolver: zodResolver(newSoldSchema),
  });

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    reset,
    // formState: { errors },
  } = methods;

  useEffect(() => {
    if (createState.isSuccess) {
      toast.success(createState.data.message);
      reset();
      props.setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState]);

  const onSubmitHandler: SubmitHandler<NewSoldSaveSchema> = (
    values: NewSoldSaveSchema
  ) => {
    createSold(values);
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
          <FormProvider {...methods}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <Stack gap={3}>
                <Typography
                  color="primary.main"
                  variant="h5"
                  textAlign="center"
                  mt={2}
                >
                  {t("home.sold_modal.sold_title")}
                </Typography>
                <Typography color="primary.main" textAlign="center" width={288}>
                  {t("home.sold_modal.sold_congrats")}
                </Typography>
                <Typography textAlign="center">
                  {t("home.common.required")}
                </Typography>
                <TextField
                  {...register("referal_link")}
                  placeholder="Referal Link"
                  size="small"
                  disabled
                  sx={{
                    ".Mui-disabled": {
                      bgcolor: "rgba(217, 217,217, .41)",
                    },
                  }}
                />
                <Box width={288}>
                  <FormControl fullWidth>
                    <InputLabel id="client-name-label" size="small">
                      {t("home.testdrive_modal.select_client")}
                    </InputLabel>
                    <Select
                      {...register("client")}
                      labelId="client-name-label"
                      id="client-name-select"
                      label={t("home.testdrive_modal.select_client")}
                      size="small"
                      defaultValue=""
                      onChange={(event) => {
                        clientState.data?.forEach((item: IClient) => {
                          if (item._id === event.target.value) {
                            setValue(
                              "referal_link",
                              item.sales_rep_referal_link
                            );
                            setValue("company", item.company);
                          }
                        });
                      }}
                    >
                      {clientState.data?.map((client, client_index) => (
                        <MenuItem
                          key={`client_item_${client_index}`}
                          value={client._id}
                        >
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  {...register("company")}
                  placeholder={t("home.common.company") as string}
                  size="small"
                  disabled
                  sx={{
                    ".Mui-disabled": {
                      bgcolor: "rgba(217, 217,217, .41)",
                    },
                  }}
                />
                <Stack
                  width={288}
                  bgcolor="rgba(217, 217,217, .41)"
                  borderRadius={4}
                  border="1px solid #999999"
                  py={3}
                  gap={2}
                  alignItems="center"
                >
                  <Typography>{t("home.sold_modal.purchase_date")}</Typography>

                  <TextField
                    {...register("date")}
                    placeholder={t("home.testdrive_modal.date") as string}
                    sx={{ bgcolor: "white", width: "90%" }}
                    size="small"
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateCalendar"]} sx={{ p: 2 }}>
                      <DemoItem>
                        <DateCalendar
                          sx={{ bgcolor: "white", width: "100%", height: 300 }}
                          onChange={(value: Dayjs | null) => {
                            if (value) {
                              setValue("date", fromDayjsToDate(value));
                            }
                          }}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
              </Stack>
              <Box width={288} mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="product-label" size="small">
                    {t("home.sold_modal.product")}
                  </InputLabel>
                  <Select
                    {...register("product")}
                    labelId="product-label"
                    id="product-select"
                    label={t("home.sold_modal.product")}
                    size="small"
                    defaultValue=""
                    onChange={(event) => {
                      if (user && settings) {
                        const amount = Number.isNaN(
                          parseFloat(getValues("amount"))
                        )
                          ? 0
                          : parseFloat(getValues("amount"));

                        switch (event.target.value) {
                          case "membership":
                            if (user.role === "manager") {
                              setValue(
                                "commission_rate",
                                `${settings.manager_membership_amount}${settings.manager_membership_type}`
                              );
                              setValue(
                                "commissions",
                                `${
                                  settings.manager_membership_type === "%"
                                    ? (settings.manager_membership_amount /
                                        100) *
                                      amount
                                    : settings.manager_membership_amount
                                }€`
                              );
                            }
                            if (user.role === "sales") {
                              setValue(
                                "commission_rate",
                                `${settings.salesrep_membership_amount}${settings.salesrep_membership_type}`
                              );
                              setValue(
                                "commissions",
                                `${
                                  settings.salesrep_membership_type === "%"
                                    ? (settings.salesrep_membership_amount /
                                        100) *
                                      amount
                                    : settings.salesrep_membership_amount
                                }€`
                              );
                            }
                            break;
                          case "ai_center":
                            if (user.role === "manager") {
                              setValue(
                                "commission_rate",
                                `${settings.manager_aicenter_amount}${settings.manager_aicenter_type}`
                              );
                              setValue(
                                "commissions",
                                `${
                                  settings.manager_aicenter_type === "%"
                                    ? (settings.manager_aicenter_amount / 100) *
                                      amount
                                    : settings.manager_aicenter_amount
                                }€`
                              );
                            }
                            if (user.role === "sales") {
                              setValue(
                                "commission_rate",
                                `${settings.salesrep_aicenter_amount}${settings.salesrep_aicenter_type}`
                              );
                              setValue(
                                "commissions",
                                `${
                                  settings.salesrep_aicenter_type === "%"
                                    ? (settings.salesrep_aicenter_amount /
                                        100) *
                                      amount
                                    : settings.salesrep_aicenter_amount
                                }€`
                              );
                            }
                            break;
                        }
                      }
                    }}
                  >
                    <MenuItem value="membership">Membership</MenuItem>
                    <MenuItem value="ai_center">AI Center</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box width={288} mt={3}>
                <TextField
                  {...register("commission_rate")}
                  placeholder={t("home.sold_modal.commission_rate") as string}
                  size="small"
                  disabled
                  fullWidth
                  sx={{
                    ".Mui-disabled": {
                      bgcolor: "rgba(217, 217,217, .41)",
                    },
                    ".MuiInputBase-input": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>

              <Box width={288} mt={3}>
                <TextField
                  {...register("amount")}
                  label={t("home.sold_modal.amount")}
                  size="small"
                  fullWidth
                  onChange={(event) => {
                    const amount = Number.isNaN(parseFloat(event.target.value))
                      ? 0
                      : parseFloat(event.target.value);

                    const commission_str = getValues("commission_rate");
                    const commission_rate = parseFloat(
                      commission_str.slice(0, commission_str.length - 1)
                    );
                    const commission_type =
                      commission_str[commission_str.length - 1];

                    if (commission_type === "%") {
                      setValue(
                        "commissions",
                        `${(commission_rate / 100) * amount}€`
                      );
                    } else setValue("commissions", commission_str);
                  }}
                  sx={{
                    ".MuiInputBase-input": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>

              <Box width={288} mt={3}>
                <TextField
                  {...register("commissions")}
                  placeholder={t("header.commissions") as string}
                  size="small"
                  disabled
                  fullWidth
                  sx={{
                    ".Mui-disabled": {
                      bgcolor: "rgba(217, 217,217, .41)",
                    },
                    ".MuiInputBase-input": {
                      textAlign: "center",
                    },
                  }}
                />
              </Box>

              <FormControl
                sx={{
                  border: "1px solid #D9D9D9",
                  p: 2,
                  mt: 3,
                  borderRadius: 4,
                }}
                fullWidth
              >
                <FormLabel
                  id="payment-radio-buttons-group-label"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {t("home.sold_modal.payment_type")}
                </FormLabel>
                <Controller
                  control={control}
                  name="payment_type"
                  defaultValue="credit"
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      aria-labelledby="payment-radio-buttons-group-label"
                      defaultValue="credit"
                      name="payment-buttons-group"
                      value={value}
                      onChange={onChange}
                    >
                      <FormControlLabel
                        value="credit"
                        control={<Radio />}
                        label={t("home.sold_modal.credit_card")}
                      />
                      <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label={t("home.sold_modal.bank_transfer")}
                      />
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label={t("home.sold_modal.cash")}
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <Box display="flex" gap={2} mt={4}>
                <LoadingButton variant="contained" fullWidth type="submit">
                  {t("home.common.confirm")}
                </LoadingButton>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => props.setOpen(false)}
                >
                  {t("home.common.cancel")}
                </Button>
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SoldModal;
