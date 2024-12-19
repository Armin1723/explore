import { Card, Pill } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminCategories = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Card withBorder className="flex w-full h-full items-center justify-center rounded-lg ">
        <div className="loader"></div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col flex-1" withBorder>
        <div className="heading w-full border-l-4 border-primary my-4 flex items-center justify-start gap-2">
          <p className=" pl-6 text-xl tracking-wide">All Categories</p>
          <Link
            to="/admin/categories/add"
            className="p-2 aspect-square rounded-full border-r-2 border-primary hover:scale-[0.80] transition-all duration-150 scale-75"
          >
            <FaPlus />
          </Link>
        </div>
        <div className="users-container min-h-[50px] max-h-[400px] overflow-y-auto flex flex-col">
        {results &&
          results.categories.map((category, index) => {
            return (
              <div
                key={index}
                className={`categoryCard flex justify-between p-3 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
              >
                <div className="flex gap-4 font-medium">
                  <p className="font-semibold">{index + 1}.</p>
                  <Link
                    to={`/admin/companies/${category?.name}`}
                    className="font-medium"
                  >
                    {category?.name}
                  </Link>
                </div>

                <div className="sub-categories flex gap-2 flex-wrap justify-end">
                  {category?.subCategories.map((subCategory, index) => {
                    return (
                      <Pill key={index} color="brand.5" className="capitalize ">
                        {subCategory}
                      </Pill>
                    );
                  })}
                </div>
              </div>
            );
          })}
          </div>
    </div>
  );
};

export default AdminCategories;
