'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');

    router.push('/');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center space-x-2 w-full"
    >
      <div className="relative w-full">
        <input
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
          placeholder="Search Startups"
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="text-white p-3 bg-gradient-to-r from-primary to-secondary rounded-full"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};

export default SearchForm;
