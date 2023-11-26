
import SearchItemButton from '../components/(search-page)/SearchItemButton';
import SongMeaningContent from '../components/(song-page)/SongMeaningContent';
import { SongInfo } from '@/lib/validators/song_info';
import MoreFromArtist from '../components/(song-tables)/MoreFromArtist';
import TrendingChart from '../components/(song-tables)/TrendingChart';



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
            <TrendingChart />
        </div>
    );
};

export default TestPage;
