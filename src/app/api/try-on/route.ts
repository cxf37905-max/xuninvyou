import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const personImage = formData.get('personImage');
    const clothingImage = formData.get('clothingImage');

    if (!personImage || !clothingImage) {
      return NextResponse.json(
        { error: 'Both person image and clothing image are required' },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const categories = ['top', 'bottom', 'dress'] as const;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const mockResultImage = `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <rect fill="#f3f4f6" width="400" height="500"/>
        <text x="50%" y="40%" text-anchor="middle" font-family="system-ui" font-size="20" fill="#6b7280">
          Try-On Preview
        </text>
        <text x="50%" y="50%" text-anchor="middle" font-family="system-ui" font-size="14" fill="#9ca3af">
          Category: ${randomCategory}
        </text>
        <text x="50%" y="60%" text-anchor="middle" font-family="system-ui" font-size="12" fill="#9ca3af">
          (Mock Result - Replace with AI API)
        </text>
      </svg>
    `)}`;

    return NextResponse.json({
      resultImage: mockResultImage,
      generationId: `gen_${Date.now()}`,
      category: randomCategory,
    });
  } catch (error) {
    console.error('Try-on error:', error);
    return NextResponse.json(
      { error: 'Failed to generate try-on image' },
      { status: 500 }
    );
  }
}
