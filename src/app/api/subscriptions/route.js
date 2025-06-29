import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route' // Adjust path sesuai struktur lu
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    // Get session
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login first.' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { planId, name, phone, mealTypes, deliveryDays, allergies, totalPrice } = body

    // Validation
    if (!planId || !name || !phone || !mealTypes || !deliveryDays || mealTypes.length === 0 || deliveryDays.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Validate phone format
    const phoneRegex = /^(\+?62|0)[0-9]{8,12}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format.' },
        { status: 400 }
      )
    }

    // Get user ID from session
    const userId = session.user.id

    // Check if user exists and update name/phone if needed
    const user = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      )
    }

    // Update user data if needed
    if (user.name !== name || user.phone !== phone) {
      await prisma.users.update({
        where: { id: userId },
        data: {
          name: name,
          phone: phone
        }
      })
    }

    // Check if plan exists (validate against mealPlans data)
    const validPlanIds = ['diet', 'protein', 'royal'] // From your mealPlans.js
    if (!validPlanIds.includes(planId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid meal plan selected.' },
        { status: 400 }
      )
    }

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: userId,
        planId: planId,
        phone: phone,
        mealTypes: mealTypes,
        deliveryDays: deliveryDays,
        allergies: allergies || null,
        totalPrice: Math.round(totalPrice)
      },
      include: {
        user: {
          select: {
            name: true,
            phone: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription
    })

  } catch (error) {
    console.error('Subscription API Error:', error)
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'Duplicate subscription found.' },
        { status: 409 }
      )
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(request) {
  try {
    // Get session
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get user's subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            phone: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: subscriptions
    })

  } catch (error) {
    console.error('Get Subscriptions API Error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}