import {
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { PiNavigationArrow } from "react-icons/pi";
import { Link } from "react-router-dom";

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
    <div id="contact" className="w-full pb-16 flex justify-center items-center">
      <div className="w-[90%] max-w-6xl rounded-lg p-8">
        <p className="text-3xl font-bold mb-8 ">Contact Us</p>

        <div className="form flex items-center justify-between flex-col lg:flex-row gap-12">
          {/* Contact Information Section */}
          <div className="details w-full lg:w-1/2 flex flex-col items-center gap-6 py-6 px-4 rounded-md ">
            <p className="text-xl font-semibold ">Contact Information</p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-3xl text-green-500" />
                <div>
                  <p className="font-semibold ">Whatsapp</p>
                  <p className="text-gray-500">+91 1234567890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MdEmail className="text-3xl text-blue-500" />
                <div>
                  <p className="font-semibold ">Email</p>
                  <p className="text-gray-500">abc.d@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <PiNavigationArrow className="text-3xl text-red-500" />
                <div>
                  <p className="font-semibold ">Address</p>
                  <p className="text-gray-500">
                    123, xyz street, abc city, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <form
            className="w-full lg:w-1/2 bg-gray-50/10 p-6 rounded-lg shadow-md"
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
