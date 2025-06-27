import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import prisma from "@/lib/prisma"

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
  })

  return Response.json(testimonials)
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { message, rating } = await req.json()
  if (!message || !rating) {
    return Response.json({ error: "Semua field wajib diisi" }, { status: 400 })
  }

  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        userId: session.user.id,
        message,
        rating,
      },
    })

    return Response.json({ success: true, testimonial })
  } catch (err) {
    console.error("[POST_TESTIMONIAL]", err)
    return Response.json({ error: "Gagal menyimpan testimoni." }, { status: 500 })
  }
}
