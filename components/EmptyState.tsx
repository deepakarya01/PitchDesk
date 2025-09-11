import { SearchIcon } from 'lucide-react';

const EmptyState = ({ title, message }: { title: string; message: string }) => {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-100">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
          <SearchIcon className="size-12 text-white" />
        </div>
        <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-4">
          {title}
        </h3>
        <p className="font-worksans text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
