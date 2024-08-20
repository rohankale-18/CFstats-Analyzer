import React from 'react'

const Tablevalue = ({first,second}) => {
  return (
        <tr>
            <th className='att-tab w-2/5'>{first}</th>
            <td className='val-tab w-2/5'>{second}</td>
        </tr>
  )
}

export default Tablevalue