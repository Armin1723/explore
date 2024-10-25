import {
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import contactImage from '../../assets/contact.svg'

const ContactForm = () => {
  const handleContact = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };
    console.log(data);
  };

  return (
    <div
      id="contact"
      className="w-full flex-col flex justify-center items-center bg-gradient-to-br from-blue-800/50 via-transparent to-blue-500/80 py-4"
    >
      <p className="w-[90vw] text-2xl pl-12 max-sm:pl-6 border-l-4 border-teal-400 mt-6 font-dm-serif">Contact Us</p>
      <div className="w-[90%] max-w-6xl rounded-lg py-8" ref={contactContainer}>
        <div className="flex items-center justify-between flex-col lg:flex-row gap-12">
          {/* Contact Information Section */}
          <div className="graphic w-full lg:w-1/2 flex flex-col items-center justify-center gap-6 py-6 px-4 rounded-md ">
            <img
              src={contactImage}
              alt="phone"
              className="object-cover"
            />
          </div>

          {/* Contact Form Section */}
          <form
            className="form w-full lg:w-1/2 bg-gray-50/10 p-6 rounded-lg shadow-[0_0_25px_blue] shadow-blue-800/50"
            onSubmit={handleContact}
          >
            <Text fz="lg" fw={700} className="mb-6 text-gray-800">
              Get in touch
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
              <TextInput
                name="name"
                label="Your name"
                placeholder="Your name"
                withAsterisk
                className="focus:ring-2 focus:ring-teal-400"
              />
              <TextInput
                name="email"
                label="Your email"
                placeholder="you@example.com"
                required
                className="focus:ring-2 focus:ring-teal-400"
              />
            </SimpleGrid>

            <TextInput
              mt="md"
              name="subject"
              label="Subject"
              placeholder="Subject"
              required
              className="focus:ring-2 focus:ring-teal-400"
            />

            <Textarea
              mt="md"
              name="message"
              label="Your message"
              placeholder="Please include all relevant information"
              minRows={5}
              className="focus:ring-2 focus:ring-teal-400"
            />

            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 transition-all text-white px-6 py-2 rounded-md"
              >
                Send message
              </Button>
            </Group>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
