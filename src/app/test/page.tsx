
import SearchItemButton from '../components/(search-page)/SearchItemButton';
import SongMeaningContent from '../components/(song-page)/SongMeaningContent';
import { SongInfo } from '@/lib/validators/song_info';
import MoreFromArtist from '../components/(song-tables)/MoreFromArtist';



const TestPage: React.FC = () => {
    console.log("testpage rendered")
    const songInfo: SongInfo = {
        song_title: "Song Title",
        song_short_title: "Song Title",
        genius_url: "https://genius.com/Genius-english-translations-bts-dynamite-english-translation-lyrics",
        song_slug: "bts-dynamite-english-translation",
        genius_id: 4900781,
        artist_name: "Genius English Translations",
        artist_slug: "Genius-english-translations",
        header_image_url: "https://images.genius.com/6b5b1a34b7b09417468f3848046f1b71.300x300x1.png",
        song_art_url: "https://images.genius.com/6b5b1a34b7b09417468f3848046f1b71.300x300x1.png",
        release_date: "August 21, 2020",
    }
    return (
    <div>
    <MoreFromArtist artist_slug={songInfo.artist_slug} song_slug={songInfo.song_slug} />
    <div className='w-full flex items-center justify-center'>
        <MoreFromArtist artist_slug={songInfo.artist_slug} song_slug={songInfo.song_slug} />
        
        <div className="mt-4 grid grid-cols-1 gap-x-8 md:mt-6 md:grid-cols-3 md:gap-y-2 block">
            <SearchItemButton songInfo={songInfo} />    
            <div className="truncate max-w-2xl">
                <div className="group flex items-center gap-x-4 py-3">
                    <div className="relative flex w-12 h-12 overflow-hidden">
                        <img className="object-cover" src={songInfo.song_art_url} />
                    </div>
                    <div className="min-w-0 max-w-md">
                        <p className="truncate">{songInfo.song_title}</p>
                        <p className="text-gray-500 text-sm truncate">{songInfo.artist_name}</p>
                    </div>
                </div>
            </div>


            <div className="group flex items-center gap-x-4 py-3">
                <div className="w-12 h-12 bg-gray-300 "><img src="https://images.genius.com/6b5b1a34b7b09417468f3848046f1b71.300x300x1.png" /></div>
                <div className="flex flex-col items-start truncate">
                    <p className="truncate">Song Name</p>
                    
                </div>
            </div>
            <div className="group flex items-center gap-x-4 py-3">
                <div className="w-12 h-12 bg-gray-300 "></div>
                <div className="flex flex-col items-start truncate">
                    <p className="truncate">Song Name</p>
                    <p className="text-gray-500 text-sm truncate">Artist Name</p>
                </div>
            </div>
            <div className="group flex items-center gap-x-4 py-3">
                <div className="w-12 h-12 bg-gray-300 "></div>
                <div className="flex flex-col items-start truncate">
                    <p className="truncate">Song Name</p>
                    <p className="text-gray-500 text-sm truncate">Artist Name</p>
                </div>
            </div>
            <div className="group flex items-center gap-x-4 py-3">
                <div className="w-12 h-12 bg-gray-300 "></div>
                <div className="flex flex-col items-start truncate">
                    <p className="truncate">Song Name</p>
                    <p className="text-gray-500 text-sm truncate">Artist Name</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
};

export default TestPage;
