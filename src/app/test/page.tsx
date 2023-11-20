
import SongMeaningContent from '../components/(song-page)/SongMeaningContent';
import { SongInfo } from '@/lib/validators/song_info';



const TestPage: React.FC = () => {
    console.log("testpage rendered")
    const song_info: SongInfo = {
        song_slug: "Adele-to-be-loved",
        song_title: "To Be Loved by Adele",
        artist_name: "Adele",
        artist_slug: "Adele",
        genius_id: 7392788,
        genius_url: "https://genius.com/Adele-to-be-loved-lyrics"
    };
    return (
        <div>
            <SongMeaningContent 
                song_info={song_info}
            />
     
            <h1>Test Page</h1>
            {/* Add your test page content here */}
        </div>
    );
};

export default TestPage;
