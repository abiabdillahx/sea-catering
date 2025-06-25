import { hash } from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { name, username, phone, password } = await req.json()

    if (!name || !username || !phone || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 })
    }

    const existing = await prisma.users.findFirst({
      where: {
        OR: [{ username }, { phone }]
      }
    })

    if (existing) {
      return NextResponse.json({ error: "Username atau No HP sudah digunakan" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.users.create({
      data: {
        id: uuidv4(),
        name,
        username,
        phone,
        password: hashedPassword,
      }
    })

    return NextResponse.json({ success: true, user: { id: user.id } })
  } catch (err) {
    console.error("[REGISTER_ERROR]", err)
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 })
  }
}
