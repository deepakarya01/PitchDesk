'use client';

import { createPitch } from '@/app/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';

const StartupForm = () => {
  const [pitch, setPitch] = useState('');
  const router = useRouter();

  const handleFormSubmit = async (
    prevState: { success: boolean; message: string },
    formData: FormData
  ) => {
    try {
      const result = await createPitch(prevState, formData, pitch);

      if (result.success) {
        console.log('Pitch created successfully!');
        alert('Your startup pitch has been created successfully!');

        router.push('/');

        return {
          success: true,
          message: 'Pitch created successfully!',
        };
      } else {
        console.error('Failed to create pitch:', result.message);
        alert('Error: ' + result.message);

        return {
          success: false,
          message: result.message,
        };
      }
    } catch (error: any) {
      console.error('Unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again.');

      return {
        success: false,
        message: 'An unexpected error occurred',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    success: false,
    message: '',
  });

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 ">
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
          Image URL
        </label>
        <Input
          id="image"
          name="image"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Startup Image URL"
        />
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
      </div>

      <Button
        type="submit"
        className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-white transition-colors duration-200"
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Submit Your Pitch'}
        <Send className="size-5" />
      </Button>
    </form>
  );
};

export default StartupForm;
