import React from 'react'

interface ITownProps {
  setTown: React.Dispatch<string>
}

export const TownInput = (props: ITownProps) => {
  return (
    <>
      <input placeholder="Paris" onChange={event => props.setTown(event.target.value)} />
    </>
  )
}
