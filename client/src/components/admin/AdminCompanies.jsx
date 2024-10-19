import { Avatar, Card, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SubcategoryMenu from "./SubcategoryMenu";
import { categories } from "../../utils";

const AdminCompanies = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);

  const { category = "all" } = useParams();

  const [subcategory, setSubcategory] = useState("all");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/companies?page=${page}&category=${category}&subcategory=${subcategory}`,
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
  }, [refetch, category, subcategory, page]);

  return (
    <Card className="flex flex-col flex-1 max-h-[44vh]" withBorder>
      <ScrollArea h={400}>
        <div className="heading w-full border-l-8 border-teal-300 my-4 flex justify-between">
          <p className="w-full pl-6 text-xl tracking-wide">Companies</p>
          <SubcategoryMenu subcategory={subcategory} setSubcategory={setSubcategory} choices={categories[category.toLowerCase()]}/>
        </div>

        {(results && results.companies.length >0) ? (
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
                </div>
                <div className="flex items-center">
                  <p>Registered: {new Date(company.createdAt).toLocaleDateString()}</p>
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
