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
  { value: "8a", label: "8.a" },
  { value: "8b", label: "8.b" },
  { value: "8c", label: "8.c" },
  { value: "8d", label: "8.d" },
  { value: "8e", label: "8.e" },
  { value: "8g", label: "8.g" },
  { value: "8l", label: "8.l" },
  { value: "9a", label: "9.a" },
  { value: "9b", label: "9.b" },
  { value: "9c", label: "9.c" },
  { value: "9d", label: "9.d" },
  { value: "9e", label: "9.e" },
  { value: "9g", label: "9.g" },
];

const ConsultationFetcherPublic = () => {
  const [consultationsDateAndTime, setConsultationsDateAndTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const flag = useMediaQuery("(max-width: 464px)");
  const flagL = useMediaQuery("(min-width: 900px)");
  const flagXs = useMediaQuery("(max-width: 370px)");

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
    <Container>
      <Text
        weight={900}
        align="center"
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
        size="xl"
        style={{
          fontSize: 40,
          lineHeight: 1.2,
          marginBottom: 20,
          marginTop: 20,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        Fizikas konsultācijas
      </Text>
      <div
        style={{
          width: 35,
          position: "absolute",
          top: 31,
          left: flag ? "72vw" : flagL ? "72vw" : "90vw",
          transform: "rotate(45deg)",
          opacity: 0.8,
        }}
      >
        <Image
          radius="sm"
          src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg"
          alt="Random unsplash image"
        />
      </div>

      {!loading ? (
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
