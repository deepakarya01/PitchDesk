'use client';

import StartupCard from '@/components/StartupCard';
import { Startup, User } from '@prisma/client';
import Image from 'next/image';

const UserProfile = ({
  user,
}: {
  user: User & { startups: (Startup & { author: User | null })[] };
}) => {
  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-xl shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
            {user.image && (
              <Image
                src={user.image}
                alt="User Avatar"
                width={200}
                height={200}
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>
      </div>
      <hr className="my-8" />

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {user.name}&apos;s Pitches ({user.startups.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.startups.length > 0 ? (
          user.startups.map((pitch) => (
            <StartupCard key={pitch.id} post={pitch} />
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center">
            This user hasn&apos;t posted any pitches yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
