import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, rollNo, department, year, experience, message } = body

    if (!name || !email || !rollNo || !department || !year) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    console.log("Join form submitted:", body)

    return NextResponse.json(
      { success: true, message: "Application received successfully" },
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
