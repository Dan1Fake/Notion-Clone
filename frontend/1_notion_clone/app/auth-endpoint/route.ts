import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  const userEmail = sessionClaims?.email;

  if (!userEmail) {
    return NextResponse.json({ message: "Unauthorized - missing email" }, { status: 401 });
  }

  if (!room) {
    return NextResponse.json({ message: "Missing room ID" }, { status: 400 });
  }

  const session = liveblocks.prepareSession(userEmail, {
    userInfo: {
      name: sessionClaims?.fullName,
      email: userEmail,
      avatar: sessionClaims?.image,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", userEmail)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json({ message: "You are not in this room" }, { status: 403 });
  }
}
