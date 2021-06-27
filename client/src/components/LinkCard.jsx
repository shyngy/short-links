import React from 'react'

function LinkCard({ link }) {
  const date = new Date(link.date).toLocaleDateString().replace(/\//g, '.')
  return (
    <>
      <h2>link</h2>
      <p>короткая ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer" >{link.to}</a></p>
      <p>ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer" >{link.from}</a></p>
      <p>клики: <strong>{link.clicks}</strong></p>
      <p>Дата создание: <strong>{date}</strong></p>
    </>
  )
}

export default LinkCard
