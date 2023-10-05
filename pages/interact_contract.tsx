import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Logo from "../public/traix.png";

const questions = [
  "Does the Contract have a hidden owner?",
  "Does the contract have admin privileges?",
  "Does the Contract look like a honeypot?",
  "Does the Contract Owner can change the balance token?",
  "Is the contract a proxy contract?",
  "Does the Contract have a whitelist?",
  "Does the Contract have a blacklist?",
  "Can the slippage be modified on the contract?",
  "Can the contract take back ownership?",
  "Does the contract have a trading-cool-down mechanism?",
  "Can the contract mint new tokens?",
  "Can the contract burn the tokens?",
  "Is the contract upgradeable?",
  "Can the contract be paused?",
  "Does the contract have a cooldown feature?",
  "Can the contract establish or update Fees?",
  "Is the contract hardcoding addresses?",
  "Does the contract use many functions that can only be called by the owner?",
];

const desc_question = [
  "A contract with a concealed owner can be highly suspicious and pose significant risks. It may lack transparency, making it challenging to hold anyone accountable for its actions. Users may find it difficult to trace the owner's identity, potentially exposing them to scams, rug pulls, or other fraudulent activities. Trust is often a critical factor in the crypto space, and hidden ownership can erode that trust.",
  "Contracts equipped with extensive admin privileges can centralize power, potentially leading to abuses of authority. Privileged users might manipulate the contract for personal gain or make unilateral decisions that affect all users. This centralization runs counter to the principles of decentralization and trustlessness, which are fundamental to many blockchain projects.",
  "Honeypot contracts are malicious by design, aiming to deceive and defraud users. Recognizing a contract that resembles a honeypot is crucial for avoiding financial loss. Such contracts often promise lucrative rewards but ultimately trap users by making it extremely challenging or impossible to withdraw their assets. Falling into a honeypot can result in significant asset losses and damage to one's financial well-being.",
  "Contracts that grant the owner the ability to modify token balances can lead to serious imbalances and unfair advantages. The owner can manipulate these balances for personal gain or to favor specific users, undermining the contract's integrity and user trust. This capability should be closely scrutinized, as it poses a substantial risk to the token's ecosystem.",
  "While proxy contracts offer flexibility for upgrades, their improper implementation can introduce severe vulnerabilities. Malicious actors may exploit proxy contracts to carry out unauthorized upgrades or modifications, potentially resulting in the loss of user assets. Users should exercise caution and verify the security of proxy contracts to mitigate these risks.",
  "Contracts relying heavily on whitelists can inadvertently foster discrimination and exclusion. Users not included in the whitelist may face barriers to participating in the contract's activities, leading to concerns about fairness and equal access. Transparent and inclusive mechanisms are often preferred to ensure equitable participation.",
  "Blacklists in contracts can be susceptible to misuse, enabling censorship of specific users or addresses. Such censorship practices raise questions about the contract's commitment to censorship resistance, decentralization, and open participation. It is essential to carefully evaluate the motivations behind implementing blacklists.",
  "Allowing slippage modification in a contract can facilitate price manipulation and unfair trading practices. Users may exploit this feature to their advantage, potentially causing substantial market disruptions. Contracts should implement safeguards to prevent slippage abuse.",
  "Contracts that grant the capability to reclaim ownership rights introduce uncertainty and distrust. Users may find it challenging to predict or trust the contract's long-term behavior if ownership can be unexpectedly reclaimed. Decentralized and immutable contracts are often preferred for transparency and reliability.",
  "Excessively long trading-cool-down periods can hinder user activities and negatively impact liquidity. Users may become frustrated with limited access to their assets, potentially reducing the contract's usability and attractiveness.",
  "Contracts that possess the ability to mint new tokens without proper constraints risk inflation and devaluation of the token. Malicious actors or even well-intentioned but unchecked token minting can dilute the value of existing tokens, leading to significant financial losses for users.",
  "Contracts with the unrestricted capability to burn tokens can be used to manipulate token supplies and disrupt the ecosystem. Unauthorized token burns can result in value destruction and negatively impact token holders. Transparent and well-governed mechanisms for token burning are preferred.",
  "Overly frequent or uncontrolled contract upgrades can introduce instability and uncertainty. Users may hesitate to engage with a contract that undergoes frequent changes, fearing unexpected disruptions to their holdings and activities. Contracts should implement upgrade procedures with transparency and user consent.",
  "Contracts that can be paused by privileged users introduce centralization and the potential for misuse. Pausing a contract can halt its functionality, affecting all users. Such powers should be used judiciously and transparently to avoid undermining user trust.",
  "Excessive cooldown periods can hinder user experiences and liquidity. Contracts should balance the need for cooldowns with the convenience of user interactions. Cumbersome cooldowns may deter users and negatively impact the contract's functionality.",
  "Contracts that allow unchecked fee establishment or modification can lead to exploitative fee structures. High or arbitrary fees can deter users and hinder adoption. Transparent and reasonable fee policies are essential for user trust.",
  "Hardcoding addresses in a contract can create vulnerabilities and hinder contract flexibility. Contracts should avoid fixed addresses whenever possible, as these can become obsolete or expose the contract to external risks.",
  "Contracts heavily reliant on owner-exclusive functions centralize control and undermine decentralization. Such designs limit user participation and expose the contract to owner-driven decisions that may not align with the broader community's interests. Contracts should prioritize decentralized governance and transparency.",
];

