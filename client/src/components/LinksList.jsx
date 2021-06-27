import React from 'react'
import { Link } from 'react-router-dom'

function LinksList({ links }) {

  if (!links.length) {
    return <p>ссылок пока нету</p>
  }
  return (


    <div className="link-container">
      <table className="inside-container">
        <thead>
          <tr>
            <th>№</th>
            <th>Оригинальная</th>
            <th>Сокращенная</th>
            <th>открыть</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => {
            console.log(link);
            return (
              <tr className="table-body" key={link.code}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <Link to={`/detail/${link._id}`} key={index}>открыть</Link>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>

  )
}

export default LinksList
