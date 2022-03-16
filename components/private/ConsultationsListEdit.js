import { useEffect, useState } from "react";
import { useForm, formList } from "@mantine/form";
import {
  Switch,
  ActionIcon,
  NumberInput,
  Group,
  Box,
  Button,
  Code,
  Text,
  Card,
  MediaQuery,
  Loader,
} from "@mantine/core";
import { DatePicker, TimeRangeInput } from "@mantine/dates";
import "dayjs/locale/lv";
import { Calendar, Clock, Man, Trash, SquarePlus } from "tabler-icons-react";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { getData } from "../../lib/utils";

import { v4 as uuidV4 } from "uuid";

const ConsultationsListEdit = ({ consultations, fetchConsultations }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      consultations: formList(consultations),
    },
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    await setDoc(doc(db, "consultations", "Jekabs"), {
      ...data,
    });
    await fetchConsultations();
    setLoading(false);
  };

  const fields = form.values.consultations.map((_, index) => (
    <Group key={index} mt="xs">
      <DatePicker
        locale="lv"
        icon={<Calendar size={16} />}
        required
        sx={{ flex: 3 }}
        {...form.getListInputProps("consultations", index, "cdate")}
      />
      <TimeRangeInput
        icon={<Clock size={16} />}
        required
        sx={{ flex: 3 }}
        {...form.getListInputProps("consultations", index, "ctime")}
      />
      <NumberInput
        icon={<Man size={16} />}
        required
        sx={{ flex: 3 }}
        {...form.getListInputProps("consultations", index, "attendeesCnt")}
      />
      <Switch
        sx={{ flex: 1 }}
        onLabel="Jā"
        offLabel="Nē"
        size="md"
        checked={form.getListInputProps("consultations", index, "active").value}
        {...form.getListInputProps("consultations", index, "active")}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem("consultations", index)}
      >
        <Trash size={20} />
      </ActionIcon>
    </Group>
  ));

  console.log(
    JSON.stringify(consultations) == JSON.stringify(form.values.consultations)
  );
  console.log(JSON.stringify(form.values.consultations));
  console.log(JSON.stringify(consultations));

  const cardFields = form.values.consultations.map((_, index) => (
    <Card
      style={{ width: 340, margin: "auto", marginTop: 20 }}
      key={index}
      shadow="sm"
      withBorder
    >
      <Group mt="xs">
        <Text weight={500} size="sm" sx={{ flex: 1 }}>
          Datums
        </Text>
        <DatePicker
          locale="lv"
          icon={<Calendar size={16} />}
          required
          sx={{ flex: 2 }}
          {...form.getListInputProps("consultations", index, "cdate")}
        />
      </Group>
      <Group mt="xs">
        <Text weight={500} size="sm" sx={{ flex: 1 }}>
          Laiks
        </Text>
        <TimeRangeInput
          icon={<Clock size={16} />}
          required
          sx={{ flex: 2 }}
          {...form.getListInputProps("consultations", index, "ctime")}
        />
      </Group>
      <Group mt="xs">
        <Text weight={500} size="sm" sx={{ flex: 1 }}>
          Skolēnu skaits
        </Text>
        <NumberInput
          icon={<Man size={16} />}
          required
          sx={{ flex: 1 }}
          {...form.getListInputProps("consultations", index, "attendeesCnt")}
        />
      </Group>
      <Group mt="xs">
        <Text weight={500} size="sm" sx={{ flex: 1 }}>
          Ļaut pieteikties
        </Text>
        <Switch
          sx={{ flex: 1 }}
          onLabel="Jā"
          offLabel="Nē"
          size="md"
          checked={
            form.getListInputProps("consultations", index, "active").value
          }
          {...form.getListInputProps("consultations", index, "active")}
        />
      </Group>
      <ActionIcon
        color="red"
        variant="hover"
        mt="xs"
        onClick={() => form.removeListItem("consultations", index)}
      >
        <Trash size={20} />
      </ActionIcon>
    </Card>
  ));
  return (
    <Box sx={{ maxWidth: 768 }} mx="auto">
      {fields.length > 0 ? (
        <>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <div>
              <Group mt="xs">
                <Text weight={500} size="sm" sx={{ flex: 1 }}>
                  Datums
                </Text>
                <Text weight={500} size="sm" sx={{ flex: 1 }}>
                  Laiks
                </Text>
                <Text weight={500} size="sm" sx={{ flex: 1 }}>
                  Skolēnu skaits
                </Text>
                <Text weight={500} size="sm" pr={10}>
                  Ļaut pieteikties
                </Text>
              </Group>
              {fields}
            </div>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <div>{cardFields}</div>
          </MediaQuery>
        </>
      ) : (
        <Text color="dimmed" align="center">
          Nav nevienas konsultācijas...
        </Text>
      )}

      <Group position="left" mt="md">
        <ActionIcon
          color="green"
          variant="hover"
          onClick={() =>
            form.addListItem("consultations", {
              id: uuidV4(),
              cdate: new Date(new Date().setMilliseconds(0)),
              ctime: [
                new Date("May 31, 2022 14:55:00"),
                new Date("May 31, 2022 14:55:00"),
              ],
              attendeesCnt: 15,
              active: false,
            })
          }
        >
          <SquarePlus size={24} />
        </ActionIcon>
      </Group>
      <Group position="left" mt="md">
        {loading ? (
          <Loader color="teal" />
        ) : (
          <>
            <Button
              onClick={() => handleSubmit(form.values.consultations)}
              disabled={
                JSON.stringify(consultations) ==
                JSON.stringify(form.values.consultations)
              }
            >
              Saglabāt izmaiņas
            </Button>
            <Button
              onClick={form.reset}
              disabled={
                JSON.stringify(consultations) ==
                JSON.stringify(form.values.consultations)
              }
            >
              Atcelt
            </Button>
          </>
        )}
      </Group>
    </Box>
  );
};

export default ConsultationsListEdit;
