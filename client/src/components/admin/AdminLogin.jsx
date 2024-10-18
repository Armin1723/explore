import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import { notifications } from "@mantine/notifications";

const AdminLogin = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 8
          ? null
          : "Password should contain at least 8 characters",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = async (values) => {
    try {
      const { email, password } = values;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      )
      if (!response.ok) {
        form.setErrors({ email: response.error });
      } else {
        const data = await response.json();
        notifications.show({ title: "Login successful", message: "Welcome back", color: "teal" });  
        dispatch(setUser(data.user));
        navigate("/admin");
      }
    } catch (error) {
      form.setErrors({ email: "An error occurred. Please try again" });
    }
  };

  return (
    <div className="container flex items-center justify-center max-w-screen h-screen">
      <form
        onSubmit={form.onSubmit(handleAdminLogin)}
        className="px-8 min-w-[35vw] flex flex-col gap-4 border border-teal-300 rounded-xl py-8 backdrop-bg-blur"
      >
        <h1 className="text-3xl font-semibold py-8">Admin Login</h1>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
};

export default AdminLogin;
