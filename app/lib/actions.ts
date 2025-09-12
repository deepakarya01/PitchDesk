'use server';

import { auth } from '@/app/auth';
import { v2 as cloudinary } from 'cloudinary';
import prisma from './db';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  const file = formData.get('image');

  if (!file || typeof file === 'string') {
    return null;
  }

  const arrayBuffer = await (file as File).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'pitchdesk',
          tags: ['startup-pitch'],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
}

export async function getStartups(searchQuery: string) {
  try {
    const startups = await prisma.startup.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
          { category: { contains: searchQuery, mode: 'insensitive' } },
        ],
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return startups;
  } catch (error) {
    console.error('Failed to fetch startups:', error);
    return [];
  }
}

export async function getStartupById(id: string) {
  try {
    const startup = await prisma.startup.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    return startup;
  } catch (error) {
    console.error(`Failed to fetch startup with ID ${id}:`, error);
    return null;
  }
}

export async function getStartupsByUserId(userId: string) {
  try {
    const startups = await prisma.startup.findMany({
      where: { authorId: userId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return startups;
  } catch (error) {
    console.error(`Failed to fetch startups for user ${userId}:`, error);
    return [];
  }
}

export type PitchFormState = {
  success: boolean;
  message: string;
  shouldRedirect?: boolean;
};

export async function createPitch(
  prevState: PitchFormState | null,
  formData: FormData
) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      message: 'You must be logged in to create a pitch.',
    };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const pitch = formData.get('pitch') as string;
  const authorId = session.user.id;

  if (!title || !description || !category || !pitch) {
    return { success: false, message: 'Missing required form fields.' };
  }

  try {
    const imageUploadResult = await uploadImage(formData);
    const imageUrl = imageUploadResult
      ? (imageUploadResult as any).secure_url
      : null;

    await prisma.startup.create({
      data: {
        title,
        description,
        category,
        image: imageUrl,
        authorId,
        views: 0,
        pitch,
      },
    });

    return {
      success: true,
      message: 'Pitch created successfully!',
      shouldRedirect: true,
    };
  } catch (error: any) {
    console.error('Failed to create pitch:', error);
    return { success: false, message: 'Failed to create pitch.' };
  }
}
