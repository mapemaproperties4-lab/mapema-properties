const { writeFile } = require("fs/promises");
const { getListings } = require("../lib/publicListings");

async function main() {
  const listings = await getListings();
  await writeFile("listings.json", JSON.stringify(listings));
  console.log(`Saved ${listings.length} listings`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
