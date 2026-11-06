v1.1.6

Public listings come from Mapema's company feed (company 2) on the
[Pro Sync public website API](https://re-api.gostudio.cloud/docs/public-websites).
The Next.js server follows all cursor pages and shares the results for one minute.
Existing numeric property URLs continue to work. No API key is needed for public
reads. The dashboard editor uses the new host's v1 read endpoint for editing
fields; listing writes and inquiry delivery are separate integrations.

Run `npm run dev` for local development, or `npm run build` and `npm start` for
a production preview. Listing pages need network access to the API at runtime.
