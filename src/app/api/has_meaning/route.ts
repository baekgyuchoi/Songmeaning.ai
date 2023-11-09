

export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    const song_id = queryParam.get('q')
    // query if song_id exists in database or use song_slug instead

    return new Response()
}