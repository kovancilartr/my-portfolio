"use server";
import { pb } from "@/lib/pb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const hero = await pb.collection('hero').getFullList();
      return NextResponse.json(hero);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
  }
