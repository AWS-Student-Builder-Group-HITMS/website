import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const events = [
      {
        _id: "1",
        title: "AWS Fundamentals Workshop",
        date: "2026-05-15",
        time: "3:00 PM",
        location: "Tech Lab A",
        description: "Introduction to AWS core services",
        category: "Workshop",
        attendees: 120,
      },
      {
        _id: "2",
        title: "Cloud Architecture Bootcamp",
        date: "2026-05-22",
        time: "2:00 PM",
        location: "Main Hall",
        description: "Learn to design scalable architectures",
        category: "Bootcamp",
        attendees: 85,
      },
    ]

    return NextResponse.json(
      { success: true, data: events },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
