# playmusic redesign
> Project Still is le codename

> project based on [shadcn/ui](https://github.com/shadcn-ui/ui)'s music template

This is a new redesign of my music player project built on [nextjs](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/) and as of now it is a bit functional, with album, and the artists page working, along with Firebase auth and its database (to save in library).`

### Preview
![preview   ](image.png)

## Getting Started

Clone the Github Repo and change the directory

```bash
git clone https://github.com/sillyangel/project-still.git

cd project-still/
```


Create a new firebase project, and add it's follwing configuration onto it's environment variable file with 
> set it up with auth and database
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Install the required packages

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```