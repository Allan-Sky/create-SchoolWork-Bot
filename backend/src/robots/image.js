const state = require('./state')
const google = require('googleapis').google

const customSearch = google.customsearch('v1')

const googleSeachCredentials = require('../../credentials.json').google

async function robot() {
    const content = state.load()

    await fecthImagesOfAllSentences(content)
    

    console.log()
    state.save(content)

    async function fecthImagesOfAllSentences(content){
      

        for(sentence of content.sentences) {
            const query = `${content.articleName} ${sentence.keywords[0]}`

            sentence.images = await fecthGoogleAndReturnImagesLinks(query)

            sentence.googleSearchTerm = query

        }
    }

    async function fecthGoogleAndReturnImagesLinks(query){
        const response = await customSearch.cse.list({
            auth: googleSeachCredentials["google-search"],
            cx: googleSeachCredentials.searchEngineID,
            searchType: 'image',
            q: query,
            num: 2
        })  

        const imagesUrl = response.data.items.map(item => {
            return item.link
        })

        return imagesUrl
    }



}

module.exports = robot
