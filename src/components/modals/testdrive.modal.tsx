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
import { object, string, array, TypeOf, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import { toast } from "react-toastify";

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
      workstations: array(number()),
    })
  ),
});

export type NewTestDriveSaveSchema = TypeOf<typeof newTestDriveSchema>;

const TestDriveModal = (props: {
  setOpen: (flag: boolean) => void;
  open: boolean;
}) => {
  const [booking, setBooking] = useState<
    { start: string; end: string; workstations: Array<number> }[]
  >([]);
  const [availables, setAvailables] = useState<Array<Array<number>>>([]);
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
      toast.success(createState.data.message);
      reset();
      props.setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState]);

  useEffect(() => {
    if (getTestdriveState.isSuccess) {
      const testdrives = getTestdriveState.data;
      let booked_workstations: Array<Array<number>> = [];
      for (let i in testdrives) {
        if (i === "0") {
          for (let j in testdrives[i].time_rooms)
            booked_workstations.push(testdrives[i].time_rooms[j].workstations);
        } else {
          for (let j in testdrives[i].time_rooms)
            booked_workstations[parseInt(i)] = [
              ...booked_workstations[parseInt(i)],
              ...testdrives[i].time_rooms[j].workstations,
            ];
        }
      }
      let temporary: Array<Array<number>> = [];
      if (booked_workstations.length === 0) {
        temporary = [
          ...booking.map((_) => [
            ...Array.from({
              length: settings?.workstations as number,
            }).map((_, index) => index),
          ]),
        ];
      }
      for (let i in booked_workstations) {
        temporary.push(
          Array.from({
            length: settings?.workstations as number,
          })
            .map((_, index) => index)
            .filter((value) => !booked_workstations[i].includes(value))
        );
      }
      setAvailables([...temporary]);
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
                  LAUNCH TEST DRIVE
                </Typography>
                <Typography textAlign="center">
                  All fields are required
                </Typography>

                <Box textAlign="center">
                  <Typography mb={1}>Referal Link</Typography>
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
                    fullWidth
                  />
                </Box>

                <Box width={288}>
                  <FormControl fullWidth>
                    <InputLabel id="client-name-label" size="small">
                      Select client
                    </InputLabel>
                    <Select
                      {...register("client")}
                      labelId="client-name-label"
                      id="client-name-select"
                      label="Select client"
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
                    Company
                  </Typography>
                  <TextField
                    {...register("company")}
                    fullWidth
                    placeholder="Company"
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
                  <Typography>Book the Test Drive</Typography>

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
                            if (value && settings) {
                              let default_time_room = [];
                              let temporary = [];
                              if (settings) {
                                const intervals = divideIntervals(
                                  settings.operating_hours[
                                    (value.day() + 6) % 7
                                  ].start,
                                  settings.operating_hours[
                                    (value.day() + 6) % 7
                                  ].end,
                                  settings.workstation_duration
                                );
                                for (let i = 0; i < intervals.length; ++i) {
                                  default_time_room.push({
                                    start: intervals[i].start,
                                    end: intervals[i].end,
                                    workstations: [],
                                  });
                                  temporary.push([
                                    ...Array.from({
                                      length: settings?.workstations as number,
                                    }).map((_, index) => index),
                                  ]);
                                }
                                setAvailables([...temporary]);
                                setBooking([...default_time_room]);
                                setValue("time_room", default_time_room);
                              }
                              setValue("date", fromDayjsToDate(value));
                              getTestdriveByDate({
                                date: fromDayjsToDate(value),
                              });
                              setDate(value);
                            }
                          }}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>

                  <TextField
                    label="Time & Room"
                    sx={{ bgcolor: "white", width: "90%" }}
                    size="small"
                  />
                  <Box width="100%">
                    {booking.map((item, item_index) => (
                      <Box
                        display="flex"
                        width="100%"
                        px={2}
                        py={1}
                        justifyContent="space-between"
                        key={`booking_item_${item_index}`}
                        alignItems="center"
                      >
                        {availables[item_index] &&
                          availables[item_index].length !== 0 && (
                            <>
                              <Typography width="15%">{item.start}</Typography>
                              <Stack
                                flexDirection="row"
                                justifyContent="flex-start"
                                width="75%"
                                flexWrap="wrap"
                                gap={1}
                              >
                                {availables[item_index].map((value, index) => (
                                  <Box
                                    key={`room_${item_index}_${index}`}
                                    width="15%"
                                    height="45px"
                                    bgcolor={
                                      booking[item_index].workstations.includes(
                                        value
                                      )
                                        ? "rgba(225, 71, 71, 0.4)"
                                        : "rgba(76, 195, 102, 0.4)"
                                    }
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    onClick={(event) => {
                                      if (
                                        booking[
                                          item_index
                                        ].workstations.includes(value)
                                      )
                                        booking[item_index].workstations =
                                          booking[
                                            item_index
                                          ].workstations.filter(
                                            (workstation) =>
                                              workstation !== value
                                          );
                                      else
                                        booking[item_index].workstations.push(
                                          value
                                        );
                                      setBooking([...booking]);
                                      setValue("time_room", booking);
                                    }}
                                  >
                                    {value + 1}
                                  </Box>
                                ))}
                              </Stack>
                            </>
                          )}
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
                <Typography fontWeight={600}>Test Drive Meeting</Typography>
                <br />
                {booking.map((item, index) =>
                  item.workstations.length !== 0 ? (
                    <Box key={`booking_history_item_${index}`} sx={{ mb: 1 }}>
                      <Typography>
                        {date &&
                          `${date.year()}-${date.month() + 1}-${date.date()}`}
                        , {item.start} - {item.end}
                      </Typography>
                      <Typography sx={{ overflowWrap: "break-word" }}>
                        Room{" "}
                        {item.workstations
                          .sort((a, b) => a - b)
                          .map((value) => value + 1)
                          .join(",")}
                      </Typography>
                    </Box>
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
          </FormProvider>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TestDriveModal;
