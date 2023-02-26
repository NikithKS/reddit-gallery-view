import logo from './logo.svg';
import './App.css';
import { ChakraProvider, HStack, Spacer, VStack } from '@chakra-ui/react';
import SubSelect from './components/SubSelect';
import { useState } from 'react';
import ShowMessage from './components/ShowMessage';
import ShowSub from './components/ShowSub';

function App() {

  let [subInfo, setSub] = useState({ sub: '', sort: 'hot' });

  const hasSub = () => subInfo.sub.length > 0;

  return (
    <div className="App">
      <VStack>
        <HStack w='full'>
          <Spacer />
          <SubSelect subInfo={subInfo} setSub={setSub} />
          <Spacer />
        </HStack>
        <VStack h='full'>
          { !hasSub() && <ShowMessage msg={'Select subreddit to continue...'} />}
          {hasSub() && <ShowSub subInfo={subInfo} /> }
         </VStack>
      </VStack>
      {/* <div className='footer'>
        Footer
      </div> */}
    </div>
  );
}

export default App;
