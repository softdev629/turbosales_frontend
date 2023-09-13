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

const ClientModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const [salesReferalLink, setSalesReferalLink] = useState("");
  const user = useAppSelector((state) => state.userState.user);

  const [addClient, addState] = useAddClientMutation();

  useEffect(() => {
    if (props.open)
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
      toast.success(addState.data.message);
    }
    if (addState.isError) {
      console.log(addState.error);
      if (Array.isArray((addState.error as any).data.error))
        (addState.error as any).data.error.forEach((el: any) =>
          toast.error(el.message)
        );
      else toast.error((addState.error as any).data.message);
    }
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
                  <Controller
                    control={control}
                    name="center_id"
                    defaultValue={user?.center_id}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Center ID"
                        size="small"
                        disabled
                        sx={{
                          ".Mui-disabled": {
                            bgcolor: "rgba(217, 217,217, .41)",
                          },
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!errors["center_id"]}
                        helperText={errors["center_id"]?.message}
                        fullWidth
                      />
                    )}
                  />
                </Box>
                <Box width={288}>
                  <Controller
                    control={control}
                    name="sales_rep_referal_link"
                    defaultValue={salesReferalLink}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        label="Sales Rep Referral Link"
                        error={!!errors["sales_rep_referal_link"]}
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
                          label="Choose a country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
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
                <LoadingButton type="submit" variant="contained" fullWidth>
                  Confirm
                </LoadingButton>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => props.setOpen(false)}
                >
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

export default ClientModal;
