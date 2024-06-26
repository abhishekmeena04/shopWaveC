import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/store/features/auth/authSlice.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValues, setinputValues] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(inputValues))
      .unwrap()
      .then((response) => {
        if (response?.success == true) {
          toast.success(response?.message, { autoClose: 2000 });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(response?.message, { autoClose: 2000 });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BASE_URL}/users/login`,
    //     inputValues,
    //     {
    //       withCredentials: true, // axios send automatically cookies when we apply this property
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log(response.data);
    //   toast.success(response?.data?.message, { autoClose: 2000 });
    //   setinputValues({});
    // } catch (error) {
    //   toast.error(error.response?.data?.message, { autoClose: 2000 });
    //   setinputValues({});
    // }
  };
  return (
    <div className="flex items-center justify-center h-screen px-2">
      <Card className="w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
                value={inputValues.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                name="password"
                value={inputValues.password || ""}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Sign in</Button>
          </CardFooter>
        </form>
        <div className="mb-4 text-center text-sm">
          Already have an account.?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
