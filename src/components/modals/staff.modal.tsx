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
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { object, TypeOf, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useAddStaffMutation } from "../../redux/api/userApi";
import { useAppSelector } from "../../redux/store";

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

const newStaffSchema = object({
  center_id: string().min(1, "Center ID is required.").optional(),
  name: string().min(1, "Name is required."),
  mobile: string()
    .min(1, "Mobile is required")
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Invalid mobile format."),
  email: string().min(1, "Email is required").email("Invalid email format"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be longer than 8 characters."),
  role: string().min(1, "Type of Staff is required."),
});

export type NewStaffSaveSchema = TypeOf<typeof newStaffSchema>;

const StaffModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const [addStaff, addState] = useAddStaffMutation();
  const user = useAppSelector((state) => state.userState.user);

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

  const methods = useForm<NewStaffSaveSchema>({
    resolver: zodResolver(newStaffSchema),
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<NewStaffSaveSchema> = (
    values: NewStaffSaveSchema
  ) => {
    addStaff(values);
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
                NEW STAFF
              </Typography>
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
                  />
                )}
              />

              <TextField
                {...register("name")}
                label="Name"
                size="small"
                error={!!errors["name"]}
                helperText={errors["name"]?.message}
              />
              <TextField
                {...register("mobile")}
                label="Mobile"
                size="small"
                type="tel"
                {...register("mobile")}
                error={!!errors["mobile"]}
                helperText={errors["mobile"]?.message}
              />
              <TextField
                {...register("email")}
                label="Email"
                size="small"
                type="email"
                error={!!errors["email"]}
                helperText={errors["email"]?.message}
              />
              <TextField
                {...register("password")}
                label="Password"
                placeholder="Create Password for Staff"
                size="small"
                type="password"
                error={!!errors["password"]}
                helperText={errors["password"]?.message}
              />
              <FormControl
                sx={{ border: "1px solid #D9D9D9", borderRadius: 2, p: 2 }}
              >
                <FormLabel id="role-radio-buttons-group-label">
                  Type of Staff
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
                    >
                      <FormControlLabel
                        value="manager"
                        control={<Radio />}
                        label="Manager"
                      />
                      <FormControlLabel
                        value="sales"
                        control={<Radio />}
                        label="Sales Rep"
                      />
                      <FormControlLabel
                        value="reseller"
                        control={<Radio />}
                        label="Reseller"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
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

export default StaffModal;
