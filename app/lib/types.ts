export type Author = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Startup = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  views: number;
  pitch: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: Author;
};

export type StartupCardType = Omit<Startup, 'author'> & {
  author: Author | null;
};
