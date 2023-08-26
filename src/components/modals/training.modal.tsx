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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import { fromDayjsToDate } from "../../util";

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

const newTrainingSchema = object({
  date: string(),
});

export type NewTrainingSaveSchema = TypeOf<typeof newTrainingSchema>;

const TrainingModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const methods = useForm<NewTrainingSaveSchema>({
    resolver: zodResolver(newTrainingSchema),
  });

  const {
    // handleSubmit,
    register,
    setValue,
    // formState: { errors },
  } = methods;

  // const onSubmitHandler: SubmitHandler<NewTrainingSaveSchema> = (
  //   values: NewTrainingSaveSchema
  // ) => {
  //   console.log(values);
  // };

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
          <Stack gap={3}>
            <Typography color="primary.main" variant="h5" textAlign="center">
              LAUNCH TRAINING
            </Typography>
            <Typography textAlign="center">All fields are required</Typography>
            <TextField
              label="Referal Link"
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
                  Select client
                </InputLabel>
                <Select
                  labelId="client-name-label"
                  id="client-name-select"
                  label="Age"
                  size="small"
                  defaultValue=""
                >
                  <MenuItem value={10}>Client 1</MenuItem>
                  <MenuItem value={20}>Client 2</MenuItem>
                  <MenuItem value={30}>Client 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="Company"
              size="small"
              disabled
              sx={{
                ".Mui-disabled": {
                  bgcolor: "rgba(217, 217,217, .41)",
                },
              }}
            />
            <TextField label="Name of Student" size="small" />
            <Stack
              width={288}
              bgcolor="rgba(217, 217,217, .41)"
              borderRadius={4}
              border="1px solid #999999"
              py={3}
              gap={2}
              alignItems="center"
            >
              <Typography>Book the Training</Typography>

              <TextField
                {...register("date")}
                placeholder="Date"
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

              <TextField
                label="Time & Workstation"
                sx={{ bgcolor: "white", width: "90%" }}
                size="small"
              />

              <Box
                display="flex"
                width="100%"
                p={2}
                justifyContent="space-between"
              >
                <Typography width="15%">09:00 to 12:00</Typography>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-start"
                  width="80%"
                  flexWrap="wrap"
                  gap={1}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
                    <Box
                      key={`workstation_1_${index}`}
                      width="15%"
                      height="45px"
                      bgcolor="rgba(76, 195, 102, 0.4)"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {item}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <Box
            bgcolor="rgba(234,32,73,.15)"
            textAlign="center"
            mt={4}
            py={2}
            borderRadius={4}
          >
            <Typography fontWeight={600}>Pitch Meeting</Typography>
            <br />
            <Typography>2023-08-17, 09:00 - 10:00</Typography>
            <Typography>Room C</Typography>
          </Box>
          <Box display="flex" gap={2} mt={4}>
            <LoadingButton variant="contained" fullWidth>
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default TrainingModal;
