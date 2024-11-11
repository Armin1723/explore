import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumbNav from "../shared/BreadCrumbNav";
import { ScrollArea, Select } from "@mantine/core";
import CompanyCardSmall from "./CompanyCardSmall";
import Pagination from "../shared/Pagination";
import AdvertisementCard from "../shared/AdvertisementCard";
import { useSelector } from "react-redux";
import { getSubCategories } from "../../utils";

const Categories = () => {
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const categoryParam = searchParams.get("category");
  const subCategoryParam = searchParams.get("subCategory");

  const [category, setCategory] = useState(categoryParam || "");
  const [subCategory, setSubCategory] = useState(subCategoryParam || "");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(pageParam || 1);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const reset = () => {
    setCategory("all");
    setSubCategory("all");
    setSort("");
    navigate("/companies/categories?category=all");
    setPage(1);
  };

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/company?category=${category}&subCategory=${subCategory}&sort=${sort}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("An error occurred while fetching companies");
        }
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchResults();
  }, [category, subCategory, sort, page, pageParam]);

  return (
    <div className="page flex flex-col w-[90%] py-4 overflow-x-hidden">
      <BreadCrumbNav />
      <p className="heading capitalize !my-2">
        {category} results in Lucknow.{" "}
      </p>
      <div className="filters flex flex-wrap justify-start gap-4 max-sm:gap-2 items-center py-2">
        <p className="text-sm">All filters</p>
        <div className="max-sm:w-[150px] w-fit">
          <Select
            data={["all", ...Object.values(categories).map((cat) => cat.name)]}
            value={category}
            placeholder={categoryParam ?? "Chose Category"}
            clearable
            onClear={() => setCategory("")}
            onChange={(value) => {
              setCategory(value);
              setSubCategory("");
              navigate(`/companies/categories?category=${value}`);
            }}
          />
        </div>
        <div className="max-sm:w-[150px] w-fit">
          <Select
            data={getSubCategories(category) || ["all"]}
            value={subCategory}
            placeholder="Chose Sub Category"
            onChange={setSubCategory}
            onClear={() => setSubCategory("")}
            clearable
            disabled={!category || category.toLowerCase() === "all"}
          />
        </div>
        <div className="max-sm:w-[150px] w-fit">
          <Select
            data={["Rating", "Name", "createdAt"]}
            value={sort}
            placeholder="Sort By"
            onChange={setSort}
            clearable
          />
        </div>
        <p
          className="text-xs italic text-blue-400 cursor-pointer"
          onClick={reset}
        >
          Clear all filters
        </p>
      </div>

      <div className="cards-container w-full flex max-lg:flex-col gap-4 overflow-x-hidden">
        <ScrollArea
        offsetScrollbars
        scrollbarSize={6}
        scrollHideDelay={500} h={600} className="w-full ">
          <div className="cards max-lg:w-full overflow-y-scroll p-4 max-sm:p-1 overflow-x-hidden flex flex-col gap-4">
            {results?.companies?.length ? (
              results.companies.map((company, index) => (
                <CompanyCardSmall company={company} key={index} />
              ))
            ) : loading ? (
              <div className="w-full min-h-[50vh] rounded-xl border p-2 boder-black/70 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="w-full p-2 boder-black/70 flex flex-col items-start justify-start">
                <p className="heading p-4">No companies found</p>
                <p
                  className="px-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-all duration-200 font-['inter']"
                  onClick={reset}
                >
                  Search for all??
                </p>
              </div>
            )}
            {results?.totalPages > 1 && (
              <Pagination
                totalPages={results.totalPages}
                page={page}
                setPage={setPage}
              />
            )}
          </div>
        </ScrollArea>

        <div className="sidebar w-1/3 max-lg:w-full">
          <AdvertisementCard />
        </div>
      </div>
    </div>
  );
};

export default Categories;
