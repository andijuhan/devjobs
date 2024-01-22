import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface JobDetailPageProps {
  job: Job;
  applyUrl: string;
}

export default function JobDetailPage({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
  },
  applyUrl,
}: JobDetailPageProps) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex flex-col space-y-5 border-b pb-5">
        <div className="flex items-center gap-5">
          {companyLogoUrl && (
            <Image
              src={companyLogoUrl}
              alt={companyName}
              width={100}
              height={100}
              className="rounded-xl"
            />
          )}
          <div>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="font-semibold">
                {applicationUrl ? (
                  <Link
                    href={new URL(applicationUrl).origin}
                    rel="nofollow"
                    className="text-green-500 hover:underline"
                  >
                    {companyName}
                  </Link>
                ) : (
                  <span>{companyName}</span>
                )}
              </p>
            </div>
            <div className="text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0" />
                {locationType}
              </p>
              <p className="flex items-center gap-1.5">
                <Globe2 size={16} className="shrink-0" />
                {location || "worldwide"}
              </p>
              <p className="flex items-center gap-1.5">
                <Banknote size={16} className="shrink-0" />
                {formatMoney(salary)}
              </p>
            </div>
          </div>
        </div>

        <Button asChild>
          <a href={applyUrl} className="w-40 md:w-fit">
            Apply now
          </a>
        </Button>
      </div>
      <div className="px-4">
        {description && <Markdown>{description}</Markdown>}
      </div>
    </section>
  );
}
