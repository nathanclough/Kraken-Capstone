import '../App.css';
import * as React from 'react';
import CardViewPage from '../Components/CardViewPage/CardViewPage.jsx';


function CardView(props) {
//render the card view component into the page
  return (
    <div className="App-Page">
      <CardViewPage/>
    </div>
  );

}
export default CardView;