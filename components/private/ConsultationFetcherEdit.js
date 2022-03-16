import { useEffect, useState } from "react";
import ConsultationsListEdit from "./ConsultationsListEdit";
import { Loader, Group, Text } from "@mantine/core";

import { getData } from "../../lib/utils";

const ConsultationFetcherEdit = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    const result = await getData("consultations", "Jekabs");
    setConsultations(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

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
          marginBottom: 40,
          marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        Konsultāciju rediģēšana
      </Text>
      {loading ? (
        <Group position="center" mt="md">
          <Loader color="teal" />
        </Group>
      ) : (
        <ConsultationsListEdit
          consultations={consultations}
          fetchConsultations={fetchConsultations}
        />
      )}
    </>
  );
};

export default ConsultationFetcherEdit;
