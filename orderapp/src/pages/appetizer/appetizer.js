import React from 'react';
import MenuitemContainer from '../../components/MenuitemContainer';

export default function Appetizer(props) {

  return (
    <div>
      <MenuitemContainer className="maincontainer" itemData={props.data} addtocart={props.addtocart} type={props.type}/>
    </div>
  );
}