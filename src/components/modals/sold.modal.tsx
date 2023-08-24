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

const newSoldSchema = object({
  date: string(),
});

export type NewSoldSaveSchema = TypeOf<typeof newSoldSchema>;

const SoldModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const methods = useForm<NewSoldSaveSchema>({
    resolver: zodResolver(newSoldSchema),
  });

  const {
    // handleSubmit,
    register,
    setValue,
    // formState: { errors },
  } = methods;

  // const onSubmitHandler: SubmitHandler<NewSoldSaveSchema> = (
  //   values: NewSoldSaveSchema
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
            <Typography
              color="primary.main"
              variant="h5"
              textAlign="center"
              mt={2}
            >
              SALE COMPLETED
            </Typography>
            <Typography color="primary.main" textAlign="center" width={288}>
              Congratulations! You made a sale. Please input the info to process
              your commission.
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
            <Stack
              width={288}
              bgcolor="rgba(217, 217,217, .41)"
              borderRadius={4}
              border="1px solid #999999"
              py={3}
              gap={2}
              alignItems="center"
            >
              <Typography>Purchase Date</Typography>

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
            </Stack>
          </Stack>
          <Box width={288} mt={3}>
            <FormControl fullWidth>
              <InputLabel id="product-label" size="small">
                Select product
              </InputLabel>
              <Select
                labelId="product-label"
                id="product-select"
                label="Age"
                size="small"
                defaultValue=""
              >
                <MenuItem value={10}>Workstation</MenuItem>
                <MenuItem value={20}>Client 2</MenuItem>
                <MenuItem value={30}>Client 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width={288} mt={3}>
            <TextField
              label="Commissions Rate"
              defaultValue="10%"
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
            <TextField label="Amount" size="small" fullWidth />
          </Box>

          <Box width={288} mt={3}>
            <TextField
              label="Commissions"
              defaultValue="€300"
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
            sx={{ border: "1px solid #D9D9D9", p: 2, mt: 3, borderRadius: 4 }}
            fullWidth
          >
            <FormLabel
              id="payment-radio-buttons-group-label"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Payment Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="payment-radio-buttons-group-label"
              defaultValue="credit"
              name="payment-buttons-group"
            >
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Credit Card"
              />
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label="Bank Transfer"
              />
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            </RadioGroup>
          </FormControl>

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

export default SoldModal;
