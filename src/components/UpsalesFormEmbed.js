import React, {useState} from "react";




const UpsalesFormEmbed = ({url}) => {

   const [modalActive, setModalActive] = useState(false);
 return (
 
       <iframe src={url} width="360" height="655" 	style={{border:"0"}}></iframe>
 )
}

export default UpsalesFormEmbed
