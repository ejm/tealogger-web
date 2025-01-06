export interface TeaLog extends PartialTeaLog {
  id: number;
  datetime: number;
}

export interface PartialTeaLog extends Record<string, unknown> {
  temperature: string;
  tea_type: string;
  lat: string;
  lon: string;
  place: string
}