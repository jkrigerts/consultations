import { useEffect, useState } from "react";
import ConsultationsListEdit from "./ConsultationsListEdit";
import { Loader, Group } from "@mantine/core";

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
