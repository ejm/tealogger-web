import { PartialTeaLog } from "../../src/schema";

interface Env {
  DB: D1Database;
  API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  console.log(context.request.headers.get("Authorization"));
  if (context.request.headers.get("Authorization") != `Bearer ${context.env.API_KEY}`) {
    return new Response("401 Unauthorized", { status: 401 })
  }
  const data = await context.request.json() as PartialTeaLog;
  const datetime = new Date().getTime();

  const resp = await context.env.DB.prepare("INSERT INTO tea_log (datetime, temperature, tea_type, lat, lon, place) VALUES (?, ?, ?, ?, ?, ?);")
    .bind(
      datetime,
      data.temperature,
      data.tea_type,
      data.lat || null,
      data.lon || null,
      data.place || null
    )
    .run();
  return Response.json({
    "success": true
  });
};