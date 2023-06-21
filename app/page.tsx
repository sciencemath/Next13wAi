import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? '/journal' : '/new-user';

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
      <div>
        <h1 className="text-6xl max-w-[600px] mx-auto mb-4">
          A Journal app with Ai sentiment analysis.
        </h1>
        <p className="text-2xl text-white/60 mb-4">
          This is the best app for tracking mood through out your life. ALl you
          have to do is be honest
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
