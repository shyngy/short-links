import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks'
import { useHistory } from 'react-router-dom'
import enterSvg from '../assets/img/logout.svg'
function CreatePage() {
  const history = useHistory()

  const auth = React.useContext(AuthContext)
  const [link, setLink] = React.useState('')
  const { request } = useHttp()


  const pressHandler = async event => {
    console.log(event);
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` })
        console.log(data)
        history.push(`/detail/${data.link._id}`)
      } catch (error) {

      }
    }
    if (event.type === 'click') {
      try {
        const data = await request('/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` })
        console.log(data)
        history.push(`/detail/${data.link._id}`)
      } catch (error) {

      }
    }

  }
  return (
    <div className='crate-container'>
      <p>Введите <mark>длинный</mark> url адрес и нажмите кнопку <code>Enter</code> чтобы получить новую короткую ссылку.</p>

      <div className="input-field">
        <input
          className="url__input"
          placeholder="Вставьте ссылку"
          id="link"
          type="text"
          value={link}
          onChange={e => setLink(e.target.value)}

          onKeyPress={pressHandler}
        />
        <button onClick={pressHandler} className="short-btn"><img src={enterSvg} className="enter-svg" alt="enter" /></button>
      </div>

    </div>
  )
}

export default CreatePage


