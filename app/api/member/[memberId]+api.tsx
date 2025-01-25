import { CONGRESS_API_KEY } from "@/data/api/constants";

export async function GET(
  request: Request,
  { memberId }: Record<string, string>
) {
  const response = await fetch(
    `https://api.congress.gov/v3/member/${memberId}?api_key=${CONGRESS_API_KEY}`
  );
  const data = await response.json();
  return Response.json(data.member);
}
