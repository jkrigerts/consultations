import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Table,
  ActionIcon,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";

import { monthNameMap, dayNameMap } from "../../lib/utils";

const AttendeesCard = ({ consultation, listOfAttendees }) => {
  const rows = listOfAttendees.map((attendee) => (
    <tr key={attendee.id}>
      <td>{`${attendee.firstName} ${attendee.surname}`}</td>
      <td>{attendee.class}</td>
      <td>{attendee.reason}</td>
      <td>
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => console.log("Hi")}
        >
          <Trash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <div
      style={{ maxWidth: 680, margin: "auto", marginTop: 20, marginBottom: 40 }}
    >
      <Card shadow="sm" p="lg" withBorder style={{ margin: 10 }}>
        <Text weight="bold" style={{ marginBottom: 20 }}>
          {`${
            dayNameMap[consultation.cdate.toDate().getDay()]
          }, ${consultation.cdate.toDate().getDate()}. ${
            monthNameMap[consultation.cdate.toDate().getMonth()]
          }, ${consultation.ctime[0]
            .toDate()
            .getHours()}:${consultation.ctime[0]
            .toDate()
            .getMinutes()} - ${consultation.ctime[1]
            .toDate()
            .getHours()}:${consultation.ctime[1].toDate().getMinutes()}`}
        </Text>

        <Table striped>
          <thead>
            <tr>
              <th>Skolēns</th>
              <th>Klase</th>
              <th>Iemesls</th>
              <th>Dzēst</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    </div>
  );
};

export default AttendeesCard;
