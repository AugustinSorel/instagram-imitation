# Instagram Imitation

This is a fully functional Instagram imitation app built using the t3 stack (typescript and Nextjs). The app allows users to create accounts, post photos, follow other users, like, bookmark, comment on posts, and explore content from other users. The hosting for this project is on Vercel, while the database and images are stored respectively on AWS RDS and AWS S3.

## Demo

- live website: https://instagram-imitation.vercel.app
- youtube viedo: https://youtu.be/aQSlwkD4e4o

## Images

### Home Page
![instagram-imitation vercel app_](https://user-images.githubusercontent.com/48162609/235127136-ffd2885c-210f-4e5c-9600-90d057ca764f.png)

### like and bookmark
![instagram-imitation vercel app_ (1)](https://user-images.githubusercontent.com/48162609/235127385-19d326de-5c1d-44d8-bac8-4ada3c80ba8c.png)

### Comment
![instagram-imitation vercel app_ (2)](https://user-images.githubusercontent.com/48162609/235127719-42b704d2-f0be-477e-8a5c-0499a05a01bd.png)

### Menu
![instagram-imitation vercel app_ (3)](https://user-images.githubusercontent.com/48162609/235127824-ae6c1b76-c218-48c2-b002-cdf15fb78fab.png)

### Profile Page Posts feed
![instagram-imitation vercel app_ (4)](https://user-images.githubusercontent.com/48162609/235127922-ecd62499-2649-4435-9f31-4f5194a0a167.png)

### Profile Page Likes feed
![instagram-imitation vercel app_ (5)](https://user-images.githubusercontent.com/48162609/235127987-e6164886-08c2-4e02-a4ae-77f018ea9f41.png)

### Search
![search](https://user-images.githubusercontent.com/48162609/235128037-212f3e56-d6b5-4b3b-8cb7-eb0fe75f2a87.png)

### New Post
![new post](https://user-images.githubusercontent.com/48162609/235128056-e04b2507-4eb3-4cce-9aa8-abd17fb8cb1e.png)

### Light theme
![light theme](https://user-images.githubusercontent.com/48162609/235128147-bc28f083-3e27-4fb8-90dc-6fd8c1719717.png)

## Features

- **Authentication**: Users can sign up and log in to the app using their Google account or Github account.
- **Infinite scroll**: only the first 5 posts are being fetch from the db, more posts will be fetched when scrolled down.
- **Post creation**: Users can upload up to 5 photos and add captions and location.
- **Feed**: Users can see posts from users they follow and can like, bookmark and comment on those posts.
- **Search**: Users can search for other users by username or name.
- **Follow**: Users can follow other people.
- **Profile page**: Users can view other people posts and liked posts3.
- **Dark theme**: Users can select their favorite theme.

## Tech Stack

- [Next.js](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org/docs/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Postgres](https://www.postgresql.org/docs/)
- [AWS S3](https://docs.aws.amazon.com/s3/index.html)
- [Zod](https://zod.dev/)
- [Tanstack Query](https://tanstack.com/query/v4/docs/react/overview)
