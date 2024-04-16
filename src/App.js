import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './component/Home';
import Agent from './component/Agent';
import ReceiverAgent from "./component/ReceiverAgent";
import DocumentPage from './component/AgentDashboard/DocumentPage';
import ContainerManagement from './component/AgentDashboard/ContainerManagement';
import ShipmentStatus from "./component/ReceiverDashboar/ShipmentStatus";
import AuctionLP from "./component/AuctionLP";



function App() {
  return (
    <Router >
      <Routes>
        <Route exact path='/' element ={<Home />} />
        <Route path="/AuctionLP" element={<AuctionLP />} />
        <Route path='/Agent' element = {<Agent />} />
        <Route path='/Agent/DocumentPage' element = {<DocumentPage />} />
        <Route path='/Agent/ContainerManagement' element= {<ContainerManagement />} />
        <Route path='/ReceiverAgent' element={<ReceiverAgent />} />
        <Route path='/ReceiverAgent/ShipmentStatus' element={<ShipmentStatus />}/>
      </Routes>
    </Router>
  );
}

export default App;
