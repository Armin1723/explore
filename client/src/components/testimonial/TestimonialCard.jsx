import { Avatar, Card, Divider, Rating } from "@mantine/core";
import React from "react";
import { formatDate } from "../../utils";

const TestimonialCard = ({ testimonial }) => {

  return (
    <Card withBorder shadow='lg' className="flex flex-col gap-4 my-2">
      <div className="top flex w-full justify-between">
        <Rating value={parseInt(testimonial?.rating)} />
        <p className="text-sm text-gray-500">{formatDate(testimonial?.createdAt)}</p>
      </div>
      <Divider />
      <p className="text-lg">{testimonial?.message}</p>
      <Divider />
      <div className="user flex justify-start items-center gap-4">
            <Avatar/>
        <div className="userIcon flex flex-col">
            <p className="font-semibold">{testimonial?.name}</p>
            <p className="text-gray-400">{testimonial?.phone.slice(0, 2) + '******' + testimonial.phone.slice(8)}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
