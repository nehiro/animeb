import React from 'react'

const AnimeTag = () => {
  const tags = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25
  ]
  return (
    <ul className="list-decimal list-inside grid grid-cols-gridResponsive gap-4 justify-items-start">
      {tags.map((item) => (
        <li>タグ名</li>
      ))}
    </ul>
  )
}

export default AnimeTag
