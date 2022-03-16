import { useEffect, useState } from "react";
import { Group, Loader, Text } from "@mantine/core";

import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { db } from "../../lib/firebase";
import AttendeesCard from "./AttendeesCard";

const AttendeesFetcher = () => {
  const [attendees, setAttendees] = useState([]);
  const [uniqueConsultationIds, setUniqueConsultationIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "applications"));
      const querySnapshot = await getDocs(q);
      const att = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        att.push(doc.data());
      });
      setAttendees(att);
      setUniqueConsultationIds([...new Set(att.map((x) => x.consultation.id))]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const cardsd = uniqueConsultationIds.map((consultationId) => {
    const attendeesPerConsultation = [];
    attendees.forEach((attendee) => {
      if (attendee.consultation.id === consultationId) {
        attendeesPerConsultation.push(attendee);
      }
    });

    return (
      <AttendeesCard
        key={consultationId}
        consultation={attendeesPerConsultation[0].consultation}
        listOfAttendeesProp={attendeesPerConsultation}
      />
    );
  });

  return (
    <>
      <Text
        weight={900}
        align="left"
        variant=""
        size="xl"
        style={{
          fontSize: 30,
          lineHeight: 1.2,
          marginBottom: 20,
          marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        Konsultāciju apmeklētāji
      </Text>
      {loading ? (
        <Group position="center" mt="md">
          <Loader color="teal" />
        </Group>
      ) : (
        <>{cardsd}</>
      )}
    </>
  );
};

export default AttendeesFetcher;
