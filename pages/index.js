import Head from 'next/head';
import styles from '../styles/Home.module.css'
import { address, abi } from '../contract/smc'
import { useState } from 'react'; // If using React, import the useState hook
import { Fetch } from '@/modules/graphql';


const Home = () => {

  function handleSubmit(_name, _inputValues) {
    console.log("handle submit is pressed for ", _name, _inputValues);
    Fetch(_name, _inputValues);
  }

  // Assuming you have 'data' and 'handleSubmit' defined in your component

  // State to store input values
  const [inputValues, setInputValues] = useState([]);

  const handleInputChange = (event, inputIndex) => {
    const updatedValues = [...inputValues];
    updatedValues[inputIndex] = event.target.value;
    setInputValues(updatedValues);
  };

  const handleSubmitClick = (functionName) => {
    // Here, you can use the 'inputValues' array as needed in your 'handleSubmit' function
    handleSubmit(functionName, inputValues);
  };

  return (
    <div>
      <Head>
        <title>Crypto Website</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo or website title */}
            <h1 className="text-white text-2xl font-bold">Crypto Website</h1>

            {/* Navigation links */}
            <div className="space-x-4">
              <a href="#home" className="text-white font-bold hover:underline">
                Home
              </a>
              <a href="#functions" className="text-white font-bold hover:underline">
                Functions
              </a>
              {/* Add more navigation links as needed */}
            </div>

            {/* Metamask button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                className="w-6 h-6 mr-2"
              />
              Connect Metamask
            </button>
          </div>
        </div>
      </nav>


      {/* Main content */}
      {/* Main content */}
      <div
        className={`bg-gray-900 min-h-screen flex items-center justify-center ${styles['bg-coin-image']}`}
        style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to Crypto Website</h1>
          <p className="text-lg mt-4">
            Explore the world of cryptocurrencies and blockchain technology.
          </p>
          <p>INSTRUCTIONS:</p>
          <ul>
            <li>website working for non payable functions only, can work but requires some modification</li>
            <li>need to add "" before entering any string in options below</li>
            <li>example enter-- "0xccC19b64D1A7B3eE801A2E2F2FA9eC4c30Aad15D" -- in balanceOf funtion not -- 0xccC19b64D1A7B3eE801A2E2F2FA9eC4c30Aad15D -- </li>
            <li>integers will remain same</li>
            <li>Output will come in CONSOLE</li>

          </ul>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded">
            Get Started
          </button>
        </div>
      </div>

      {/* Function Cards */}
      <div id="functions" className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4 text-white">Functions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Display each function (excluding constructors) */}
          {abi
            .filter((item) => item.type === "function")
            .map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-6 shadow-md rounded-lg transform hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p>{item.stateMutability === "view" ? "View" : "Non-payable"}</p>

                {item.inputs.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold">Input Options:</p>
                    {item.inputs.map((input, i) => (
                      <input
                        key={i}
                        type="text"
                        placeholder={input.name}
                        className="px-4 py-2 w-full rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                        onChange={(event) => handleInputChange(event, i)}
                        value={inputValues[i] || ''} // Controlled component value
                      />
                    ))}
                  </div>
                )}

                {item.outputs.length > 0 && (
                  <div className="mt-4">
                    <p className="font-bold">OUTPUT:</p>
                    <ul className="list-disc pl-6">
                      {item.outputs.map((output, i) => (
                        <li key={i}>{`${output.internalType} ${output.name}`}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onClick={() => handleSubmitClick(item.name)}
                >
                  Submit
                </button>
              </div>
            ))}
        </div>
      </div>

    </div>






  );
};

export default Home;
