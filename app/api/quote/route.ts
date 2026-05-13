import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to webhook — replace WEBHOOK_URL env var with your actual endpoint
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          source: "cscleaners.com.au",
          receivedAt: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
