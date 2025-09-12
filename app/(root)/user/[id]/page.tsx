import { getStartupsByUserId } from '@/app/lib/actions';
import UserProfile from '@/components/UserProfile';
import { notFound } from 'next/navigation';

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const startups = await getStartupsByUserId(id);

  if (!startups || startups.length === 0) {
    notFound();
  }

  const user = startups[0].author;

  return <UserProfile user={{ ...user, startups }} />;
}
