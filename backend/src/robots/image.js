const state = require('./state')
const google = require('googleapis').google

const customSearch = google.customsearch('v1')

const googleSeachCredentials = require('../../credentials.json').google

async function robot() {
    const content = await  state.load()
    content.images = await fecthGoogleAndReturnImagesLinks(content.articleName)
    //await fecthImagesOfAllSentences(content)
    

    await state.save(content)

    async function fecthImagesOfAllSentences(content){
      

        for(sentence of content.sentences) {
            const query = `${content.articleName} ${sentence.keywords[0]}`

            sentence.images = await fecthGoogleAndReturnImagesLinks(query)

            sentence.googleSearchTerm = query

        }
    }

    async function fecthGoogleAndReturnImagesLinks(query){
        console.log(googleSeachCredentials)
        const response = await customSearch.cse.list({
            auth: googleSeachCredentials["google-search"],
            cx: googleSeachCredentials.searchEngineID,
            searchType: 'image',
            q: query,
            num: 1
        })
        

        const imagesUrl = response.data.items.map(item => {
            return item.link
        })

        return imagesUrl
    }



}

module.exports = robot
