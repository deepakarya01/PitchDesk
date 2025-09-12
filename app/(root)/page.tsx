import EmptyState from '@/components/EmptyState';
import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { getStartups } from '../lib/actions';
import { StartupCardType } from '../lib/types';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || '';
  const posts = await getStartups(query);

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="font-worksans inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30">
              🚀 Launch Your Ideas
            </span>
          </div>
          <h1 className="font-poppins text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Pitch Your Startup,{' '}
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Connect{' '}
            </span>
            With Entrepreneurs
          </h1>
          <p className="font-poppins font-semibold text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">
            Submit innovative ideas, vote on groundbreaking pitches, and get
            noticed in our vibrant virtual competitions. Your next big break
            starts here.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            {query ? (
              <>
                Search results for{' '}
                <span className="text-primary">"{query}"</span>{' '}
              </>
            ) : (
              'Discover Amazing Startups'
            )}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>
        {posts && posts.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="font-worksans text-gray-600 text-lg">
                Found{' '}
                <span className="font-semibold text-primary">
                  {posts.length}{' '}
                </span>
                {posts.length === 1 ? 'startup' : 'startups'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: StartupCardType) => (
                <div key={post.id} className="hover:shadow-lg">
                  <StartupCard post={post} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title={query ? 'No Results Found' : 'No Startups Yet'}
            message={
              query
                ? `We couldn&apos;t find any startups matching “${query}”. Try something else.`
                : ''
            }
          />
        )}
      </section>
    </div>
  );
}
