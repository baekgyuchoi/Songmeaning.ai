export const songs_faq_prompts = [
    [`Give me two songs within the same genre that has similar lyrics as this song. The lyrics can be similar in mood, tone, or the message that it delivers.

    Write a brief paragraph for why each song was chosen
    
    DO NOT write out the lyrics of each song.
    
    Response format:
    
    Two songs that are similar to this songs are: X and Y
    
    X paragraph
    `,"Songs with Similar Lyrics"],
    [`Given the song, artist, lyric, and meanings, what occasion, setting, atmosphere would suit this song? Give an in-depth reasoning for each decision.  
    `,"Best Atmosphere/Setting for This Song"],
    [`Given the interpretation of (song name) by (artist name), provide advice on how someone can integrate the meaning and essence of the song into their life without using politically correct language.Don’t explicitly state what you are doing; just offer guidance based on the song's theme
    `,"Application of Song Meaning to Life"]
];

const archived_prompts = [
    [`Can you provide background information about (Artist name)? Including details about their early life/family background, dating life, career beginnings and career progression, notable achievements, notable controversies, fun facts, details of personal life that only the most fervent fans would be aware of, significant albums or songs, and any impact or influence they've had on the music industry or culture? Please do not feel limited and go as deep into the weeds as possible.  For example, if you were discussing Enya you would want to include details of how she decorates her castle, details of her attempted kidnappings, how and why she does not tour.  For Taylor Swift you would want to discuss her notable controversies in detail such as how kanye came on stage. Please also include 3-5 important quotes from the artist about their career, philosophy or anything that speaks to them as a person. 
`,"Background Information about Artist"],
    [`Given two words that the song represents, give a good explanation about why each word fits with the song's lyrics. one paragraph for each word.
`,"Breakdown of Song Badges"],  
]

