import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

// GET - Fetch user subscriptions
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        plan: {
          select: {
            name: true,
            price: true,
            description: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: subscriptions 
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

// POST - Create new subscription
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { planId, phone, mealTypes, deliveryDays, allergies } = body

    // Validation
    if (!planId || !phone || !mealTypes || !deliveryDays) {
      return NextResponse.json(
        { success: false, error: 'Plan, phone, meal types, and delivery days are required' },
        { status: 400 }
      )
    }

    if (!Array.isArray(mealTypes) || mealTypes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one meal type must be selected' },
        { status: 400 }
      )
    }

    if (!Array.isArray(deliveryDays) || deliveryDays.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one delivery day must be selected' },
        { status: 400 }
      )
    }

    // Validate meal types
    const validMealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']
    const invalidMealTypes = mealTypes.filter(type => !validMealTypes.includes(type))
    if (invalidMealTypes.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid meal types provided' },
        { status: 400 }
      )
    }

    // Get meal plan for price calculation
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id: planId }
    })

    if (!mealPlan) {
      return NextResponse.json(
        { success: false, error: 'Meal plan not found' },
        { status: 404 }
      )
    }

    // Calculate total price: Plan Price × Meal Types × Delivery Days × 4.3
    const totalPrice = mealPlan.price * mealTypes.length * deliveryDays.length * 4.3

    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        planId,
        phone: phone.trim(),
        mealTypes,
        deliveryDays,
        allergies: allergies?.trim() || null,
        totalPrice: Math.round(totalPrice)
      },
      include: {
        plan: {
          select: {
            name: true,
            price: true,
            description: true
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: subscription,
      message: 'Subscription created successfully'
    })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}