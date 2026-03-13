import { NextResponse } from "next/server";
import { google } from "googleapis";

type RequestItem = {
  id: string;
  name: string;
  quantity: number;
  pricePerEvent: number;
};

type RequestPayload = {
  name: string;
  phone: string;
  telegram: string;
  eventStart: string;
  eventEnd: string;
  deliveryMethod: string;
  comment: string;
  items: RequestItem[];
  totalItems: number;
  totalAmount: number;
};

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

function normalizeDate(value: string) {
  return value ? value : "";
}

function formatItems(items: RequestItem[]) {
  if (!items.length) return "";
  return items
    .map((item) => `${item.name} x${item.quantity}`)
    .join("; ");
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as RequestPayload;

    if (!payload?.name || !payload?.phone) {
      return NextResponse.json(
        { error: "Укажите имя и телефон" },
        { status: 400 }
      );
    }

    if (!payload?.eventStart || !payload?.eventEnd) {
      return NextResponse.json(
        { error: "Укажите начало и окончание мероприятия" },
        { status: 400 }
      );
    }

    const spreadsheetId = getEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Лист1";
    const clientId = getEnv("GOOGLE_CLIENT_ID");
    const clientSecret = getEnv("GOOGLE_CLIENT_SECRET");
    const redirectUri = getEnv("GOOGLE_REDIRECT_URI");
    const refreshToken = getEnv("GOOGLE_REFRESH_TOKEN");

    const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    auth.setCredentials({ refresh_token: refreshToken });

    const sheets = google.sheets({ version: "v4", auth });

    const header = [
      [
        "Дата отправки",
        "Имя",
        "Телефон",
        "Telegram",
        "Начало",
        "Окончание",
        "Способ получения",
        "Комментарий",
        "Позиции",
        "Предметов всего",
        "Сумма"
      ]
    ];

    const headerRange = `${sheetName}!A1:K1`;
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange
    });

    if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: "RAW",
        requestBody: { values: header }
      });
    }

    const row = [
      new Date().toISOString(),
      payload.name,
      payload.phone,
      payload.telegram || "",
      normalizeDate(payload.eventStart),
      normalizeDate(payload.eventEnd),
      payload.deliveryMethod || "",
      payload.comment || "",
      formatItems(payload.items || []),
      String(payload.totalItems ?? ""),
      String(payload.totalAmount ?? "")
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
