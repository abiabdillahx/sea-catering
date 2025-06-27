import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route' // Adjust path sesuai setup NextAuth lu

const prisma = new PrismaClient()

// GET - Fetch all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      include: {
        user: {
          select: {
            name: true,
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
      data: testimonials 
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

// POST - Create new testimonial
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
    const { message, rating } = body

    // Validation
    if (!message || !rating) {
      return NextResponse.json(
        { success: false, error: 'Message and rating are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if user already submitted testimonial (optional - bisa di-comment jika mau allow multiple)
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: {
        userId: session.user.id
      }
    })

    if (existingTestimonial) {
      return NextResponse.json(
        { success: false, error: 'You have already submitted a testimonial' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        message: message.trim(),
        rating: parseInt(rating),
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: testimonial,
      message: 'Testimonial created successfully'
    })
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}