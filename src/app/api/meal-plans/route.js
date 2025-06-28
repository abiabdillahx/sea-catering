import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Fetch all meal plans
export async function GET() {
  try {
    const mealPlans = await prisma.mealPlan.findMany({
      include: {
        menus: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
            tags: true,
            mealTypes: true
          }
        }
      },
      orderBy: {
        price: 'asc'
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: mealPlans 
    })
  } catch (error) {
    console.error('Error fetching meal plans:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch meal plans' },
      { status: 500 }
    )
  }
}

// POST - Create new meal plan (Admin only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, price, description, image, details } = body

    // Validation
    if (!name || !price || !description) {
      return NextResponse.json(
        { success: false, error: 'Name, price, and description are required' },
        { status: 400 }
      )
    }

    const mealPlan = await prisma.mealPlan.create({
      data: {
        name: name.trim(),
        price: parseInt(price),
        description: description.trim(),
        image: image || '/meal-plans/default.jpg',
        details: details || description
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: mealPlan,
      message: 'Meal plan created successfully'
    })
  } catch (error) {
    console.error('Error creating meal plan:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create meal plan' },
      { status: 500 }
    )
  }
}