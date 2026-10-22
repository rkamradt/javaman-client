import React from 'react'
import Button from './button.js'
import { theController } from '../controller'

const BottomDirectionRow = () => (
  <div className='ctrl-row'>
    <div className='ctrl-cell'></div>
    <div className='ctrl-cell'>
      <Button
        buttonId='downbutton'
        iconName='chevron-down'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('down') }}
        onPointerUp={(e)   => { e.preventDefault(); theController?.actionStop('down') }}
        onPointerLeave={()  => theController?.actionStop('down')}
      />
    </div>
    <div className='ctrl-cell'></div>
  </div>
)

export default BottomDirectionRow
