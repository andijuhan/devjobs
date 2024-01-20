import prismadb from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { jobFilterSchema, jobFilterValues } from "@/lib/validation";
import { redirect } from "next/navigation";
import React from "react";
import FormSubmitButton from "./FormSubmitButton";

const filterJobs = async (formData: FormData) => {
  "use server";
  //mengkonversi form data menjadi object javascript
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

interface JobFilterSidebarProps {
  defaultValues: jobFilterValues;
}

//server action in server component
const JobFilterSidebar: React.FC<JobFilterSidebarProps> = async ({
  defaultValues,
}) => {
  const distinctLocation = (await prismadb.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      // filter location property without null and undefined
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              defaultValue={defaultValues.q}
              placeholder="Title, company, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              className=""
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All type</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              className=""
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All location</option>
              {distinctLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remote"
              name="remote"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote</Label>
          </div>
          <FormSubmitButton type="submit" className="w-full">
            Filter jobs
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
