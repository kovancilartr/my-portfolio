import { pb } from '@/lib/pb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const about = await pb.collection('about').getFullList();
    const about_sub = await pb.collection('about_sub').getFullList();

    // İki veriyi birleştirip tek bir nesne olarak döndür
    return NextResponse.json({
      about,
      about_sub,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}