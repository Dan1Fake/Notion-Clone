"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName || user?.lastName}
          `s Space
        </h1>
      )}
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div>
        <SignedOut>
          <SignInButton>
            <button className="bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
