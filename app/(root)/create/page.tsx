import { auth } from '@/app/auth';
import StartupForm from '@/components/StartupForm';
import { redirect } from 'next/navigation';

const CreatePitchPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h1 className="font-poppins text-center text-3xl md:text-4xl font-bold leading-tight">
              Create Your Pitch
            </h1>
            <p className="font-poppins text-center text-lg leading-relaxed mt-2">
              Fill out the form below to share your innovative startup idea with
              the community.
            </p>
          </div>
          <div className="px-4 py-2">
            <StartupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePitchPage;
