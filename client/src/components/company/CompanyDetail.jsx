import React from 'react'
import { useParams } from 'react-router-dom';

const CompanyDetail = () => {
    let { name } = useParams();
     name = name.replace(/-/g, " "); 
  return (
    <div>
      {name} homepage
    </div>
  )
}

export default CompanyDetail
