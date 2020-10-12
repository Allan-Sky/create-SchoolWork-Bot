const readline = require('readline-sync')
 const state =require('./state')
function robot() {

    const content = {  }

    content.articleName = askAndReturnSearchTerm()
    content.lang= askAndReturnLang()
    contentmaximumSenteces = askAndReturnMaximumSentences()

    state.save(content)
    function askAndReturnSearchTerm(){
        return readline.question('Type a Wikipedia search term: ')
    }
    function askAndReturnLang(){
        return readline.question('Type a lang that you want search: ')
    }
    function askAndReturnMaximumSentences(){
        return readline.question('Type the sentences that you want:')
    }

}

module.exports = robot