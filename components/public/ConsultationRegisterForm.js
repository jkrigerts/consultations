import { useState } from "react";
import {
  TextInput,
  Select,
  Button,
  Text,
  Loader,
  Autocomplete,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { v4 as uuidV4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../../lib/firebase";

const listOfReasons = [
  "Pārrakstīt pārbaudes darbu",
  "Mācīties",
  "Parunāt par dzīvi",
];

const ConsultationRegisterForm = ({ consultation, classes }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      id: uuidV4(),
      firstName: "",
      surname: "",
      class: "",
      reason: "",
      consultation: consultation,
    },
  });

  const handleSubmit = (values) => {
    const addData = async () => {
      setLoading(true);
      console.log(values);
      await setDoc(doc(db, "applications", `${values.id}`), {
        ...values,
      });

      form.setValues({
        id: uuidV4(),
        firstName: "",
        surname: "",
        class: "",
        reason: "",
        consultation: consultation,
      });
      setLoading(false);
      setFormSubmitted(true);
    };

    addData();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Tavs vārds"
        placeholder="Skaidris"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        required
        label="Tavs uzvārds"
        placeholder="Odess"
        {...form.getInputProps("surname")}
      />
      <Select
        required
        mt="md"
        label="Tava klase"
        data={classes}
        {...form.getInputProps("class", { type: "select" })}
      />
      <Autocomplete
        label="Iemesls"
        required
        placeholder="Mācīties"
        {...form.getInputProps("reason")}
        data={listOfReasons}
      />
      {formSubmitted ? (
        <Text
          style={{ marginTop: 20 }}
          weight={800}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
        >
          Esi reģistrēts!
        </Text>
      ) : loading ? (
        <Loader color="teal" style={{ marginTop: 20 }} />
      ) : (
        <Button
          type="submit"
          style={{ marginTop: 20 }}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          size="md"
        >
          Pieteikties
        </Button>
      )}
    </form>
  );
};

export default ConsultationRegisterForm;
