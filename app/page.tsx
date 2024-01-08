import JobListItem from '@/components/JobListItem';
import prismadb from '@/lib/prisma';


export default async function Home() {
   const jobs = await prismadb.job.findMany({
      where: {approved: true},
      orderBy: {createdAt: 'desc'}
   })
   return <div className=''>{jobs.map((job) => (<JobListItem key={job.id} job={job}/>))}</div>;
}
