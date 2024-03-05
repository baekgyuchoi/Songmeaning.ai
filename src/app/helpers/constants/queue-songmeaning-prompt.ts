


export const songBackgroundPrompt = `
Background:
Provide 2 bullet point phrases and do not repeat what is already in the summary:
If the song is known to have sampled any older songs, have one bullet point phrase about the sample.
Potential topics to include in the bullet points:
Fun fact about the song, or background information about the song or artist at the time of song release, and context behind the song given by Annotations.
what samples of older songs the artist may have used in producing the song, and context behind the song given by annotations. 
Make sure this section only contains VERIFIED FACTS.

`
export const songMeaningPrompt = `
ONLY RETURN IN JSON FORMAT
ex - {"summary": string, "emotional_journey": [string], "quotes": [{"quote":string, "explanation":string}], "background":[string] }

summary:
In the first paragraph of your interpretation, provide a concise yet comprehensive summary analysis of the song's meaning, setting the stage for the subsequent exploration.


emotional_journey:
MAKE SURE THIS SECTION IS SUBSTANTIALLY LONG AND IN-DEPTH. SHOULD BE 4-5 PARAGRAPHS IN LENGTH. 
Give me a comprehensive analysis of the emotional journey given  the song title, lyrics,  and annotations for those lyrics.
write in the form of a paragraph. Be as entertaining and engaging as possible in writing. Try not to use words that the average American couldn't understand. Refer to the artists by their full artist names, not just their last names

In the case you run into copyright problems, only sample a small portion of the lyrics so it is okay

In the case the lyrics are too explicit, only provide an explanation of the lyrics or sample portions that are less explicit.

DO NOT use more than 1000 tokens in the response


quotes:

Are there any references in the lyrics here that some people may not get?

If there aren't references, replace them with meaningful quotes.

If the lyric's aren't in English, provide a translation with the quote. 

If so, list them out below. Do not list more than 4.

List them out in the follow format ONLY:

1. "Addison Lee" – Addison Lee is a private hire taxi company in London, UK. The artist mentions not getting into an Addison Lee unless the person the song is addressed to comes with him, which emphasizes his desire to stay together rather than leave.

2. "I'm packin' my bags that I didn't unpack the last time" – This line could be a reference to the lifestyle of a touring musician or someone who travels frequently for work, rarely spending time at home before leaving again.

3. "I'm sayin', 'see you again' so many times it's becomin' my tag line" – A tagline is typically a catchphrase or slogan associated with a product, brand, or individual. In this context, he's referring to the repetitive nature of his farewells due to his frequent departures.

4. "But for now, it's 'goodbye'" – This line suggests a recurring theme of temporary departures and the sadness that comes with having to say goodbye repeatedly.

background:

Provide 2 SHORT bullet point phrases and do not repeat what is already in the summary:

Bullets should be about: 

Fun fact about the song, background of artist at the time of song, and  context behind the song given by Annotations. 


Make sure all bullet points are verified factually. 
 `

export const songQuotesPrompt = `
Are there any references in the lyrics here that some people may not get?

If so, list them out below. Do not list more than 4.

List them out in the follow format ONLY:

Here is an example of the result for the song Car's Outside by James Arthur:

1. "Addison Lee" – Addison Lee is a private hire taxi company in London, UK. The artist mentions not getting into an Addison Lee unless the person the song is addressed to comes with him, which emphasizes his desire to stay together rather than leave.

2. "I'm packin' my bags that I didn't unpack the last time" – This line could be a reference to the lifestyle of a touring musician or someone who travels frequently for work, rarely spending time at home before leaving again.

3. "I'm sayin', 'see you again' so many times it's becomin' my tag line" – A tagline is typically a catchphrase or slogan associated with a product, brand, or individual. In this context, he's referring to the repetitive nature of his farewells due to his frequent departures.

4. "But for now, it's 'goodbye'" – This line suggests a recurring theme of temporary departures and the sadness that comes with having to say goodbye repeatedly.`



export const songStructuredPrompt = `
ONLY RETURN IN JSON FORMAT in the following schema:
schema: {
    type: 'object',
    properties: {
        background: {
            type: 'object',
            properties: {
                'first_point': {type: 'string'},
                'second_point': {type: 'string'},
            },
            required: ['first_point', 'second_point']
        },
        intro: {
            type: 'string',
        },
        meaning: {
            type: 'object',
            properties: {
                'paragraph_1': {type: 'string'},
                'paragraph_2': {type: 'string'},
                'paragraph_3': {type: 'string'},
                'paragraph_4': {type: 'string'},
            }
        }
        quotes: {
            type: 'object',
            properties: {
                'quote_1': {type: 'object',
                    properties: {
                        'quote': {type: 'string'},
                        'explanation': {type: 'string'}
                    },
                    required: ['quote', 'explanation']
                },
                'quote_2': {type: 'object',
                    properties: {
                        'quote': {type: 'string'},
                        'explanation': {type: 'string'}
                    },
                    required: ['quote', 'explanation']
                },
                'quote_3': {type: 'object',
                    properties: {
                        'quote': {type: 'string'},
                        'explanation': {type: 'string'}
                    },
                    required: ['quote', 'explanation']
                },
                'quote_4': {type: 'object',
                    properties: {
                        'quote': {type: 'string'},
                        'explanation': {type: 'string'}
                    },
                    required: ['quote', 'explanation']
                },
            },
        },
    }

  }

given a song's lyrics and it's annotations, provide a comprehensive analysis of the following:

Background:

Provide 2 SHORT bullet point phrases and do not repeat what is already in the summary:

Bullets should be about: 

Fun fact about the song, background of artist at the time of song, and  context behind the song given by Annotations. 


Make sure all bullet points are verified factually. 

Intro:
Provide a concise yet comprehensive summary analysis of the song's meaning, setting the stage for the subsequent exploration.
Make this section at least 3 sentences long.

Meaning:

MAKE SURE THIS SECTION IS SUBSTANTIALLY LONG AND IN-DEPTH.

In the case you run into copyright problems, only sample a small portion of the lyrics so it is okay

In the case the lyrics are too explicit, only provide an explanation of the lyrics or sample portions that are less explicit.

Paragraph_1: 5 sentences introducing and setting the stage for analysis
Paragraph_2: 7 sentences delving into the emotional journey of the song's lyrics
Paragraph_3: 7 sentences delving into the Artist's intent and the song's impact on the listener
Paragraph_4: 5 sentences concluding the analysis

Quotes:
extract 4 unique and significant quotes from the lyrics and provide an explanation for each quote.

`

export const songMeaningSpecificPrompt = `
Meaning:
MAKE SURE THIS SECTION IS SUBSTANTIALLY LONG AND IN-DEPTH. SHOULD BE 4-5 PARAGRAPHS IN LENGTH. (at least 12 sentences long)
Give me a comprehensive analysis of the emotional journey given  the song title, lyrics,  and annotations for those lyrics.
write in the form of a paragraph. Be as entertaining and engaging as possible in writing. Try not to use words that the average American couldn't understand. Refer to the artists by their full artist names, not just their last names

In the case you run into copyright problems, only sample a small portion of the lyrics so it is okay

In the case the lyrics are too explicit, only provide an explanation of the lyrics or sample portions that are less explicit.

DO NOT use more than 1000 tokens in the response
`