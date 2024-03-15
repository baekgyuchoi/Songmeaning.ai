

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