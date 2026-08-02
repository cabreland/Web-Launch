import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({ email: null }));

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.warn("BEEHIIV_API_KEY / BEEHIIV_PUBLICATION_ID not set — subscribe request not sent.");
    return NextResponse.json(
      { error: "Newsletter signup isn't configured yet. Try again shortly." },
      { status: 503 }
    );
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "weblaunch.io",
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("Beehiiv subscribe error:", res.status, errText);
    return NextResponse.json({ error: "Couldn't subscribe right now. Try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
