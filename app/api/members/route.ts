import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const members = [
      {
        _id: "1",
        name: "Raj Kumar",
        role: "Club President",
        department: "Computer Science",
        certified: true,
      },
      {
        _id: "2",
        name: "Priya Singh",
        role: "Vice President",
        department: "Information Technology",
        certified: true,
      },
    ]

    return NextResponse.json(
      { success: true, data: members },
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
