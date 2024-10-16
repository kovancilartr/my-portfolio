"use server";
import { pb } from "@/lib/pb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const projects = await pb.collection('projects').getFullList();
      return NextResponse.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
  }
