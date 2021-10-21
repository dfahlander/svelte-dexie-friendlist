export async function getRandomNames(num) {
  const res = await fetch(
    `https://randommer.io/api/Name?nameType=firstname&quantity=${num}`,
    {
      headers: {
        "X-Api-Key": "67732372e6ee4db2b6d3a6a83804b57d"
      }
    }
  );
  if (!res.ok)
    throw new Error(
      "Failed to query randommer.io",
      res.status,
      await res.text()
    );
  return await res.json();
}
