import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BreadCrumbNav from "../shared/BreadCrumbNav";
import CategorySelectInput from "./CategorySelectInput";
import { categories } from "../../utils";
import { Select } from "@mantine/core";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subCategoryParam = searchParams.get("subCategory");
  const pageParam = searchParams.get("page");

  const [category, setCategory] = useState(categoryParam || "all");
  const [subCategory, setSubCategory] = useState(subCategoryParam || "all");
  const [page, setPage] = useState(pageParam || 1);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="page flex flex-col w-[90%] py-4">
      <BreadCrumbNav />
      <p className="heading capitalize !my-2">
        {category} results in Lucknow.{" "}
      </p>
      <div className="filters flex gap-4 items-center">
        <p>All filters</p>
        <Select
          data={["All", ...Object.keys(categories)]}
          value={category}
          placeholder={category === "all" ? "Chose Category" : category}
          onChange={(value) => {
            setCategory(value);
          }}
        />
        <Select
          data={["All", ...Object.keys(categories)]}
          value={category}
          placeholder={category === "all" ? "Chose Category" : category}
          onChange={(value) => {
            setCategory(value);
          }}
        />
       
      </div>
    </div>
  );
};

export default Categories;
