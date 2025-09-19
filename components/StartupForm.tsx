'use client';

import { createPitch } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Send, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

const StartupForm = () => {
  const [pitch, setPitch] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const [state, formAction] = useActionState(createPitch, null);

  const handleFormAction = async (formData: FormData) => {
    console.log('🔍 Form action called');

    console.log('📋 FormData contents:');
    for (const [key, value] of formData.entries()) {
      if (key === 'image') {
        console.log(`${key}:`, {
          name: (value as File)?.name,
          size: (value as File)?.size,
          type: (value as File)?.type,
          isFile: value instanceof File,
        });
      } else {
        console.log(`${key}:`, value);
      }
    }
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }

    return formAction(formData);
  };

  useEffect(() => {
    if (state?.success) {
      alert(state.message);
      router.push('/');
    } else if (state && !state.success) {
      alert('Error: ' + state.message);
    }
  }, [state, router]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <form action={handleFormAction} className="space-y-6 bg-white p-8">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Startup Title"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          required
          placeholder="Startup Description"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium text-gray-700">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-medium text-gray-700">
          Upload Image
        </label>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center space-x-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex-shrink-0">
                {preview && (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={64}
                    height={64}
                    className="object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-green-600">✓ Ready to upload</p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="flex-shrink-0 p-1 text-green-600 hover:text-green-800 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <label
              htmlFor="image"
              className="mt-2 inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Change image
            </label>
          </div>
        )}
      </div>

      <div data-color-mode="light" className="space-y-2">
        <label htmlFor="pitch" className="text-sm font-medium text-gray-700">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 8, overflow: 'hidden' }}
          textareaProps={{
            placeholder:
              'Briefly describe your idea and what problem it solves',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />

        <input type="hidden" name="pitch" value={pitch} />
      </div>

      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white transition-colors duration-200"
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit Your Pitch'}
      <Send className="size-5" />
    </Button>
  );
};

export default StartupForm;
