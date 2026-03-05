This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Installation

Install dependencies:

```bash
pnpm install
```

### Environment Setup

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
```

For MongoDB Atlas, the connection string format is:
```
mongodb+srv://username:password@cluster.mongodb.net/database-name
```

For local MongoDB:
```
mongodb://localhost:27017/database-name
```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## MongoDB Integration

The survey data is stored in MongoDB. The survey API endpoint (`/api/survey`) saves:
- `reasonForConnecting`: Why the user is connecting (low-on-data, urgent, browse, curious)
- `uberWiFiPreference`: Uber WiFi preference (definitely, maybe, doesnt-matter)
- `clientip`: Client IP address
- `clientmac`: Client MAC address
- `createdAt`: Timestamp (automatically added)
- `updatedAt`: Timestamp (automatically added)

### API Endpoints

- `POST /api/survey` - Save survey data
- `GET /api/survey` - Retrieve survey data (with pagination: `?limit=100&skip=0`)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
