"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="text-center p-8">
        <p>You are not signed in</p>
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white px-4 py-2 rounded mt-4"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1>
      <p className="mb-2">Email: {session.user?.email}</p>
      {session.user?.image && (
        <img 
          src={session.user.image} 
          alt="Profile" 
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
      )}
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}