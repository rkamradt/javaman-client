import React from 'react'
import Button from './button.js'
import { theController } from '../controller'

const ActionRow = () => (
  <div className='ctrl-row'>
    <div className='ctrl-cell'>
      <Button
        buttonId='resetbutton'
        iconName='refresh'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('reset') }}
        onPointerUp={(e)   => { e.preventDefault() }}
      />
    </div>
    <div className='ctrl-cell'>
      <Button
        buttonId='stopbutton'
        iconName='stop'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('stop') }}
        onPointerUp={(e)   => { e.preventDefault() }}
      />
    </div>
    <div className='ctrl-cell'>
      <Button
        buttonId='startbutton'
        iconName='play'
        onPointerDown={(e) => { e.preventDefault(); theController?.actionStart('start') }}
        onPointerUp={(e)   => { e.preventDefault() }}
      />
    </div>
  </div>
)

export default ActionRow
