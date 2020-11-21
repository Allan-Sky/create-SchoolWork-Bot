import React,{useState} from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/search.module.css'



function pages() {
  const [articleName, setArticleName] = useState('')
  const [lang, setLang] = useState('pt')
  const [loading, setLoading] = useState(false)
  const routes= useRouter()
  const handleSearchOnBackend = () => {
      setLoading(true)
      fetch(`http://localhost:8080/${articleName}/${lang}`).then(() => routes.push('/work'))
      
  }
  return (
      <div>
          <input placeholder="50 fatos sobre" value={articleName} onChange={(e) => setArticleName(e.target.value)}/>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="pt">portugues</option>
              <option value="en">ingles</option>
          </select>
          <button onClick={handleSearchOnBackend}>Pesquisar</button>

          {
              loading == true && (
                  <h1>Aguarde uns segundos</h1>
              )
          }
      </div>
  )
}



export default pages;