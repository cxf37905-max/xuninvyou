import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/db';
import { users, subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendWelcomeEmail } from '@/lib/email'


export async function POST(request: NextRequest) {
  try {
    const { name, email, password, turnstileToken} = await request.json();

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    )
    const verifyResult = await verifyResponse.json()
    if (!verifyResult.success) {
      return Response.json(
        { error: '人机验证失败，请重试' },
        { status: 403 }
      )
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const [newUser] = await db
      .insert(users)
      .values({
        name: name || null,
        email,
        password: hashedPassword,
      })
      .returning();

    await db.insert(subscriptions).values({
      userId: newUser.id,
      plan: 'free',
      status: 'FREE_TRIAL',
    });

    // 注册成功后，发送欢迎邮件（失败不影响注册）
    try {
      await sendWelcomeEmail(email, name)
    } catch (error) {
      console.error('欢迎邮件发送失败：', error)
      // 不 throw，不影响注册流程
    }

    return NextResponse.json(
      { message: 'User created successfully', userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
