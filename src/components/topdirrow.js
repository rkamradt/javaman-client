import React from 'react'
import Button from './button.js'
import { theController } from '../controller'

const TopDirectionRow = () => (
  <div className='ctrl-row'>
    <div className='ctrl-cell'></div>
    <div className='ctrl-cell'>
      <Button
        buttonId='upbutton'
        iconName='chevron-up'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('up') }}
        onPointerUp={(e)   => { e.preventDefault(); theController?.actionStop('up') }}
        onPointerLeave={()  => theController?.actionStop('up')}
      />
    </div>
    <div className='ctrl-cell'></div>
  </div>
)

export default TopDirectionRow
