import { useEffect, useState } from 'react';

import { createMaster } from './locker';
import { collectIdentifier } from './device';

function App() {
  useEffect(() => {
    async function initializeLocker () {
      const id = await collectIdentifier();
      console.log(id);
    }
    initializeLocker();
  }, []);
  return (
    <div>
    </div>
  )
}

export default App;
