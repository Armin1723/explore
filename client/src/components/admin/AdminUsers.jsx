import { Card, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";

const AdminUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.BACKEND_URL}/api/admin/users`);
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdminUsers()
  }, []);
  return (
    <Card className="flex flex-col flex-1 " withBorder>
      <ScrollArea>
        <div className="heading w-full border-l-8 border-teal-300 my-4 ">
          <p className="w-full pl-6 text-xl tracking-wide">Recent Users</p>
        </div>
        {users.length > 0 && users.map((user)=>{
          <div className="userCard" key={user?._id}>
            {user?.name}
          </div>
        })}
      </ScrollArea>
    </Card>
  );
};

export default AdminUsers;
