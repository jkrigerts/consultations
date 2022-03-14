import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Modal,
  Button,
  Group,
  useMantineTheme,
  Transition,
} from "@mantine/core";

import ConsultationRegisterForm from "./ConsultationRegisterForm";

const monthNameMap = [
  "janvāris",
  "februāris",
  "marts",
  "aprīlis",
  "maijs",
  "jūnijs",
  "jūlijs",
  "augusts",
  "septembris",
  "oktobris",
  "novembris",
  "decembris",
];

const dayNameMap = [
  "Svētdiena",
  "Pirmdiena",
  "Otrdiena",
  "Trešdiena",
  "Ceturtdiena",
  "Piektdiena",
  "Sestdiena",
];

const ConsultationCardPublic = ({ consultation, classes }) => {
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  console.log(consultation);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
  }, []);

  const theme = useMantineTheme();
  console.log(ready);
  console.log(consultation.ctime);
  return (
    <Transition
      mounted={ready}
      transition="pop"
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <div
          style={{
            ...styles,
            width: 320,
            margin: "auto",
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <Card shadow="sm" p="xl" withBorder>
            <Group
              position="center"
              direction="column"
              spacing="xs"
              style={{ marginBottom: theme.spacing.lg }}
            >
              <Text weight={400} style={{ lineHeight: 0.8, marginTop: 15 }}>
                {dayNameMap[consultation.cdate.getDay()]}
              </Text>
              <Text
                weight={800}
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
                size="md"
                style={{ fontSize: 60, lineHeight: 0.8 }}
              >
                {`${consultation.cdate.getDate()}.`}
              </Text>
              <Text weight={400} style={{ lineHeight: 0.8 }}>
                {monthNameMap[consultation.cdate.getMonth()]}
              </Text>
            </Group>
            <Group
              position="center"
              direction="column"
              spacing="xs"
              style={{ marginBottom: theme.spacing.lg }}
            >
              <Text
                weight={700}
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
                size="xl"
                style={{ fontSize: 35, lineHeight: 0.8, marginTop: 20 }}
              >
                {`${consultation.ctime[0].getHours()}:${consultation.ctime[0].getMinutes()} - ${consultation.ctime[1].getHours()}:${consultation.ctime[1].getMinutes()}`}
              </Text>
            </Group>

            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Fizikas konsultācija"
            >
              <Text weight="bold" style={{ marginBottom: 20 }}>
                {`${
                  dayNameMap[consultation.cdate.getDay()]
                }, ${consultation.cdate.getDate()}. ${
                  monthNameMap[consultation.cdate.getMonth()]
                }, ${consultation.ctime[0].getHours()}:${consultation.ctime[0].getMinutes()} - ${consultation.ctime[1].getHours()}:${consultation.ctime[1].getMinutes()}`}
              </Text>
              <ConsultationRegisterForm
                consultation={consultation}
                classes={classes}
              />
            </Modal>

            <Group position="center">
              <Button
                variant={consultation.active ? "gradient" : "subtle"}
                gradient={{ from: "teal", to: "lime", deg: 105 }}
                size="md"
                style={{ marginTop: 20, marginBottom: 15 }}
                onClick={() => setOpened(true)}
                disabled={!consultation.active}
              >
                {consultation.active ? "Pieteikties" : "Nevar pieteikties"}
              </Button>
            </Group>
          </Card>
        </div>
      )}
    </Transition>
  );
};

export default ConsultationCardPublic;
