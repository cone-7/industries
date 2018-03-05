import React from 'react';

const RenderSubServices = (props) => {
  return (
    props.subservice.map((subservice) =>
      <div key={subservice.id}>Sub-servicio: {subservice.name}</div>
    )
   )
}

export default RenderSubServices;
