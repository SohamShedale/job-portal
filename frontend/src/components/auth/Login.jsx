import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading,user} = useSelector(store => store.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={handleForm}
            className="w-1/2 border border-gray-300 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">Login</h1>

            <div className="my-5 flex flex-col gap-3">
              <Label className="flex items-start">Email</Label>
              <Input
                type="email"
                placeholder="jon@gmail.com"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
              />
            </div>

            <div className="my-5 flex flex-col gap-3">
              <Label className="flex items-start">Password</Label>
              <Input
                type="password"
                placeholder=""
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex items-center justify-between">
              <RadioGroup className="flex gap-5 items-center">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Login
              </Button>
            )}
            <span>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#6a38c2] hover:text-[#5b30a6]"
              >
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
