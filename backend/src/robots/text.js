const Algorithmia = require('algorithmia')
const AlgorithmiaApiKey = require('../../credentials.json')["api-key"]
const watsonApiKey = require('../../credentials.json').watson["api-key"]

const NatutalLanguageUnderstadingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth');
const sbd = require('sbd')

const nlu = new NatutalLanguageUnderstadingV1({
    authenticator: new IamAuthenticator({ apikey: watsonApiKey }),
    version: '2018-04-05',
    url: 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/ed7cd5c3-6727-44f3-9468-5e0e4b63603a'
})


async function fecthWatsonAndReturnKeyword(sentence) {
    const response = await nlu.analyze({
        text: sentence,
        features: {
            keywords: {}
        }
    })
    const keywords = response.result.keywords.map((keyword) => keyword.text)

    return keywords
}

const state = require('./state')

module.exports =  async function robot(){
    const content = state.load()
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    limitMaximumSenteces(content)
    await fecthKeywordsOfAllSentences(content)

    state.save(content)

    async function fecthKeywordsOfAllSentences(content){
        for(sentence of content.sentences){
            sentence.keywords = await fecthWatsonAndReturnKeyword(sentence.text)
        }
    }

    async function fetchContentFromWikipedia(content){
        const response = await Algorithmia.client(AlgorithmiaApiKey)
        .algo("web/WikipediaParser/0.1.2?timeout=300")
        .pipe(content)
        
        content.sourceContentOriginal = response.get().content
    }

    function breakContentIntoSentences(content){
        content.sentences = []

        const sentences = sbd.sentences(content.sourceContentSanitized)

        sentences.forEach((sentece) => {
            content.sentences.push({
                text: sentece,
                keywords: [],
                images: []
            })
        } )
    }

    function limitMaximumSenteces(content){
        content.sentences = content.sentences.slice(0, content.maximumSenteces)
    }

    function sanitizeContent(content){
        const withOutBlankLinesandMarkDown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        content.sourceContentSanitized = removeDatesInParenthesis(withOutBlankLinesandMarkDown)
        breakContentIntoSentences(content)

        
        
        function removeBlankLinesAndMarkdown(text){
            const allLines = text.split('\n')

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')){
                    return false
                }

                return true
            })

            return withoutBlankLinesAndMarkdown.join(' ')
        }

        function removeDatesInParenthesis(text){
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }
    }
        
}
