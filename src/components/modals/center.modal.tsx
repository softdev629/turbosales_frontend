import { useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  SvgIcon,
  Divider,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { object, TypeOf, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { ReactComponent as NewCenterIcon1 } from "../../assets/images/ico_new_center_1.svg";
import { ReactComponent as NewCenterIcon2 } from "../../assets/images/ico_new_center_2.svg";
import { ReactComponent as NewCenterIcon3 } from "../../assets/images/ico_new_center_3.svg";
import { ReactComponent as NewCenterIcon4 } from "../../assets/images/ico_new_center_4.svg";
import { useAddCenterMutation } from "../../redux/api/centerApi";
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
  minWidth: "300px",
  overflow: "auto",
};

const newCenterSchema = object({
  referer_center_id: string().optional(),
  owner_name: string().min(1, "Owner Name is required."),
  owner_mobile: string()
    .min(1, "Owner mobile is required")
    .regex(/^([0-9]{1,5})?\s([0-9]{10,11})$/, "Invalid mobile format."),
  owner_email: string()
    .min(1, "Owner email is required")
    .email("Invalid email format"),
  owner_password: string()
    .min(1, "Owner password is required")
    .min(8, "Password must be longer than 8 characters."),
  manager_name: string().min(1, "Manager name is required"),
  manager_email: string()
    .min(1, "Manager email is required")
    .email("Invalid email format"),
  manager_password: string()
    .min(1, "Manager password is required")
    .min(8, "Password must be longer than 8 characters."),
  street: string().min(1, "Street is required"),
  city: string().min(1, "City is required"),
  zip_code: string().min(1, "Zip Code is required"),
  country: string().min(1, "Country is required"),
  subdomain: string().min(1, "Subdomain is required"),
  center_id: string().min(1, "Center ID is required"),
});

export type NewCenterSaveSchema = TypeOf<typeof newCenterSchema>;

const CenterModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const [addCenter, addState] = useAddCenterMutation();

  useEffect(() => {
    if (addState.isSuccess) {
      toast.success(addState.data.message);
      reset();
      props.setOpen(false);
    }
    if (addState.isError) {
      if (Array.isArray((addState.error as any).data.error))
        (addState.error as any).data.error.forEach((el: any) =>
          toast.error(el.message)
        );
      else toast.error((addState.error as any).data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addState]);

  const methods = useForm<NewCenterSaveSchema>({
    resolver: zodResolver(newCenterSchema),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<NewCenterSaveSchema> = (
    values: NewCenterSaveSchema
  ) => {
    addCenter(values);
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
        <Box
          sx={style}
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormProvider {...methods}>
            <Stack gap={3}>
              <Typography color="primary.main" variant="h5" textAlign="center">
                NEW AI CENTER
              </Typography>
              <Typography textAlign="center">
                All fields are required
              </Typography>
              <Box
                sx={{ border: "2px solid #ea2049" }}
                borderRadius={5}
                p={2}
                display="flex"
                width="100%"
              >
                <SvgIcon sx={{ fill: "#ea2049" }}>
                  <NewCenterIcon1 />
                </SvgIcon>
                <Typography ml={2} color="primary.main">
                  Who referred this AI Center?
                </Typography>
              </Box>
              <TextField
                {...register("referer_center_id")}
                label="Referer Center ID"
                size="small"
              />
              <Box
                sx={{ border: "2px solid #ea2049" }}
                borderRadius={5}
                p={2}
                display="flex"
                width="100%"
              >
                <SvgIcon sx={{ fill: "#ea2049" }}>
                  <NewCenterIcon2 />
                </SvgIcon>
                <Typography ml={2} color="primary.main">
                  Owner and Manager Info
                </Typography>
              </Box>
              <TextField
                {...register("owner_name")}
                label="Owner Name"
                size="small"
                error={!!errors["owner_name"]}
                helperText={errors["owner_name"]?.message}
              />
              <TextField
                {...register("owner_mobile")}
                label="Owner Mobile"
                size="small"
                type="tel"
                error={!!errors["owner_mobile"]}
                helperText={errors["owner_mobile"]?.message}
              />
              <TextField
                {...register("owner_email")}
                label="Owner Email"
                size="small"
                type="email"
                error={!!errors["owner_email"]}
                helperText={errors["owner_email"]?.message}
              />
              <TextField
                {...register("owner_password")}
                label="Owner Password"
                size="small"
                type="password"
                error={!!errors["owner_password"]}
                helperText={errors["owner_password"]?.message}
              />
              <Divider sx={{ borderColor: "#ea2049" }} />
              <TextField
                {...register("manager_name")}
                label="Manager Name"
                size="small"
                error={!!errors["manager_name"]}
                helperText={errors["manager_name"]?.message}
              />
              <TextField
                {...register("manager_email")}
                label="Manager Email"
                size="small"
                type="email"
                error={!!errors["manager_email"]}
                helperText={errors["manager_email"]?.message}
              />
              <TextField
                {...register("manager_password")}
                label="Manager Password"
                size="small"
                type="password"
                error={!!errors["manager_password"]}
                helperText={errors["manager_password"]?.message}
              />
              <Box
                sx={{ border: "2px solid #ea2049" }}
                borderRadius={5}
                p={2}
                display="flex"
                width="100%"
              >
                <SvgIcon sx={{ fill: "#ea2049" }}>
                  <NewCenterIcon3 />
                </SvgIcon>
                <Typography ml={2} color="primary.main">
                  AI Center Address
                </Typography>
              </Box>
              <TextField
                {...register("street")}
                label="Street"
                size="small"
                error={!!errors["street"]}
                helperText={errors["street"]?.message}
              />
              <TextField
                {...register("city")}
                label="City"
                size="small"
                error={!!errors["city"]}
                helperText={errors["city"]?.message}
              />
              <TextField
                {...register("zip_code")}
                label="Zip Code"
                size="small"
                error={!!errors["zip_code"]}
                helperText={errors["zip_code"]?.message}
              />
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
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
              <Box
                sx={{ border: "2px solid #ea2049" }}
                borderRadius={5}
                p={2}
                display="flex"
                width="100%"
              >
                <SvgIcon sx={{ fill: "#ea2049" }}>
                  <NewCenterIcon4 />
                </SvgIcon>
                <Typography ml={2} color="primary.main">
                  Subdomain & Center ID
                </Typography>
              </Box>
              <TextField
                {...register("subdomain")}
                label="Subdomain"
                placeholder="xxx.savvi.center"
                size="small"
                error={!!errors["subdomain"]}
                helperText={errors["subdomain"]?.message}
              />
              <TextField
                {...register("center_id")}
                label="Center ID"
                placeholder="country-city-'A00'"
                size="small"
                error={!!errors["center_id"]}
                helperText={errors["center_id"]?.message}
              />
            </Stack>
            <Box display="flex" gap={2} mt={4}>
              <LoadingButton
                loading={addState.isLoading}
                variant="contained"
                fullWidth
                type="submit"
              >
                Confirm
              </LoadingButton>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => props.setOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CenterModal;
