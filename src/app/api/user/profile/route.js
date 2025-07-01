import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      )
    }

    const { name, phone, image } = await request.json()

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" }, 
        { status: 400 }
      )
    }

    // Check if phone is already taken by another user
    const existingUser = await prisma.users.findFirst({
      where: {
        phone: phone,
        NOT: {
          id: session.user.id
        }
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Phone number is already in use" }, 
        { status: 400 }
      )
    }

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: {
        id: session.user.id
      },
      data: {
        name,
        phone,
        ...(image && { image })
      },
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        image: true,
        role: true
      }
    })

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser
    })

  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      )
    }

    const user = await prisma.users.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        image: true,
        role: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ user })

  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}