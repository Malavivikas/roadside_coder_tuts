import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
const App = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    {
      title: "Include Uppercase Letters",
      state: false,
    },
    {
      title: "Include Lowercase Letters",
      state: false,
    },
    {
      title: "Include Numbers",
      state: false,
    },
    {
      title: "Include Symbols",
      state: false,
    },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <section className="container">
      {/* Password Text and Copy Btn */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copy_btn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {/* Character Length */}
      <div className="char-length">
        <span>
          <strong>Character length</strong>{" "}
          <label htmlFor="slider">{length}</label>
        </span>
        <input
          type="range"
          min={4}
          max={20}
          id="slider"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/*Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((item, index) => {
          return (
            <div key={item.title}>
              <input
                type="checkbox"
                checked={item.state}
                id={`check${index}`}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`check${index}`}>{item.title}</label>
            </div>
          );
        })}
      </div>
      {/*Strength */}
      <PasswordStrengthIndicator password={password} />
      {/* Error handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/*Generate password btn */}
      <button
        className="generate_btn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </section>
  );
};

export default App;
