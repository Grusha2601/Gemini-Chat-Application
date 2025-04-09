import { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
// import { Toggle } from "rsuite";
// import { Switch } from "./../";
import { Context } from "../../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    isDarkMode,
    toggleTheme,
  } = useContext(Context);

  // Toggle handler for switching themes
  // const handleToggleChange = () => {
  //   toggleTheme(); // Call your toggleTheme function when the value changes
  // };

  useEffect(() => {
    const button = document.querySelector(".js-button");

    if (button) {
      const handleClick = (event) => {
        let parentNode = event.target.parentNode;
        if (parentNode.classList.contains("turn-on")) {
          parentNode.classList.remove("turn-on");
          document.body.classList.remove("active");
        } else {
          parentNode.classList.add("turn-on");
          document.body.classList.add("active");
        }

        toggleTheme();
      };

      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <div className={`main ${isDarkMode ? "dark" : "light"}`}>
      <div className="nav">
        <p>Gemini</p>
        <div className="wrapper">
          <div className="button-outer-wrapper">
            <div className="button-inner-wrapper">
              <button
                id="js-button"
                className="js-button primary--button"
              ></button>
            </div>
          </div>

          <img src={assets.user_icon} alt="user-icon" />
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Grusha.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a Prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
