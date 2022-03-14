import { MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import ConsultationFetcherEdit from "../components/private/ConsultationFetcherEdit";
import ConsultationFetcherPublic from "../components/public/ConsultationFetcherPublic";

async function getListOfConsultations(cityName, cityState) {
  const response = await fetch("api/fetch-consultations", {
    method: "POST",
    body: JSON.stringify({ cityName, cityState }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kaut kas nogāja greizi");
  }

  return data;
}

export default function Home() {
  const largeScreen = useMediaQuery("(min-width: 820px)");

  return (
    <>
      <ConsultationFetcherPublic />
    </>
  );
}
