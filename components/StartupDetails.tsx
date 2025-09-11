'use client';

import { formatDate } from '@/app/lib/utils';
import { Startup, User } from '@prisma/client';
import MDEditor from '@uiw/react-md-editor';
import { CalendarIcon, EyeIcon, UserCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import rehypeSanitize from 'rehype-sanitize';

const StartupDetails = ({
  startup,
}: {
  startup: Startup & { author: User };
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <CalendarIcon size={16} />
              <p className="text-sm font-medium text-blue-100">
                {formatDate(startup.createdAt)}
              </p>
            </div>
            <h1 className="font-poppins text-3xl md:text-4xl font-bold leading-tight mb-3">
              {startup.title}
            </h1>
            <p className="font-poppins text-lg text-blue-100 leading-relaxed">
              {startup.description}
            </p>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <Link
                href={`/user/${startup.author.id}`}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-300 group-hover:ring-blue-400 transition-all duration-200">
                  {startup.author.image ? (
                    <Image
                      src={startup.author.image}
                      alt={startup.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <UserCircleIcon size={24} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-lg block">
                    {startup.author.name}
                  </span>
                  <span className="text-sm text-gray-500">Author</span>
                </div>
              </Link>

              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <EyeIcon size={18} className="text-green-600" />
                  <span className="font-medium">
                    {startup.views.toLocaleString()} Views
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{startup.category}</span>
                </div>
              </div>
            </div>
          </div>

          {startup.image && (
            <div className="px-8 py-6">
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src={startup.image}
                  alt={startup.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          )}

          <div className="px-8 py-6">
            <h2 className="font-poppins text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">
              The Pitch
            </h2>
            <div
              className="font-worksans prose prose-lg max-w-none"
              data-color-mode="light"
            >
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <MDEditor.Markdown
                  source={startup.pitch}
                  rehypePlugins={[[rehypeSanitize]]}
                  style={{
                    whiteSpace: 'pre-wrap',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    fontSize: '16px',
                    lineHeight: '1.7',
                  }}
                  className="markdown-content"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetails;
