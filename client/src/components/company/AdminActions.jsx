import { Badge, Button, Menu } from "@mantine/core";
import React from "react";
import { GoChevronDown } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const AdminActions = ({ company, setCompany }) => {
    const toggleSuspendCompany = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/suspend/company`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ companyId: company._id }),
                    credentials: "include",
                }
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            const data = await response.json();
            setCompany(data.company);
        } catch (error) {
            console.log(error.message);
        }
    }
    
  return (
    <Menu>
      <Menu.Target>
        <Button color={`${company.status === "active" ? "green" : "orange"}`} className="capitalize flex items-center gap-2">
          {company?.status}
          <GoChevronDown />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {company.status !== "pending" && (
          <Menu.Item>
            {company.status !== "suspended" ? (
              <Button
                color="red"
                className="flex items-center"
                onClick={toggleSuspendCompany}
              >
                Suspend Company <MdDelete />
              </Button>
            ) : (
              <Button
                color="green"
                className="flex items-center"
                onClick={toggleSuspendCompany}
              >
                Activate Company <TiTick />
              </Button>
            )}
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default AdminActions;
