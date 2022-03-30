import { Chip } from '@mui/material'
import React from 'react'

const LabelChip = ({data}) => {
  return (
    <Chip color="primary" size="small" sx={{backgroundColor: data.color, width: 25, height: 8, mr: 1}} />
  )
}

export default LabelChip
