export async function GET() {
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (let i = 0; i <= 300; i++) {
        xmlContent += `
        <sitemap>
            <loc>https://www.songmeaning.ai/sitemaps/${i}.xml</loc>
        </sitemap>`;
    }

    xmlContent += `
    </sitemapindex>`;

    return new Response(xmlContent, { headers: { "Content-Type": "text/xml" } });
}