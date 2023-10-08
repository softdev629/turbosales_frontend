import {
  Container,
  Typography,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useForm,
  FormProvider,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const newContactSchema = object({
  name: string().min(1, "Name is required"),
  email: string().min(1, "Email is required").email("Invalid email format"),
  message: string().min(1, "Message is required"),
  role: string().refine(
    (value) => ["manager", "sales", "instructor"].includes(value),
    { message: "Invalid role" }
  ),
});

export type NewContactSchema = TypeOf<typeof newContactSchema>;

const ContactPage = () => {
  const { t } = useTranslation();

  const methods = useForm<NewContactSchema>({
    resolver: zodResolver(newContactSchema),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<NewContactSchema> = (
    values: NewContactSchema
  ) => {
    console.log(values);
  };

  return (
    <>
      <Container sx={{ mt: 20 }}>
        <Typography variant="h4" textAlign="center" color="primary.main">
          {t("contact.title")}
        </Typography>
        <Typography textAlign="center" mt={3}>
          {t("contact.tip")}
        </Typography>
        <Paper
          component="form"
          noValidate
          sx={{ p: 4, mt: 4, borderRadius: 4 }}
          elevation={24}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormProvider {...methods}>
            <Typography color="primary.main">
              {t("contact.mendatory_msg")}
            </Typography>
            <TextField
              {...register("name")}
              label={t("home.common.name")}
              sx={{ mt: 4 }}
              fullWidth
              error={!!errors["name"]}
              helperText={
                errors["name"]?.message ? t("home.common.name_required") : ""
              }
            />
            <TextField
              {...register("email")}
              label={t("home.common.email")}
              sx={{ mt: 4 }}
              fullWidth
              error={!!errors["email"]}
              helperText={
                !errors["email"]?.message
                  ? ""
                  : errors["email"].message.includes("required")
                  ? t("home.common.email_required")
                  : t("home.common.email_invalid")
              }
            />
            <TextField
              {...register("message")}
              label={t("contact.message")}
              sx={{ mt: 4 }}
              fullWidth
              multiline
              rows={7}
              error={!!errors["message"]}
              helperText={
                errors["message"]?.message ? t("contact.message_required") : ""
              }
            />
            <FormControl sx={{ mt: 4 }} fullWidth>
              <FormLabel id="role-radio-buttons-group-label">
                {t("contact.type_of_user")}
              </FormLabel>
              <Controller
                control={control}
                name="role"
                defaultValue="sales"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    aria-labelledby="role-radio-buttons-group-label"
                    value={value}
                    onChange={onChange}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="manager"
                      control={<Radio />}
                      label={t("home.common.manager")}
                    />
                    <FormControlLabel
                      value="instructor"
                      control={<Radio />}
                      label={t("home.common.instructor")}
                    />
                    <FormControlLabel
                      value="sales"
                      control={<Radio />}
                      label={t("home.common.sales_rep")}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Box display="flex" justifyContent="center" gap={4} mt={4}>
              <LoadingButton variant="contained" fullWidth type="submit">
                {t("contact.send")}
              </LoadingButton>
              <Button variant="outlined" fullWidth>
                {t("contact.close")}
              </Button>
            </Box>
          </FormProvider>
        </Paper>
      </Container>
    </>
  );
};

export default ContactPage;
