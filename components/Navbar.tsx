import { auth } from '@/app/auth';
import { login, logout } from '@/app/lib/auth';
import {
  LogInIcon,
  LogOutIcon,
  PlusCircleIcon,
  UserRoundIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm flex justify-between items-center py-4 px-6 border-b border-gray-200">
      <Link
        href="/"
        className="font-poppins flex items-center justigy-center gap-2 text-2xl font-bold text-primary"
      >
        <Image src="/logo.png" alt="PitchDeck Logo" width={30} height={30} />
        <h1 className="font-poppins text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          PitchDeck
        </h1>
      </Link>

      <div className="flex items-center space-x-4">
        {session?.user ? (
          <>
            <Link
              href="/create"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              <PlusCircleIcon size={20} />
              <span className="hidden sm:inline">Create</span>
            </Link>

            <Link
              href={`/user/${session.user.id}`}
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <UserRoundIcon className="h-8 w-8 text-gray-400" />
              )}
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOutIcon size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </>
        ) : (
          <form action={login}>
            <button
              type="submit"
              className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition-colors"
            >
              <LogInIcon size={20} />
              <span className="hidden sm:inline">Login</span>
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Navbar;
