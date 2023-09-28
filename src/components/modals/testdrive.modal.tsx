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
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { object, string, array, TypeOf, boolean } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { divideIntervals, fromDayjsToDate } from "../../util";
import { useGetClientsQuery } from "../../redux/api/clientApi";
import { IClient } from "../../redux/api/types";
import { useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  useCreateTestdriveMutation,
  useLazyGetTestdriveByDateQuery,
} from "../../redux/api/testdriveApi";

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

const newTestDriveSchema = object({
  referal_link: string().min(1, "Referal link is required."),
  client: string().min(1, "Client field is required."),
  company: string().min(1, "Company is required"),
  date: string().min(1, "Date is required."),
  time_room: array(
    object({
      start: string(),
      end: string(),
      booked: boolean(),
    })
  ),
});

export type NewTestDriveSaveSchema = TypeOf<typeof newTestDriveSchema>;

const TestDriveModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const { t } = useTranslation();
  const [booking, setBooking] = useState<
    { start: string; end: string; booked: boolean }[]
  >([]);
  const [date, setDate] = useState<Dayjs>();

  const getState = useGetClientsQuery();
  const [createTestdrive, createState] = useCreateTestdriveMutation();
  const [getTestdriveByDate, getTestdriveState] =
    useLazyGetTestdriveByDateQuery();
  const settings = useAppSelector((state) => state.centerState.settings);

  const methods = useForm<NewTestDriveSaveSchema>({
    resolver: zodResolver(newTestDriveSchema),
  });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (createState.isSuccess) {
      toast.success(t("home.testdrive_modal.success_msg"));
      reset();
      props.setOpen(false);
      setBooking([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState]);

  useEffect(() => {
    if (getTestdriveState.isSuccess) {
      if (settings && date) {
        const testdrives = getTestdriveState.data;
        let booked_workstations: { [key: string]: number[] } = {};
        for (let i in testdrives) {
          for (let j in testdrives[i].time_rooms) {
            if (
              Object.keys(booked_workstations).includes(
                testdrives[i].time_rooms[j].start
              )
            ) {
              booked_workstations[testdrives[i].time_rooms[j].start].push(
                testdrives[i].time_rooms[j].workstation
              );
            } else {
              booked_workstations[testdrives[i].time_rooms[j].start] = [
                testdrives[i].time_rooms[j].workstation,
              ];
            }
          }
        }
        const now = new Date();
        const currentHour = now.getHours();
        const intervals = divideIntervals(
          settings.operating_hours[(date.day() + 6) % 7].start,
          settings.operating_hours[(date.day() + 6) % 7].end,
          settings.workstation_duration
        );
        let tempArray: { start: string; end: string; booked: boolean }[] = [];
        for (let i in intervals) {
          if (
            ((now.getDate() === date.date() &&
              parseInt(intervals[i].start) >= currentHour) ||
              now.getDate() < date.date()) &&
            (!Object.keys(booked_workstations).includes(intervals[i].start) ||
              booked_workstations[intervals[i].start].length)
          ) {
            tempArray.push({
              start: intervals[i].start,
              end: intervals[i].end,
              booked: false,
            });
          }
        }
        setBooking([...tempArray]);
        setValue("time_room", tempArray);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTestdriveState]);

  const onSubmitHandler: SubmitHandler<NewTestDriveSaveSchema> = (
    values: NewTestDriveSaveSchema
  ) => {
    createTestdrive(values);
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
                >
                  {t("home.testdrive_modal.launch_testdrive")}
                </Typography>
                <Typography textAlign="center">
                  {t("home.common.required")}
                </Typography>

                <Box textAlign="center">
                  <Typography mb={1}>
                    {t("home.testdrive_modal.referal_link")}
                  </Typography>
                  <TextField
                    {...register("referal_link")}
                    placeholder={
                      t("home.testdrive_modal.referal_link") as string
                    }
                    size="small"
                    disabled
                    sx={{
                      ".Mui-disabled": {
                        bgcolor: "rgba(217, 217,217, .41)",
                      },
                    }}
                    fullWidth
                  />
                </Box>

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
                      error={!!errors["client"]}
                      onChange={(event) => {
                        getState.data?.forEach((item: IClient) => {
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
                      {getState.data?.map((item, index) => (
                        <MenuItem key={`client_item_${index}`} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors["client"]?.message}</FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <Typography textAlign="center" mb={1}>
                    {t("home.common.company")}
                  </Typography>
                  <TextField
                    {...register("company")}
                    fullWidth
                    size="small"
                    disabled
                    sx={{
                      ".Mui-disabled": {
                        bgcolor: "rgba(217, 217,217, .41)",
                      },
                    }}
                  />
                </Box>
                <Stack
                  width={288}
                  bgcolor="rgba(217, 217,217, .41)"
                  borderRadius={4}
                  border="1px solid #999999"
                  py={3}
                  gap={2}
                  alignItems="center"
                >
                  <Typography>
                    {t("home.testdrive_modal.book_testdrive")}
                  </Typography>

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
                            if (value && settings) {
                              const currentDate = new Date();
                              const selectedDate = new Date(
                                value.year(),
                                value.month(),
                                value.date() + 1
                              );
                              if (selectedDate < currentDate) {
                                setBooking([]);
                                setValue("time_room", []);
                              } else {
                                getTestdriveByDate({
                                  date: fromDayjsToDate(value),
                                });
                              }
                              setValue("date", fromDayjsToDate(value));
                              setDate(value);
                            }
                          }}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <Box width="100%">
                    {booking.map((item, item_index) => (
                      <Box
                        bgcolor={!item.booked ? "#4BC362" : "#ea2049"}
                        p={2}
                        key={`book_item_${item_index}`}
                        my={2}
                        mx={8}
                        textAlign="center"
                        color={!item.booked ? "black" : "white"}
                        borderRadius={4}
                        onClick={() => {
                          for (let i in booking)
                            if (booking[i].start === item.start)
                              booking[i].booked = !booking[i].booked;
                          setBooking([...booking]);
                          setValue("time_room", booking);
                        }}
                      >
                        {item.start}
                      </Box>
                    ))}
                  </Box>
                </Stack>
              </Stack>
              <Box
                bgcolor="rgba(234,32,73,.15)"
                textAlign="center"
                mt={4}
                py={2}
                borderRadius={4}
                width={288}
                px={4}
              >
                <Typography fontWeight={600}>
                  {t("home.testdrive_modal.testdrive_meeting")}
                </Typography>
                <br />
                {booking.map((item, index) =>
                  item.booked ? (
                    <Typography
                      key={`book_history_item_${index}`}
                      sx={{ mb: 1 }}
                    >
                      {date?.year()}-{date?.month()}-{date?.date()} :{" "}
                      {item.start} - {item.end}
                    </Typography>
                  ) : null
                )}
              </Box>
              <Box display="flex" gap={2} mt={4}>
                <LoadingButton
                  variant="contained"
                  fullWidth
                  type="submit"
                  loading={createState.isLoading}
                >
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

export default TestDriveModal;
