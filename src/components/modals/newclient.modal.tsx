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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { object, string, boolean, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  referal_link: string()
    .min(1, "Sales rep referal link is required.")
    .optional(),
  name: string().min(1, "Name is required"),
  title: string().min(1, "Title is required"),
  mobile: string()
    .min(1, "Mobile is required")
    .regex(/^([0-9]{1,5})?\s([0-9]{10,11})$/, "Invalid mobile format."),
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

const NewClientModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const methods = useForm<NewClientSaveInput>({
    resolver: zodResolver(newClientInfoSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<NewClientSaveInput> = (
    values: NewClientSaveInput
  ) => {
    console.log(values);
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
            NEW CLIENT
          </Typography>
          <Typography mb={4}>All fields are required</Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
            >
              <Box display="flex" gap={2} flexWrap="wrap">
                <Box width={288}>
                  {/* <Typography textAlign="center" mb={1}>
                  Center ID
                </Typography> */}
                  <TextField
                    {...register("center_id")}
                    label="Center ID"
                    error={!!errors["center_id"]}
                    required
                    helperText={errors["center_id"]?.message}
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
                    defaultValue="33-1-A01"
                  />
                </Box>
                <Box width={288}>
                  <TextField
                    {...register("referal_link")}
                    required
                    label="Sales Rep Referral Link"
                    error={!!errors["referal_link"]}
                    helperText={errors["referal_link"]?.message}
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
                    defaultValue="33-1-A01-S03"
                  />
                </Box>
              </Box>

              <Box mt={2}>
                <Typography>Client Info</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Box width={288}>
                    <TextField
                      {...register("name")}
                      label="Name"
                      error={!!errors["name"]}
                      helperText={errors["name"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter name here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      {...register("title")}
                      label="Title"
                      error={!!errors["title"]}
                      helperText={errors["title"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter title here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      {...register("mobile")}
                      label="Mobile"
                      error={!!errors["mobile"]}
                      helperText={errors["mobile"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter mobile here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      {...register("email")}
                      label="Email"
                      error={!!errors["email"]}
                      helperText={errors["email"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter email here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label="Company"
                      {...register("company")}
                      error={!!errors["company"]}
                      helperText={errors["company"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter company here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label="Website"
                      {...register("website")}
                      error={!!errors["website"]}
                      helperText={errors["website"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter website here."
                    />
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography>Address</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Box width={288}>
                    <TextField
                      label="Street"
                      {...register("street")}
                      error={!!errors["street"]}
                      helperText={errors["street"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter street here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label="City"
                      {...register("city")}
                      error={!!errors["city"]}
                      helperText={errors["city"]?.message}
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
                      label="Zip Code"
                      {...register("zip_code")}
                      error={!!errors["zip_code"]}
                      helperText={errors["zip_code"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter zip code here."
                    />
                  </Box>
                  <Box width={288}>
                    <TextField
                      label="Country"
                      {...register("country")}
                      error={!!errors["country"]}
                      helperText={errors["country"]?.message}
                      fullWidth
                      size="small"
                      sx={{
                        ".MuiInputBase-input": {
                          textAlign: "center",
                        },
                      }}
                      placeholder="Enter country here."
                    />
                  </Box>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography>Business Activity</Typography>
                <Box width={288}>
                  <TextField
                    {...register("business_activity")}
                    error={!!errors["business_activity"]}
                    helperText={errors["business_activity"]?.message}
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
                <FormLabel sx={{ color: "black" }}>Client Interest</FormLabel>
                <FormGroup sx={{ flexDirection: "row" }}>
                  <FormControlLabel
                    control={<Checkbox {...register("check_annual")} />}
                    label="Annual Membership"
                  />
                  <FormControlLabel
                    control={<Checkbox {...register("check_ai_center")} />}
                    label="AI Center Franchise"
                  />
                  <FormControlLabel
                    control={<Checkbox {...register("check_international")} />}
                    label="International Sales Services"
                  />
                </FormGroup>
              </FormControl>
              <Stack flexDirection="row" justifyContent="center" gap={2} mt={4}>
                <LoadingButton type="submit" variant="contained">
                  Confirm
                </LoadingButton>
                <Button variant="outlined" onClick={() => props.setOpen(false)}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewClientModal;
