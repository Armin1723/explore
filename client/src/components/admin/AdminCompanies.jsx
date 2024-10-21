import { Avatar, Badge, Button, Card, ScrollArea, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SubCategoryMenu from "./SubCategoryMenu";
import { categories } from "../../utils";

const AdminCompanies = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);

  const { category: initialCategory = "all" } = useParams();
  const [category, setCategory] = useState(initialCategory);

  const [subCategory, setSubCategory] = useState("all");

  const navigate = useNavigate();

  const exportData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/companies/export?category=${category}&subCategory=${subCategory}`,
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanies();
  }, [refetch, category, subCategory, page]);

  return (
    <Card className="flex flex-col flex-1 max-h-[44vh]" withBorder>
      <ScrollArea h={400}>
        <div className="heading w-full border-l-8 border-teal-300 my-4 flex justify-between">
          <div className="flex items-center gap-2 w-full pl-6 text-xl tracking-wide">
            <p>Companies</p>
            <Select
              data={['all', ...Object.keys(categories)]}
              value={category}
              placeholder={category}
              onChange={(value) => {setCategory(value); navigate(`/admin/companies/${value}`)}}
            />
             </div>
          <div className="actions flex gap-2">
            <SubCategoryMenu
              subCategory={subCategory}
              setSubCategory={setSubCategory}
              choices={categories[category.toLowerCase()]}
            />
            <Button color="green.8" onClick={exportData}>Export</Button>
          </div>
        </div>

        {results && results.companies.length > 0 ? (
          results.companies.map((company, index) => {
            return (
              <Link
                to={`/companies/${company.name.split(" ").join("-")}`}
                className={`companyCard flex justify-between py-3 px-2 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
                key={index}
              >
                <div className="flex items-center gap-8">
                  <Avatar src={company?.logo} alt={company.name} />
                  <p className="capitalize font-semibold">{company.name}</p>
                  <Badge color={company.status == 'active' ? 'green' : 'red'} variant="filled"> {company.status == 'active' ? 'Live' : 'Suspended'} </Badge>
                </div>
                <div className="flex items-center">
                  <p>
                    Registered:{" "}
                    {new Date(company.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <div>No Such Listings found</div>
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
