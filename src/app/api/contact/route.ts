"use server"
import { NextResponse } from "next/server"

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req: Request) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json(
      { error: "Telegram configuration missing" },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const { user_name, user_email, user_message } = body

    if (!user_name || !user_email || !user_message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const text = `
   📩 *Новое сообщение с сайта*

   👤 *Имя:* ${user_name}
   📧 *Email:* ${user_email}

   📝 *Сообщение:*
   ${user_message}
       `

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown"
        })
      }
    )

    if (!response.ok) {
      const errData = await response.json()
      console.error("Telegram API error:", errData)
      return NextResponse.json(
        { error: "Failed to send message to Telegram" },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
