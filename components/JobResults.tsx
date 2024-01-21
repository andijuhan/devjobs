import React from "react";
import JobListItem from "./JobListItem";
import prismadb from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultProps {
  filterValues: JobFilterValues;
}
const JobResults: React.FC<JobResultProps> = async ({
  filterValues: { q, type, location, remote },
}) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prismadb.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
      {jobs.length === 0 ? (
        <p className="m-auto text-center">
          No job found. Try adjusting your search filters.
        </p>
      ) : null}
    </div>
  );
};

export default JobResults;
