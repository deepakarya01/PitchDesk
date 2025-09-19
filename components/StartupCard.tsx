import { StartupCardType } from '@/app/lib/types';
import { formatDate } from '@/app/lib/utils';
import {
  ArrowUpRight,
  Calendar,
  EyeIcon,
  TrendingUp,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const { id, title, description, category, image, views, author, createdAt } =
    post;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

      <Link href={`/startup/${id}`} className="block relative">
        {image ? (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={400}
              height={192}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              style={{
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {views > 100 && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
                <TrendingUp size={12} />
                <span>Trending</span>
              </div>
            )}

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <EyeIcon size={12} />
              <span>{views.toLocaleString()}</span>
            </div>

            <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <ArrowUpRight size={16} className="text-gray-700" />
            </div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <p className="text-sm font-medium">No Image</p>
            </div>

            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 transform rotate-45 scale-150"></div>
            </div>
          </div>
        )}
      </Link>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Calendar size={12} />
            <span className="font-medium">{formatDate(createdAt)}</span>
          </div>
        </div>

        <Link href={`/startup/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 transition-colors duration-300 leading-tight">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <EyeIcon size={12} className="text-green-500" />
              <span className="font-medium">{views.toLocaleString()}</span>
            </div>
          </div>

          <Link href={`/?query=${category}`}>
            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-200 transform hover:scale-105">
              {category}
            </span>
          </Link>
        </div>

        {author && (
          <div className="pt-2 border-t border-gray-100">
            <Link
              href={`/user/${author.id}`}
              className="flex items-center justify-between group/author hover:bg-gray-50 rounded-lg p-2 -m-2 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {author.image ? (
                    <Image
                      src={author.image}
                      alt={author.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover ring-2 ring-gray-200 group-hover/author:ring-blue-300 transition-all duration-200"
                      style={{
                        width: '32px',
                        height: '32px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-gray-200 group-hover/author:ring-blue-300 transition-all duration-200">
                      <User size={14} className="text-white" />
                    </div>
                  )}

                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 group-hover/author:text-blue-600 transition-colors duration-200">
                    {author.name}
                  </p>
                  <p className="text-xs text-gray-500">Entrepreneur</p>
                </div>
              </div>

              <ArrowUpRight
                size={14}
                className="text-gray-400 group-hover/author:text-blue-500 transform group-hover/author:translate-x-0.5 group-hover/author:-translate-y-0.5 transition-all duration-200"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupCard;
