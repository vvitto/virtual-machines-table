import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel';
import { StoreContext } from '../../StoreProvider';


  
function renderList(data){
    return (
        <ul>
            {Object.keys(data).map((field) => {
                const label = data[field];
                const isObject = typeof label === 'object';
                
                if(isObject) {
                    return <li>{field} {renderList(label)}</li>;
                }

                return (
                    <li key={field}>{`${field}: ${label}`}</li>
                )
            })}    
        </ul>
    );
}
  

const MachineInfo = (props) => {
    const [tab, setTab] = useState(0);
    const param = props.match.params.id;

    const { store } = useContext(StoreContext);
  
    const handleChangeTab = (event, newValue) => {
      setTab(newValue);
    }

    function handleClose() {
        props.history.push('/virtual_machines');
    }

    const item = store.machines.find(({id}) => id === param);
  
    const { xml, ...fields} = item;
  
    const host = window.location.host;
  
    const isLocalhost = host.indexOf('localhost') !== -1
  
    const url = `${isLocalhost ? 'http://10.255.10.222:8081' : `http://${host}`}/spice/index.html?host=10.255.10.222&port=8081&vmInfoToken=${item.id}`;
  
    return (
      <div className='modal'>
        <>
          <button onClick={handleClose}>Close</button>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label='General'/>
            <Tab label='XML'/>
          </Tabs>
    
          <TabPanel activeTab={tab} index={0}>
            {renderList(fields)}
            <iframe src={url} title="qwe" width='100%' height='100%' id='myiframe'></iframe>
          </TabPanel>
          <TabPanel activeTab={tab} index={1}>
            <p className="xml">
              {xml}
            </p>
          </TabPanel>
        </>
      </div>
    )
  }

  export default withRouter(MachineInfo);