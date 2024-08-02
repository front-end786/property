"use client"
import Purchase from '@/components/admin/Purchase';
import Remortgage from '@/components/admin/Remortgage';
import Sale from '@/components/admin/Sale'
import Transfer_Equity from '@/components/admin/Transfer_Equity';
import React, {useState} from 'react'

function AdminPage() {
    const [name, setName] = useState(<></>);
  return (
    <div>
        <h1 className="text-4xl">Admin Page</h1>
<div>
    <div className="flex flex-row  justify-around ">
    <button onClick={()=> setName(<Sale/>)}>Property Sale</button>
        <button onClick={()=> setName(<Purchase/>)}>Property Purchase</button>
        <button onClick={()=> setName(<Remortgage/>)}>Remortgage</button>
        <button onClick={()=> setName(<Transfer_Equity/>)}>Transfer of Equity</button>
    </div>
</div>
        
        {name}
    </div>
  )
}

export default AdminPage