function ContractForm() {
  const [contractAddress, setContractAddress] = useState("");
  const [matches, setMatches] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsFetching(true);
      const response = await fetch("http://Zettasoft.pythonanywhere.com/api/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contract_address: contractAddress }),
      });
      if (response.ok) {
        fetchData();
      } else {
        console.log("Failed to fetch contract_name");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContractAddress(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://Zettasoft.pythonanywhere.com/api/contract/matches"
      );
      const data = response.data;
      setMatches(data.matches);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Navigasi */}
      <div className="navbar">
        <div className="content-navbar">
          <h1 className="judul bold-text">TRAIX</h1>
          <button className="button-connect">Connect Wallet</button>
        </div>
      </div>
      {/* End Navigasi */}

      {/* Header */}
      <div className="header">
        <div className="content-header">
          <h2 className="judul bold-text"> Personal Contracts Auditor </h2>
          <h3 className="text-header">
            {" "}
            "Offers a quick, informative smart contract scan to enhance your
            decision-making in Tron network mainnet transactions"{" "}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="header-button">
              <button className="button-connect jarak-button" type="submit">
                Quick Scan
              </button>
              <input
                type="text"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={handleInputChange}
                className="input-scan"
              />

              {isFetching && <p>Scanning the contract...</p>}
              <p className="text-kecil">
                * Use 1 TRX for a comprehensive smart contract scan and enjoy
                more detailed data
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* End Header */}

      {/* Support By */}
      <div className="support">
        <div className="support-by">
          <h1>Support By</h1>
          <div className="sponsor">
            <h1>gambar 1</h1>
            <h1>gambar 2</h1>
            <h1>gambar 3</h1>
          </div>
          <p>
            Disclaimer: The output should not be taken as an indication or
            guarantee of any future performance or prediction, it is not
            intended to be used as investment advice and it does not constitute
            a recommendation of any investment product.
          </p>
          {/* End Support By */}
        </div>

        {/* Scan Summary */}
        <div className="scan">
          <h2>Scan Summary</h2>
          <div>

          <div className="summary">
            <div className="scanner">
              <p>testingggg</p>
              <p>testingg</p>
            </div>
            <div className="scanner">
              <p>testingggg</p>
              <p>testingg</p>
            </div>
          </div>
          <div className="summary">
            <div className="scanner">
              <p>testingggg</p>
              <p>testingg</p>
            </div>
            <div className="scanner">
              <p>testingggg</p>
              <p>testingg</p>
            </div>
          </div>
          </div>
          <ul>
            {matches ? (
              matches.map((match, index) => (
                <li key={index}>
                  {matches.length > 1 && (
                    <p className="bold-text">{questions[index]}</p>
                  )}
                  <br></br>
                  <p>{match}</p>
                  <br></br>
                  {matches.length > 1 && (
                    <p className="italic-text">{desc_question[index]}</p>
                  )}
                </li>
              ))
            ) : (
              <li>
                <p>Waiting for checking...</p>
              </li>
            )}
          </ul>
        </div>
        {/* Scan Summary */}
      </div>
    </div>
  );
}

export default ContractForm;
