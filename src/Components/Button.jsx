import React from 'react'

export const Button = ({handler, content}) => {
  return (
    <button onClick={handler} style={{ padding: "0.5rem 1rem", border: "none", borderRadius: ".3rem", color: "#fff", background: "#000"}}>{content}</button>
  )
}
