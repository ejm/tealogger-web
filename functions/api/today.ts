const dayToMilli = 24 * 60 * 60 * 1000;

interface Env {
  DB: D1Database;
}

const wasTeaConsumed = async (today: number, database: D1Database) => {
  const count = await database.prepare('SELECT COUNT(*) FROM tea_log WHERE datetime >= ? AND datetime < ?;')
    .bind(today, today + dayToMilli)
    .first<Record<string, number>>();
  const val: number = count["COUNT(*)"];
  console.log("Tea count:", val)
  return val > 0;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Get the current time at midnight in EDT
  // Maybe in the future we can get this for local timezone of the client?
  // https://stackoverflow.com/questions/69335079/i-want-to-get-new-york-time-in-this-javascript-clock
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  today.setHours(0, 0, 0, 0);

  return Response.json({
    "consumed": await wasTeaConsumed(today.getTime(), context.env.DB)
  });
};