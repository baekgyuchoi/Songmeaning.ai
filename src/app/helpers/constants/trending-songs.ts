
import prisma from '@/lib/db';

export const trending_song_slugs = ["Benson-boone-beautiful-things", "Tate-mcrae-greedy", "Jack-harlow-lovin-on-me", "Teddy-swims-lose-control", "Taylor-swift-cruel-summer", "Noah-kahan-stick-season", "Xavi-mex-la-diabla", "Miley-cyrus-flowers", "21-savage-redrum", "Ariana-grande-yes-and", "The-weeknd-jennie-and-lily-rose-depp-one-of-the-girls", "Creepy-nuts-bling-bang-bang-born", "Feid-and-atl-jacob-luna", "Dua-lipa-houdini", "Zach-bryan-i-remember-everything"]



export const trending_song_data = [
    {
      song_title: 'All I Want for Christmas Is You by Mariah Carey',
      song_short_title: 'All I Want for Christmas Is You',
      genius_url: 'https://genius.com/Mariah-carey-all-i-want-for-christmas-is-you-lyrics',
      song_slug: 'Mariah-carey-all-i-want-for-christmas-is-you',
      genius_id: 204233,
      artist_id: 1205,
      artist_name: 'Mariah Carey',
      artist_slug: 'Mariah-carey',
      header_image_url: 'https://images.genius.com/3b15629ba1002cade8708265ae49ba32.1000x1000x1.jpg',
      song_art_url: 'https://images.genius.com/e3d3cce0a600dc517de1a0c964280248.800x800x1.jpg',
      release_date: 'October 29, 1994'
    },
    {
      song_title: 'Last Christmas by Wham!',
      song_short_title: 'Last Christmas',
      genius_url: 'https://genius.com/Wham-last-christmas-lyrics',
      song_slug: 'Wham-last-christmas',
      genius_id: 1439197,
      artist_id: 15441,
      artist_name: 'Wham!',
      artist_slug: 'Wham',
      header_image_url: 'https://images.genius.com/c7fdfff2ba6c7a2bb0ca2157cf4d207c.947x948x1.jpg',
      song_art_url: 'https://images.genius.com/f9680e3c876e1466fa1d240e8b7609c9.1000x1000x1.png',
      release_date: 'December 3, 1984'
    },
    {
      song_title: 'Rockin’ Around the Christmas Tree by Brenda Lee',
      song_short_title: 'Rockin’ Around the Christmas Tree',
      genius_url: 'https://genius.com/Brenda-lee-rockin-around-the-christmas-tree-lyrics',
      song_slug: 'Brenda-lee-rockin-around-the-christmas-tree',
      genius_id: 104606,
      artist_id: 32563,
      artist_name: 'Brenda Lee',
      artist_slug: 'Brenda-lee',
      header_image_url: 'https://images.genius.com/d2eb4be8c909e93fad4fdd8b939bf25a.1000x1000x1.jpg',
      song_art_url: 'https://images.genius.com/fe4d43845445690de45628b9010c73be.300x300x1.jpg',
      release_date: 'November 17, 1958'
    },
    {
      song_title: 'Jingle Bell Rock by Bobby Helms',
      song_short_title: 'Jingle Bell Rock',
      genius_url: 'https://genius.com/Bobby-helms-jingle-bell-rock-lyrics',
      song_slug: 'Bobby-helms-jingle-bell-rock',
      genius_id: 623112,
      artist_id: 285859,
      artist_name: 'Bobby Helms',
      artist_slug: 'Bobby-helms',
      header_image_url: 'https://images.genius.com/f86745817d0648ed09be4de1577b2f94.600x600x1.jpg',
      song_art_url: 'https://images.genius.com/f86745817d0648ed09be4de1577b2f94.600x600x1.jpg',
      release_date: 'November 28, 1957'
    },
    {
      song_title: '​greedy by Tate McRae',
      song_short_title: '​greedy',
      genius_url: 'https://genius.com/Tate-mcrae-greedy-lyrics',
      song_slug: 'Tate-mcrae-greedy',
      genius_id: 9393794,
      artist_id: 1258628,
      artist_name: 'Tate McRae',
      artist_slug: 'Tate-mcrae',
      header_image_url: 'https://images.genius.com/1b810476ebc5abb270a0eeb60a980b7f.1000x1000x1.png',
      song_art_url: 'https://images.genius.com/1b810476ebc5abb270a0eeb60a980b7f.1000x1000x1.png',
      release_date: 'September 15, 2023'
    },
    {
      song_title: 'Santa Tell Me by Ariana Grande',
      song_short_title: 'Santa Tell Me',
      genius_url: 'https://genius.com/Ariana-grande-santa-tell-me-lyrics',
      song_slug: 'Ariana-grande-santa-tell-me',
      genius_id: 590331,
      artist_id: 26507,
      artist_name: 'Ariana Grande',
      artist_slug: 'Ariana-grande',
      header_image_url: 'https://images.genius.com/7d22404eff20f3b66da1a1c19e351428.1000x1000x1.jpg',
      song_art_url: 'https://images.genius.com/5616074d33e02dc83a9d2fb548938e8b.1000x1000x1.png',
      release_date: 'November 24, 2014'
    },
    {
      song_title: 'Lovin On Me by Jack Harlow',
      song_short_title: 'Lovin On Me',
      genius_url: 'https://genius.com/Jack-harlow-lovin-on-me-lyrics',
      song_slug: 'Jack-harlow-lovin-on-me',
      genius_id: 9706893,
      artist_id: 615747,
      artist_name: 'Jack Harlow',
      artist_slug: 'Jack-harlow',
      header_image_url: 'https://images.genius.com/179eb743cc07a54141016c0fe2de062a.1000x1000x1.png',
      song_art_url: 'https://images.genius.com/179eb743cc07a54141016c0fe2de062a.1000x1000x1.png',
      release_date: 'November 10, 2023'
    },
    {
      song_title: "It's The Most Wonderful Time of the Year (Re-Recorded) by Andy Williams",
      song_short_title: 'It’s The Most Wonderful Time of the Year (Re-Recorded)',
      genius_url: 'https://genius.com/Andy-williams-its-the-most-wonderful-time-of-the-year-re-recorded-lyrics',
      song_slug: 'Andy-williams-its-the-most-wonderful-time-of-the-year-re-recorded',
      genius_id: 2227619,
      artist_id: 526003,
      artist_name: 'Andy Williams',
      artist_slug: 'Andy-williams',
      header_image_url: 'https://images.genius.com/849af14c07b1ba24a0de0478443e685c.600x600x1.jpg',
      song_art_url: 'https://images.genius.com/849af14c07b1ba24a0de0478443e685c.600x600x1.jpg',
      release_date: 'June 19, 1995'
    },
    {
      song_title: 'It’s Beginning to Look a Lot Like Christmas by Michael Bublé',
      song_short_title: 'It’s Beginning to Look a Lot Like Christmas',
      genius_url: 'https://genius.com/Michael-buble-its-beginning-to-look-a-lot-like-christmas-lyrics',
      song_slug: 'Michael-buble-its-beginning-to-look-a-lot-like-christmas',
      genius_id: 512407,
      artist_id: 59801,
      artist_name: 'Michael Bublé',
      artist_slug: 'Michael-buble',
      header_image_url: 'https://images.genius.com/3df90b419c626fc3e8ad9fe55cec718a.1000x1000x1.png',
      song_art_url: 'https://images.genius.com/3df90b419c626fc3e8ad9fe55cec718a.1000x1000x1.png',
      release_date: 'October 21, 2011'
    },
    {
      song_title: 'Snowman by Sia',
      song_short_title: 'Snowman',
      genius_url: 'https://genius.com/Sia-snowman-lyrics',
      song_slug: 'Sia-snowman',
      genius_id: 3276441,
      artist_id: 16775,
      artist_name: 'Sia',
      artist_slug: 'Sia',
      header_image_url: 'https://images.genius.com/f142573dbad14dd5cea9f9f933a56f16.592x592x1.png',
      song_art_url: 'https://images.genius.com/f142573dbad14dd5cea9f9f933a56f16.592x592x1.png',
      release_date: 'November 10, 2017'
    },
    {
      song_title: 'Cruel Summer by Taylor Swift',
      song_short_title: 'Cruel Summer',
      genius_url: 'https://genius.com/Taylor-swift-cruel-summer-lyrics',
      song_slug: 'Taylor-swift-cruel-summer',
      genius_id: 4712978,
      artist_id: 1177,
      artist_name: 'Taylor Swift',
      artist_slug: 'Taylor-swift',
      header_image_url: 'https://images.genius.com/3dce13a448e22554ed04246ec06e3207.1000x1000x1.jpg',
      song_art_url: 'https://images.genius.com/e7c48b581694dfb311ebc6d4a87432ce.1000x1000x1.jpg',
      release_date: 'August 23, 2019'
    },
    {
      song_title: 'Paint The Town Red by Doja Cat',
      song_short_title: 'Paint The Town Red',
      genius_url: 'https://genius.com/Doja-cat-paint-the-town-red-lyrics',
      song_slug: 'Doja-cat-paint-the-town-red',
      genius_id: 9028858,
      artist_id: 139478,
      artist_name: 'Doja Cat',
      artist_slug: 'Doja-cat',
      header_image_url: 'https://images.genius.com/e1c7dc1e1a5aaa5d8238702efc786725.1000x1000x1.png',
      song_art_url: 'https://images.genius.com/ad1ffc010b6ad8caec31e73bf62f5e77.1000x1000x1.png',
      release_date: 'August 4, 2023'
    },
    {
      song_title: 'Standing Next to You by Jung Kook (정국)',
      song_short_title: 'Standing Next to You',
      genius_url: 'https://genius.com/Jung-kook-standing-next-to-you-lyrics',
      song_slug: 'Jung-kook-standing-next-to-you',
      genius_id: 9626005,
      artist_id: 1016907,
      artist_name: 'Jung Kook (정국)',
      artist_slug: 'Jung-kook',
      header_image_url: 'https://images.genius.com/1bc1a5d7500f4b51a61a6a251714dc9a.1000x1000x1.jpg',
      song_art_url: 'https://images.genius.com/93ead7a974f0cfb8d62f666a08171838.344x344x1.jpg',
      release_date: 'November 3, 2023'
    },
    {
      song_title: 'Seven (Explicit Ver.) by Jung Kook (정국) (Ft. Latto)',
      song_short_title: 'Seven (Explicit Ver.)',
      genius_url: 'https://genius.com/Jung-kook-seven-explicit-ver-lyrics',
      song_slug: 'Jung-kook-seven-explicit-ver',
      genius_id: 9291535,
      artist_id: 1016907,
      artist_name: 'Jung Kook (정국)',
      artist_slug: 'Jung-kook',
      header_image_url: 'https://images.genius.com/c4eaa2b2d461f53655c7e0db4b348cdb.1000x1000x1.png',
      song_art_url: 'https://images.genius.com/9221699d26ea719c45f5bd2991285a90.1000x1000x1.jpg',
      release_date: 'July 14, 2023'
    },
    {
      song_title: 'Water by Tyla',
      song_short_title: 'Water',
      genius_url: 'https://genius.com/Tyla-water-lyrics',
      song_slug: 'Tyla-water',
      genius_id: 9359811,
      artist_id: 2601015,
      artist_name: 'Tyla',
      artist_slug: 'Tyla',
      header_image_url: 'https://images.genius.com/403de4d257be9a677be4d70dfab97e6b.1000x1000x1.png',
      song_art_url: 'https://images.genius.com/403de4d257be9a677be4d70dfab97e6b.1000x1000x1.png',
      release_date: 'July 28, 2023'
    }
  ]