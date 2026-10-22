import React from 'react'
import Button from './button.js'
import { theController } from '../controller'

const MiddleDirectionRow = () => (
  <div className='ctrl-row'>
    <div className='ctrl-cell'>
      <Button
        buttonId='leftbutton'
        iconName='chevron-left'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('left') }}
        onPointerUp={(e)   => { e.preventDefault(); theController?.actionStop('left') }}
        onPointerLeave={()  => theController?.actionStop('left')}
      />
    </div>
    <div className='ctrl-cell'></div>
    <div className='ctrl-cell'>
      <Button
        buttonId='rightbutton'
        iconName='chevron-right'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('right') }}
        onPointerUp={(e)   => { e.preventDefault(); theController?.actionStop('right') }}
        onPointerLeave={()  => theController?.actionStop('right')}
      />
    </div>
  </div>
)

export default MiddleDirectionRow
