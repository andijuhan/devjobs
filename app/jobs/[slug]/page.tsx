import prismadb from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import JobDetailPage from "./JobDetailPage";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prismadb.job.findUnique({
    where: { slug },
  });

  if (!job) {
    notFound();
  }

  return job;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export async function generateStaticParams() {
  const jobs = await prismadb.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });

  return jobs.map((job) => job.slug);
}

export default async function page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applyUrl = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applyUrl) {
    console.error("Job has no applicationEmail or applicationUrl");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetailPage job={job} />
      <aside>
        <Button asChild>
          <a href={applyUrl} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
