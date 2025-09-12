import { getStartupById } from '@/app/lib/actions';
import StartupDetails from '@/components/StartupDetails';
import { notFound } from 'next/navigation';

export default async function StartupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const startup = await getStartupById(id);

  if (!startup) {
    notFound();
  }

  return <StartupDetails startup={startup} />;
}
