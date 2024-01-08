import { Job } from '@prisma/client'

interface JobListItemProps {
  job: Job
}

const JobListItem: React.FC<JobListItemProps> = ({job}) => {
  return (
    <article className=''>{job.title}</article>
  )
}

export default JobListItem