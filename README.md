# PitchDeck

PitchDeck is a dynamic platform for founders and innovators to share their startup pitches and connect with a community of investors and enthusiasts. It provides a clean, intuitive interface for creating, viewing, and discovering new ideas.

## Features

* **Pitch Creation**: A dedicated page for logged-in users to create and submit their startup pitches, complete with a title, description, category, and a detailed pitch.
* **User Profiles**: Each user has a dedicated profile page showcasing all the pitches they have created.
* **Search Functionality**: Users can search for pitches by title, category, or description to find relevant content.
* **Authentication:** Secure user authentication is powered by Auth.js, allowing users to sign in with their GitHub account.
* **Cloud Image Storage:** Images are securely uploaded to Cloudinary, ensuring optimal performance and reliable storage without burdening the database.
* **Dynamic Routing:** URLs are dynamically generated for each user and pitch, enabling easy sharing and direct access.
* **Prisma ORM:** The application uses Prisma to interact with a PostgreSQL database, ensuring a type-safe and efficient data layer.
* **Server Actions:** Core logic, including pitch creation and user data fetching, is handled securely on the server with Next.js Server Actions.
* **Responsive Design:** A fully responsive UI built with Tailwind CSS, providing a seamless experience on both desktop and mobile devices.
* **UI Components:** The user interface is built with Shadcn/UI, offering a set of accessible and reusable components.

## Tech Stack

### Framework & Language

**Framework**: Next.js
**Language**: TypeScript

### Backend

**Database**: PostgreSQL

**ORM**: Prisma

**Authentication**: Auth.js

### Frontend

**Styling**: Tailwind CSS

**UI Components**: Shadcn/UI

**Image Upload**: Cloudinary

## Getting Started

### Prerequisites

Node.js (v18 or higher)
npm
A PostgreSQL database

## Installation

### Clone the repository:

Bash

git clone [repo-url]
cd my-app
Install dependencies:

Bash

npm install
Set up environment variables:
Create a .env.local file in the root of your project and add the following variables:

DATABASE_URL="your_postgresql_database_url"
AUTH_SECRET="a_strong_random_string_for_nextauth"
AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
Set up the database:
Push the Prisma schema to your database to create the necessary tables.

Bash

npx prisma db push
Run the development server:

Bash

npm run dev
Open http://localhost:3000 in your browser to see the result.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page for opportunities to contribute.

## 📄 License

This project is licensed under the MIT License.
