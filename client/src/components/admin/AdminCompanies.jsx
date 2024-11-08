import { Avatar, Badge, Button, Card, ScrollArea, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubCategoryMenu from "./SubCategoryMenu";
import { useSelector } from "react-redux";
import { getSubCategories } from "../../utils";
import { set } from "mongoose";

const AdminCompanies = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);

  const [loading, setLoading] = useState(false);

  const categories = useSelector((state) => state.categories);

  const { category: initialCategory = "all" } = useParams();
  const [category, setCategory] = useState(initialCategory);

  const [subCategory, setSubCategory] = useState("all");

  const navigate = useNavigate();

  const exportData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/companies/export?category=${category?.toLowerCase()}&subCategory=${subCategory?.toLowerCase()}`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("An error occurred while exporting data");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `companies-${category}.csv`;
      a.click();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/companies?page=${page}&category=${category}&subCategory=${subCategory}`,
          {
            credentials: "include",
          }
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
    fetchCompanies();
  }, [refetch, category, subCategory, page]);

  return (
    <Card className="flex flex-col flex-1" withBorder>
      <ScrollArea h={400} className="w-full">
        <div className="w-full my-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2 w-full pl-6 text-xl tracking-wide">
            <p className="heading !my-0 border-l-4 pl-6 border-primary">Companies</p>
            <Select
              data={['All', ...Object.values(categories).map((cat) => cat.name)]}
              value={category}
              placeholder={category}
              onChange={(value) => {setCategory(value); setSubCategory('all'); navigate(`/admin/companies/${value}`)}}
            />
             </div>
          <div className="actions flex gap-2 pl-8">
            <SubCategoryMenu
              subCategory={subCategory}
              setSubCategory={setSubCategory}
              choices={getSubCategories(category)}
            />
            <Button color="green.8" onClick={exportData}>Export</Button>
          </div>
        </div>

        {loading && (
          <div className="w-full min-h-[40vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>)}

        {results && results.companies.length > 0 && (
          results.companies.map((company, index) => {
            return (
              <Link
                to={`/companies/${company.name.split(" ").join("-")}`}
                className={`companyCard flex justify-between py-3 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
                key={index}
              >
                <div className="flex items-center gap-8 max-sm:gap-4 pr-2">
                  <Avatar src={company?.logo?.url} alt={company?.name} className="border border-black"/>
                  <p className="capitalize font-semibold">{company?.name}</p>
                  <Badge className="max-sm:scale-75" color={company?.status == 'active' ? 'green' : 'red'} variant="filled"> {company?.status == 'active' ? 'Live' : 'Suspended'} </Badge>
                </div>
                <div className="flex items-center">
                  <p>
                    <span className="max-sm:hidden">Registered:{" "}</span>
                    {new Date(company?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })
        ) }

        {results && results.companies.length === 0 && (
          <p className="text-center">No companies found</p>
        )}

        {results?.totalPages > 1 && (
          <Pagination
            totalPages={results.totalPages}
            page={page}
            setPage={setPage}
          />
        )}
      </ScrollArea>
    </Card>
  );
};

export default AdminCompanies;
