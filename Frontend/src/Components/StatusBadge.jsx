import { Badge } from '@mantine/core'
import React, { useEffect } from 'react'

const StatusBadge = ({status}) => 
{
    const selectColor = () => {
        switch(status) {
            case 'Submitted': return 'blue';
            case 'Completed': return 'green';
            case 'In Review': return 'yellow';
            case 'Needs Update': return 'red';
        }
    }
    useEffect(()=>console.log(status),[])

  return (
    <Badge color={selectColor()}>{status}</Badge>
  )
}

export default StatusBadge