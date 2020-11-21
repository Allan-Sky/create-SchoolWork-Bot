import React from 'react';
import styles from '../styles/work.module.css'
function pages({data}) {
  return (
      <div>
          <header className={styles.header}>
                <img  className={styles.thumb} src={data.images[0]}/>
                <div className={styles.headerBlock}>
                    <h1 className={styles.headerTitle}>50 fatos sobre {data.articleName}</h1>
                </div>
          </header>
        <main className={styles.main}>
                {
                data.sentences.map((sentence, index) => (
                    <div key={index} className={styles.fact}>
                        {index + 1}:{sentence.text}
                    </div>
                ))
            }
        </main>
      <footer className={styles.footer}> 
          <h3 className={styles.footerText}>Obrigado por ver :)</h3>
      </footer>
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