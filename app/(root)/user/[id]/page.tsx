import { getStartupsByUserId } from '@/app/lib/actions';
import UserProfile from '@/components/UserProfile';
import { notFound } from 'next/navigation';

export default async function UserPage({ params }: { params: { id: string } }) {
  const startups = await getStartupsByUserId(params.id);

  if (!startups || startups.length === 0) {
    notFound();
  }

  const user = startups[0].author;

  return <UserProfile user={{ ...user, startups }} />;
}
