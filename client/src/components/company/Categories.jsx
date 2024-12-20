import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BreadCrumbNav from "../shared/BreadCrumbNav";
import { Select } from "@mantine/core";
import CompanyCardSmall from "./CompanyCardSmall";
import Pagination from "../shared/Pagination";
import AdvertisementCard from "../shared/AdvertisementCard";
import { useSelector } from "react-redux";
import { getSubCategories } from "../../utils";
import { Helmet } from "react-helmet-async";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const { category: categoryParam } = useParams();
  const pageParam = searchParams.get("page");
  const subCategoryParam = searchParams.get("subCategory");

  const [category, setCategory] = useState(categoryParam || "all");
  const [subCategory, setSubCategory] = useState(subCategoryParam || "all");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(pageParam || 1);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories);

  // Sync category state with categoryParam
  useEffect(() => {
    setCategory((categoryParam?.charAt(0).toUpperCase() + categoryParam?.slice(1)) || "all");
  }, [categoryParam]);

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
  }, [category, subCategory, sort, page]);

  const reset = () => {
    setCategory("all");
    setSubCategory("all");
    setSort("");
    navigate("/companies/categories/all");
    setPage(1);
  };

  return (
    <>
      {/* Description and Tags */}
      <Helmet>
        <title>{category || "All"} results - Link India Portal</title>
        <meta name="description" content={`Find ${category} in Lucknow`} />
        <meta
          name="keywords"
          content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
        />
        <meta name="author" content="Link India Portal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={`${category || "All"} results - Link India Portal`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/companies/categories/${category}`}
        />
      </Helmet>

      {/* Actual Content */}
      <div className="page flex flex-col w-[90%] py-4">
        <BreadCrumbNav />
        <p className="heading capitalize !my-2">
          {category} results in Lucknow.{" "}
        </p>
        <div className="filters flex flex-wrap justify-start gap-4 max-sm:gap-2 items-center py-2">
          <p className="text-sm">All filters</p>
          <div className="max-sm:w-[150px] w-fit">
            <Select
              data={[
                "all",
                ...Object.values(categories).map((cat) => cat.name),
              ]}
              value={category || null}
              placeholder={category || "Chose Category"}
              clearable
              onClear={() => setCategory("")}
              onChange={(value) => {
                setCategory(value);
                setSubCategory("");
                navigate(`/companies/categories/${value}`);
              }}
            />
          </div>
          <div className="max-sm:w-[150px] w-fit">
            <Select
              data={getSubCategories(category || categoryParam) || ["All"]}
              value={subCategory || null}
              placeholder={subCategory || "Chose Sub Category"}
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

        <div className="cards-container w-full flex max-lg:flex-col gap-4">
          <div className="cards flex-1 min-h-[50px] max-h-[600px] overflow-y-auto p-4 max-sm:p-1 flex flex-col gap-4">
            {results?.companies?.length ? (
              results.companies.map((company, index) => (
                <CompanyCardSmall company={company} key={index} />
              ))
            ) : loading ? (
              <div className="w-full min-h-[50vh] rounded-xl border p-2 flex items-center justify-center">
                <div className="loader"></div>
              </div>
            ) : (
              <div className="w-full p-2 flex flex-col items-start justify-start">
                <p className="heading py-2 my-2 max-sm:my-0 !text-4xl max-lg:!text-2xl max-sm:!text-lg">
                  Uh...Oh. Its empty in here.
                </p>
                <p
                  className="hover:text-blue-600 text-gray-500 cursor-pointer transition-all duration-200 "
                  onClick={reset}
                >
                  Search for all?
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

          <div className="sidebar w-1/3 max-lg:w-full">
            <AdvertisementCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;

