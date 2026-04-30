import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import { db } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const ARK_MODEL = 'doubao-seedream-5-0-260128';

interface ArkErrorResponse {
  error?: {
    code?: string;
    message?: string;
    type?: string;
  };
}

interface TryOnRequestBody {
  personImage: string;
  clothingImage: string;
}

class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleArkError(response: Response): Promise<never> {
  const status = response.status;
  let message = '请求失败，请稍后重试';

  try {
    const data: ArkErrorResponse = await response.json();
    message = data.error?.message || message;
  } catch {
    message = '请求失败，请稍后重试';
  }

  switch (status) {
    case 401:
      throw new ApiError(401, 'API Key 无效或已过期，请检查配置', 'AUTH_ERROR');
    case 403:
      throw new ApiError(403, '无权访问该资源', 'FORBIDDEN');
    case 429:
      throw new ApiError(429, '请求过于频繁，请稍后再试', 'RATE_LIMIT');
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      throw new ApiError(status, '服务端异常，请稍后重试', 'SERVER_ERROR');
    default:
      throw new ApiError(status, message, 'UNKNOWN_ERROR');
  }
}

async function checkAndUseTrial(userId: number) {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  if (!subscription) {
    throw new ApiError(403, 'Subscription not found', 'NO_SUBSCRIPTION');
  }

  if (subscription.status !== 'SUBSCRIBED') {
    if (subscription.remainingTrials <= 0) {
      throw new ApiError(403, '试用次数已用完，请购买套餐', 'NO_TRIALS');
    }

    await db
      .update(subscriptions)
      .set({
        remainingTrials: subscription.remainingTrials - 1,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, userId));
  }

  return subscription;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);

    await checkAndUseTrial(userId);

    const apiKey = process.env.ARK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: '服务配置错误，请联系管理员', code: 'CONFIG_ERROR' },
        { status: 500 }
      );
    }

    const body: TryOnRequestBody = await request.json();
    const { personImage, clothingImage } = body;

    if (!personImage || !clothingImage) {
      return NextResponse.json(
        { error: '请上传人物图片和服装图片', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    const apiResponse = await fetch(ARK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({
        model: ARK_MODEL,
        prompt: '将图1的服装换为图2的服装',
        image: [personImage, clothingImage],
        sequential_image_generation: 'disabled',
        response_format: 'url',
        size: '2K',
        stream: false,
        watermark: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!apiResponse.ok) {
      await handleArkError(apiResponse);
    }

    const data = await apiResponse.json();

    if (!data.data || !data.data[0]?.url) {
      return NextResponse.json(
        { error: '生成失败，未返回有效结果', code: 'INVALID_RESPONSE' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resultImage: data.data[0].url,
      generationId: `ark_${Date.now()}`,
      category: 'top',
      usage: data.usage,
    });
  } catch (error) {
    console.error('Try-on API error:', error);

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: '请求超时，请检查网络后重试', code: 'TIMEOUT' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: '生成失败，请稍后重试', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
