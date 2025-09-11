// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // You will need at least one user to link the pitches to.
  // This ensures the foreign key constraint is satisfied.
  const user = await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: {},
    create: {
      email: 'testuser@example.com',
      name: 'Test User',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
  });

  // Dummy pitch data
  const pitches = [
    {
      title: 'AI-Powered Fitness Coach',
      description:
        'A mobile app that uses computer vision to analyze workout form and provide real-time feedback.',
      category: 'Health & Fitness',
      image:
        'https://media.licdn.com/dms/image/v2/D4E12AQE0AjDIXTm_iw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1707404287831?e=2147483647&v=beta&t=mdBpl1o0fmRUsQqXXMGzpKPnkrdyrXhoox4_wjUyDzU',
      views: 150,
      pitch: `# AI-Powered Fitness Coach\n\n**Problem:** Many people exercise with incorrect form, leading to injuries and ineffective workouts. Personal trainers are expensive.\n\n**Solution:** Our app uses your phone’s camera and AI to detect your movements, offering instant, personalized feedback and corrections.`,
      authorId: user.id,
    },
    {
      title: 'Eco-Friendly Smart Home System',
      description:
        'A platform that learns your habits to automatically optimize energy consumption and reduce your carbon footprint.',
      category: 'Sustainability & Tech',
      image:
        'https://storage.googleapis.com/public-homes-web-media-prod/smart_homes_sustainable_way_of_life_19c3398f4e/smart_homes_sustainable_way_of_life_19c3398f4e.jpg',
      views: 320,
      pitch: `# Eco-Friendly Smart Home\n\n**Problem:** Smart homes are convenient but often consume more energy due to constant device usage. Users are not aware of their real-time energy consumption.\n\n**Solution:** Our system connects with all smart devices and uses predictive algorithms to turn off lights, adjust thermostats, and manage appliances to minimize energy waste.`,
      authorId: user.id,
    },
    {
      title: 'Virtual Reality Language Tutor',
      description:
        'An immersive VR application that simulates real-world scenarios to help users practice new languages in a conversational setting.',
      category: 'Education',
      image:
        'https://edge.mondly.com/blog/wp-content/uploads/2017/02/Mondly-VR-learn-English-Spanish-German-French-and-more-in-Virtual-Reality.png',
      views: 450,
      pitch: `# VR Language Tutor\n\n**Problem:** Learning a new language is difficult without regular, real-world practice. Finding conversation partners can be challenging.\n\n**Solution:** Our VR app places you in lifelike environments like a coffee shop or airport, where you can interact with AI characters in your target language. The AI provides pronunciation tips and grammar corrections in real-time.`,
      authorId: user.id,
    },
  ];

  for (const pitch of pitches) {
    await prisma.startup.create({ data: pitch });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
