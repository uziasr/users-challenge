import React from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NewUser, User } from "../../types/user";
import { useUserContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";

export const CreateUserForm = () => {
  const [addAddress, setAddAddress] = React.useState(false);
  const [addCompany, setAddCompany] = React.useState(false);
  const { users, createUser } = useUserContext();
  const navigate = useNavigate();

  const initialValues: NewUser = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    // address
    addressStreet: "",
    addressSuite: "",
    addressCity: "",
    addressZipcode: "",
    addressGeoLat: "",
    addressGeoLng: "",
    // company
    companyName: "",
    companyCatchPhrase: "",
    companyBs: "",
  };

  const form = useForm({
    initialValues: initialValues,
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
      username: (value) =>
        value.length < 2 ? "Username must be at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value.length == 0
          ? null
          : value.length < 10
            ? "Phone number must be at least 10 digits"
            : null,
      website: (value) =>
        value.length == 0
          ? null
          : /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(value)
            ? null
            : "Invalid website URL",
      addressStreet: (value) =>
        addAddress && value.length < 2
          ? "Address street must be at least 2 characters"
          : null,
      addressCity: (value) =>
        addAddress && value.length < 2
          ? "Address city must be at least 2 characters"
          : null,
      addressZipcode: (value) =>
        addAddress && value.length < 5
          ? "Address zipcode must be at least 5 characters"
          : null,
      addressGeoLat: (value) => {
        if (!addAddress || value.length == 0) return null;
        return value.length < 2
          ? "Address geo latitude must be at least 2 characters"
          : null;
      },
      addressGeoLng: (value) => {
        if (!addAddress || value.length == 0) return null;
        return value.length < 2
          ? "Address geo latitude must be at least 2 characters"
          : null;
      },
      companyName: (value) =>
        addCompany && value.length < 1
          ? "Company name must be at least 1 characters"
          : null,
    },
  });

  const handleAddressToggle = () => {
    setAddAddress((prev) => !prev);
    form.setFieldValue("addressStreet", "");
    form.setFieldValue("addressSuite", "");
    form.setFieldValue("addressCity", "");
    form.setFieldValue("addressZipcode", "");
    form.setFieldValue("addressGeoLat", "");
    form.setFieldValue("addressGeoLng", "");
  };

  const handleCompanyToggle = () => {
    setAddCompany((prev) => !prev);
    form.setFieldValue("companyName", "");
    form.setFieldValue("companyCatchPhrase", "");
    form.setFieldValue("companyBs", "");
  };

  const handleSubmit = (values: NewUser) => {
    const newId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
    };

    if (addAddress) {
      newUser.address = {
        street: values.addressStreet,
        suite: values.addressSuite,
        city: values.addressCity,
        zipcode: values.addressZipcode,
        geo: {
          lat: values.addressGeoLat,
          lng: values.addressGeoLng,
        },
      };
    }
    if (addCompany) {
      newUser.company = {
        name: values.companyName,
        catchPhrase: values.companyCatchPhrase,
        bs: values.companyBs,
      };
    }
    createUser(newUser);
    navigate("/"); // Redirect to the main page after creating the user
    form.reset(); // Reset the form after submission
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          key={form.key("name")}
          {...form.getInputProps("name")}
          required
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          key={form.key("username")}
          {...form.getInputProps("username")}
          required
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          key={form.key("email")}
          {...form.getInputProps("email")}
          required
        />
        <TextInput
          label="Phone"
          placeholder="Enter your phone number"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />
        <TextInput
          label="Website"
          placeholder="Enter your website URL"
          key={form.key("website")}
          {...form.getInputProps("website")}
        />
        {addAddress && (
          <>
            <TextInput
              label="Address Street"
              placeholder="Enter street address"
              key={form.key("addressStreet")}
              {...form.getInputProps("addressStreet")}
              required
            />
            <TextInput
              label="Address Suite"
              placeholder="Enter suite"
              key={form.key("addressSuite")}
              {...form.getInputProps("addressSuite")}
            />
            <TextInput
              label="Address City"
              placeholder="Enter city"
              key={form.key("addressCity")}
              {...form.getInputProps("addressCity")}
              required
            />
            <TextInput
              label="Address Zipcode"
              placeholder="Enter zipcode"
              key={form.key("addressZipcode")}
              {...form.getInputProps("addressZipcode")}
              required
            />
            <TextInput
              label="Address Geo Lat"
              placeholder="Enter latitude"
              key={form.key("addressGeoLat")}
              {...form.getInputProps("addressGeoLat")}
            />
            <TextInput
              label="Address Geo Lng"
              placeholder="Enter longitude"
              key={form.key("addressGeoLng")}
              {...form.getInputProps("addressGeoLng")}
            />
          </>
        )}
        {addCompany && (
          <>
            <TextInput
              label="Company Name"
              placeholder="Enter company name"
              key={form.key("companyName")}
              {...form.getInputProps("companyName")}
              required
            />
            <TextInput
              label="Company Catch Phrase"
              placeholder="Enter company catch phrase"
              key={form.key("companyCatchPhrase")}
              {...form.getInputProps("companyCatchPhrase")}
            />
            <TextInput
              label="Company BS"
              placeholder="Enter company BS"
              key={form.key("companyBs")}
              {...form.getInputProps("companyBs")}
            />
          </>
        )}

        <Group mt="md">
          <Button onClick={handleAddressToggle}>
            {addAddress ? "Remove Address" : "Add Address"}
          </Button>
          <Button onClick={handleCompanyToggle}>
            {addCompany ? "Remove Company" : "Add Company"}
          </Button>
          <Button type="submit" onClick={() => console.log(form)}>
            Create User
          </Button>
          <Button onClick={() => navigate("/")} color="red">
            Cancel
          </Button>
        </Group>
      </form>
    </>
  );
};
