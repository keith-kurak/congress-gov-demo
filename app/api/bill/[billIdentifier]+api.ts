import { CONGRESS_API_KEY } from "@/data/api/constants";

export async function GET(
  request: Request,
  { billIdentifier }: Record<string, string>
) {
  const identifierParts = billIdentifier.split("-");
  const congress = identifierParts[0];
  const type = identifierParts[1];
  const number = identifierParts[2];

  const response = await fetch(
    `https://api.congress.gov/v3/bill/${congress}/${type.toLowerCase()}/${number}?api_key=${CONGRESS_API_KEY}`
  );
  const data = await response.json();
  return Response.json(data.bill);
}
