import React from 'react';

function pages({data}) {
  
  return (
      <div>
      {
          data.sentences.map(sentence => (
              <div>
                  {sentence.text}
              </div>
          ))
      }
      </div>
  )
}


export async function getStaticProps() {
    const response = await fetch('http://localhost:8080/')
    const data = await response.json()
    return {
        props: {
            data
        }
    }
}

export default pages;