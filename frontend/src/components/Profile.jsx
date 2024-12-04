import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";

const isResume = true;

const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth)
  
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div className="">
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p className="">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span className="">{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span className="">{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="Skills"></h1>
          <div className="flex items-center gap-3">
            {user?.profile?.skills.map((skill, index) => (
              <Badge key={index}>{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-sm font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="m-3 font-bold">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
