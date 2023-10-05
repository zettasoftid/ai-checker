// pages/index.tsx

import React from 'react';
import ContractForm from './interact_contract';// Sesuaikan path sesuai dengan lokasi file ContractForm.tsx

function HomePage() {
  const handleContractSubmit = async (contractAddress: string) => {
    // Handle submit contract address here, e.g., send it to the server.
    console.log(`Contract address submitted: ${contractAddress}`);
  };

  return (
    <div>
      <ContractForm />
    </div>
  );
}

export default HomePage;