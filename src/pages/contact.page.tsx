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
          Contact
        </Typography>
        <Typography textAlign="center" mt={3}>
          Please tell us how we can help you
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
              All fields are mandatory.
            </Typography>
            <TextField
              {...register("name")}
              label="Name"
              sx={{ mt: 4 }}
              fullWidth
              error={!!errors["name"]}
              helperText={errors["name"]?.message}
            />
            <TextField
              {...register("email")}
              label="Email"
              sx={{ mt: 4 }}
              fullWidth
              error={!!errors["email"]}
              helperText={errors["email"]?.message}
            />
            <TextField
              {...register("message")}
              label="Message"
              sx={{ mt: 4 }}
              fullWidth
              multiline
              rows={7}
              error={!!errors["message"]}
              helperText={errors["message"]?.message}
            />
            <FormControl sx={{ mt: 4 }} fullWidth>
              <FormLabel id="role-radio-buttons-group-label">
                TYPE OF USER
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
                    sx={{ display: "flex", flexDirection: "row", gap: 4 }}
                  >
                    <FormControlLabel
                      value="manager"
                      control={<Radio />}
                      label="Manager"
                    />
                    <FormControlLabel
                      value="instructor"
                      control={<Radio />}
                      label="Instructor"
                    />
                    <FormControlLabel
                      value="sales"
                      control={<Radio />}
                      label="Sales Rep"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Box display="flex" justifyContent="center" gap={4} mt={4}>
              <LoadingButton variant="contained" fullWidth type="submit">
                SEND
              </LoadingButton>
              <Button variant="outlined" fullWidth>
                CLOSE
              </Button>
            </Box>
          </FormProvider>
        </Paper>
      </Container>
    </>
  );
};

export default ContactPage;
