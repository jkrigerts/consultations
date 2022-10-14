import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Container,
  Text,
  Loader,
  Image,
  Center,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getData } from "../../lib/utils";
import ConsultationCardPublic from "./ConsultationCardPublic";

const cl = [
  { value: "IPa22", label: "IPa22" },
  { value: "IPb22", label: "IPb22" },
  { value: "IP19", label: "IP19" },
  { value: "Cita", label: "Cita" },
];

const ConsultationFetcherPublic = () => {
  const [consultationsDateAndTime, setConsultationsDateAndTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const flag = useMediaQuery("(max-width: 464px)");
  const flagXL = useMediaQuery("(min-width: 1120px)");
  const flagXXL = useMediaQuery("(min-width: 1370px)");
  const flagL = useMediaQuery("(min-width: 820px)");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getData("consultations", "Jekabs");
      let consultationsDateAndTimeTmp = [];
      querySnapshot.sort((a, b) =>
        a.cdate > b.cdate ? 1 : b.cdate > a.cdate ? -1 : 0
      );
      querySnapshot.forEach((consultation) => {
        consultationsDateAndTimeTmp.push(consultation);
      });
      setConsultationsDateAndTime(consultationsDateAndTimeTmp);
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderConsultations = consultationsDateAndTime.map((consultation) => {
    return (
      <ConsultationCardPublic
        key={consultation.id}
        consultation={consultation}
        classes={cl}
      />
    );
  });

  return (
    <Container
      style={{ position: "relative", paddingLeft: 8, paddingRight: 8 }}
    >
      <Text
        weight={900}
        align="center"
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        size="xl"
        style={{
          fontSize: flag ? 38 : 40,
          lineHeight: 1.2,
          marginBottom: 20,
          marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        Konsultācijas pie Jēkaba
      </Text>
      <div
        style={{
          width: 35,
          position: "absolute",
          top: flag ? 58 : 14,
          left: flag
            ? "82vw"
            : flagL
            ? flagXL
              ? flagXXL
                ? "52vw"
                : "63vw"
              : "78vw"
            : "92vw",
          transform: "rotate(45deg)",
          opacity: 0.8,
        }}
      >
        <Image
          radius="sm"
          src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
          alt="Support Ukraine"
        />
      </div>

      {!loading ? (
        renderConsultations.length === 0 ? (
          <Text align="center">Neviena konsultācija netika atrasta</Text>
        ) : (
          <SimpleGrid
            cols={2}
            spacing="xl"
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "md" },
              { maxWidth: 755, cols: 1, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {renderConsultations}
          </SimpleGrid>
        )
      ) : (
        <>
          <Text align="center">
            <Loader color="teal" />
          </Text>
        </>
      )}
    </Container>
  );
};

export default ConsultationFetcherPublic;
