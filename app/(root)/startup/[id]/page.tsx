import { getStartupById } from '@/app/lib/actions';
import StartupDetails from '@/components/StartupDetails';
import { notFound } from 'next/navigation';

export default async function StartupPage({
  params,
}: {
  params: { id: string };
}) {
  const startup = await getStartupById(params.id);

  if (!startup) {
    notFound();
  }

  return <StartupDetails startup={startup} />;
}
