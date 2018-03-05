import React from 'react';
import RenderSubServices from "./subservice.jsx";

const RenderServices = (props) => {
  return (
    props.service.map((service) =>{
      if(service.children != null)
        return (
          <div>
            <div key={service.id}> Service: {service.name}</div>
            <RenderSubServices subservice={service.children}/>
          </div>
        )
      else
        return <div key={service.id}>Servicio: {service.name}</div>      
    })
  );
};

export default RenderServices;
