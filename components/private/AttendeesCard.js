import { useState } from "react";

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
  Loader,
  Center,
} from "@mantine/core";
import { Trash } from "tabler-icons-react";

import { doc, deleteDoc } from "firebase/firestore";

import { db } from "../../lib/firebase";
import { monthNameMap, dayNameMap } from "../../lib/utils";

const AttendeesCard = ({ consultation, listOfAttendeesProp }) => {
  const [loading, setLoading] = useState(false);
  const [listOfAttendees, setListOfAttendees] = useState(listOfAttendeesProp);

  const handleDelete = async (attendee) => {
    console.log(attendee.id);
    setLoading(true);
    await deleteDoc(doc(db, "applications", attendee.id));

    const index = listOfAttendees.indexOf(attendee);
    console.log(index);
    if (index > -1) {
      setListOfAttendees([
        ...listOfAttendees.slice(0, index),
        ...listOfAttendees.slice(index + 1),
      ]);
    }
    console.log(listOfAttendees);
    setLoading(false);
  };

  const rows = listOfAttendees.map((attendee) => (
    <tr key={attendee.id}>
      <td>{`${attendee.firstName} ${attendee.surname}`}</td>
      <td>{attendee.class}</td>
      <td>{attendee.reason}</td>
      <td>
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => handleDelete(attendee)}
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
        {listOfAttendees.length === 0 ? (
          <Text>Neviens nav pieteicies</Text>
        ) : loading ? (
          <Center>
            <Loader color="teal" />
          </Center>
        ) : (
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
        )}
      </Card>
    </div>
  );
};

export default AttendeesCard;
