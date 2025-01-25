import { CONGRESS_API_KEY } from "@/data/api/constants";

export async function GET(
  request: Request,
) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  console.log(page)
  const response = await fetch(`https://api.congress.gov/v3/bill?api_key=${CONGRESS_API_KEY}&limit=20&offset=${(parseInt(page) - 1) * 20}`);
  const data = await response.json();
  return Response.json(data.bills);
}

