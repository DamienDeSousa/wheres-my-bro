import { Input } from '@chakra-ui/react'
import React from 'react'

interface ITownProps {
  setTown: React.Dispatch<string>
}

export const TownInput = (props: ITownProps) => {
  return (
    <>
      <Input size="lg" placeholder="Paris" variant="flushed" onChange={event => props.setTown(event.target.value)} />
    </>
  )
}
