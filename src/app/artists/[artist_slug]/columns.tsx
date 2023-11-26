"use client"

import { SongInfo } from "@/lib/validators/song_info"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<SongInfo>[] = [
  {
    accessorKey: "song_short_title",
    header: "Song Title",
  },
  {
    accessorKey: "artist_name",
    header: "Artist Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
