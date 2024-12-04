import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const {allAppliedJobs} = useSelector(store=>store.job)
  return (
    <div>
      <Table>
        <TableCaption>Jobs Applied By You</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You haven't applied to any job yet.</span>
          ) : (
            allAppliedJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{job.job.title}</TableCell>
                <TableCell>{job.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      job.status === "rejected"
                        ? "bg-red-400"
                        : job.status === "pending"
                        ? "bg-gray-400"
                        : 'bg-green-400'
                    }`}
                  >
                    {job.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable
