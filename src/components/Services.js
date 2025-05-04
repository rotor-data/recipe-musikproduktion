import React from "react";
import Service from "./Service";

const Services = ({ services, headline }) => {

  return (
    <div className="mb-3 pt-3">
      <h2 className="is-size-2 has-text-centered has-text-white mb-3">{headline}</h2>
      <div className="is-flex is-flex-wrap-wrap is-justify-content-center">
        {services.map((service, index) => (
          <div key={index} className="p-0 m-0">
            <Service tooltip={service.service.tooltip} name={service.service.name} index={index}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
