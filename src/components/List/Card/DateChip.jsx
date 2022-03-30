import { Chip } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from 'react'

const DateChip = ({data}) => {
  return (
    <Chip icon={<AccessTimeIcon />} color="primary" size="small" label={data} sx={{backgroundColor: "green"}} />
  )
}

export default DateChip
