//////////////////////////////////////////////////////////

import React, { useState } from "react";
import "./openAI.css";

const OpenAI = () => {
  const [output, setOutput] = useState("");
  const [inputText, setInputText] = useState("");
  const [optionSelected, setOptionSelected] = useState(false);
  const [appearDropdown, setAppearDropdown] = useState(false);
  const [genreSelected, setGenreSelected] = useState("");
  const [writingStyleSelected, setWritingStyleSelected] = useState("");
  const [natureSelected, setNatureSelected] = useState("");
  const [editorialSelected, setEditorialSelected] = useState("");
  const [toneselected, setToneSelected] = useState("");
  const [isInputVisible, setInputVisibility] = useState(false);
  const [isOutputVisible, setOutputVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

  const handleOptionSelect = (option) => {
    setOptionSelected(true);
    setGenreSelected(option);
    setAppearDropdown(true);
    setSelectedOptions([option]);
  };

  const handleGenerateContent = async () => {
    setSelectedButton("Generate");
    setLoading(true);
    setInputVisibility(true);
    setButtonClicked(true);

    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    setPrompt(prompt);
    const requestData = { prompt: prompt };
    // genreSelected,
    // writingStyleSelected,
    // natureSelected,
    // editorialSelected,
    // toneselected,
    // inputText,

    try {
      const response = await fetch("http://localhost:3001/generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        const paragraphs =
          typeof data.summary === "string"
            ? data.summary.split("\n")
            : data.summary;
        const summaryWithCheckboxes = paragraphs.map((paragraph, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {paragraph.trim() && ( // Only render if the paragraph is not empty after trimming whitespace
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox${index}`}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        setOutput(summaryWithCheckboxes);
        console.log(data.summary);
        setOptionSelected(true);
        setOutputVisible(true);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handlePalmGenerateContent = async () => {
    setSelectedButton("Palm");
    setLoading(true);
    setInputVisibility(true);
    setButtonClicked(true);

    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    setPrompt(prompt);
    const requestData = { prompt: prompt };
    // genreSelected,
    // writingStyleSelected,
    // natureSelected,
    // editorialSelected,
    // toneselected,
    // inputText,
    console.log(JSON.stringify(requestData));
    try {
      const response = await fetch("http://localhost:3001/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        const paragraphs =
          typeof data.summary === "string"
            ? data.summary.split("\n")
            : data.summary;
        const summaryWithCheckboxes = paragraphs.map((paragraph, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {paragraph.trim() && ( // Only render if the paragraph is not empty after trimming whitespace
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox${index}`}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        setOutput(summaryWithCheckboxes);
        // setOutput(data.summary);

        console.log(data.summary);
        setOptionSelected(true);
        setOutputVisible(true);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////

  const handleClaudeGenerateContent = async () => {
    setSelectedButton("Claude");
    setLoading(true);
    setInputVisibility(true);
    setButtonClicked(true);

    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    setPrompt(prompt);
    const requestData = { prompt: prompt };
    // genreSelected,
    // writingStyleSelected,
    // natureSelected,
    // editorialSelected,
    // toneselected,
    // inputText,
    console.log(JSON.stringify(requestData));
    try {
      const response = await fetch("http://localhost:3001/invoke-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        const paragraphs =
          typeof data.summary === "string"
            ? data.summary.split("\n")
            : data.summary;
        const summaryWithCheckboxes = paragraphs.map((paragraph, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {paragraph.trim() && ( // Only render if the paragraph is not empty after trimming whitespace
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox${index}`}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        setOutput(summaryWithCheckboxes);
        // setOutput(data.summary);

        console.log(data.summary);
        setOptionSelected(true);
        setOutputVisible(true);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  const firstOptions = [
    "Generate",
    "Profanity Check",
    "Jargon and Obscure Word",
    "Buzzwords and Clichés",
    "Proof Read",
    "Reset the length of content",
  ];
  const genreOptions = [
    "Current Events",
    "Policy and Governance",
    "Technology",
    "Health and Wellness",
    "Education",
    "Environment",
    "Culture and Arts",
    "Social Issues",
  ];

  return (
    <div className="container">
      {buttonClicked ? (
        <div>
          <div className="d-flex">
            <div className="row g-2">
              {selectedOptions.map((option, index) => (
                <div className="col-3 dropdown-gutter" key={index}>
                  <div
                    className={`custom-box p-3 border  ${
                      selectedOptions.includes(option) ? "selected" : ""
                    } ${optionSelected ? "selected" : ""}`}
                    onClick={() => {
                      handleOptionSelect(option);
                      setAppearDropdown(false);
                    }}
                  >
                    {option}
                  </div>
                </div>
              ))}
            </div>

            {appearDropdown && (
              <div>
                <div className="d-flex justify-content-between">
                  <div className="row g-2">
                    <div className="col-3 dropdown-gutter">
                      <div className="custom-box p-3 border">
                        {" "}
                        {editorialSelected}
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-3 dropdown-gutter">
                      <div className="custom-box p-3 border">
                        {" "}
                        {writingStyleSelected}
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-3 dropdown-gutter">
                      <div className="custom-box p-3 border">
                        {" "}
                        {natureSelected}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="chat-log">
            {isInputVisible && (
              <div className="chat-message">
                <div className="chat-message-center">
                  <div className="chat-avatar">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                      fill="none"
                      className="icon-md"
                    >
                      <text x={-9999} y={-9999}>
                        {"ChatGPT"}
                      </text>
                      <path
                        fill="currentColor"
                        d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                      />
                    </svg>
                  </div>
                  <div className="message">{prompt}</div>
                </div>
              </div>
            )}
            {isOutputVisible && (
              <div className="chat-message chatgpt">
                <div className="chat-message-center">
                  <div className="chat-output-avatar">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={41}
                      height={41}
                      fill="none"
                      className="icon-md"
                    >
                      <text x={-9999} y={-9999}>
                        {"ChatGPT"}
                      </text>
                      <path
                        fill="currentColor"
                        d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                      />
                    </svg>
                  </div>
                  {selectedButton === "Palm" && (
                    <button
                      type="button"
                      className="btn regenerate-btn"
                      onClick={handlePalmGenerateContent}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-md"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  )}
                  {selectedButton === "Generate" && (
                    <button
                      className=" textarea regenrate-openai-btn "
                      onClick={handleGenerateContent}
                    >
                      {/* <svg
                        style={{ paddingBottom: "2px" }}
                        width="24"
                        height="22"
                        viewBox="0 0 32 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                          fill="#FFF"
                        />
                      </svg> */}
                      <svg
                        style={{ paddingBottom: "2px" }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-md"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  )}
                  {selectedButton === "Claude" && (
                    <button
                      type="button"
                      className="btn  regenrate-claude-btn"
                      onClick={handleClaudeGenerateContent}
                    >
                      {" "}
                      <svg
                        style={{ paddingRight: "6px", paddingBottom: "3px" }}
                        width="24"
                        height="22"
                        viewBox="0 0 32 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                          fill="#FFF"
                        />
                      </svg>
                    </button>
                  )}
                  <div className="message">
                    {/* {output.split("\n").map((text, index) => (
                      <p key={index}>{text}</p>
                    ))} */}
                    {output.map((paragraphWithCheckbox, index) => (
                      <div key={index}>{paragraphWithCheckbox}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {loading && (
            <div
              className="d-flex justify-content-center"
              style={{ position: "absolute", top: "120px", right: "50%" }}
            >
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          <div>
            <div className="search-box d-flex textarea-container">
              <div className="">
                <textarea
                  className="custom-box postTextarea form-control my-5"
                  type="text"
                  placeholder="Send A message"
                  aria-label="default input example"
                  rows={1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                ></textarea>
              </div>

              <button
                className="send-button-new textarea "
                onClick={handleGenerateContent}
              >
                <svg
                  style={{ paddingBottom: "2px" }}
                  width="24"
                  height="22"
                  viewBox="0 0 32 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                    fill="#FFF"
                  />
                </svg>
              </button>

              <div>
                <button
                  type="button"
                  className="btn btn-primary custom-btn"
                  onClick={handlePalmGenerateContent}
                >
                  <svg
                    style={{ paddingRight: "6px", paddingBottom: "3px" }}
                    width="24"
                    height="22"
                    viewBox="0 0 32 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                      fill="#FFF"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                className="btn  custom-btn-claude-instant"
                onClick={handleClaudeGenerateContent}
              >
                {" "}
                <svg
                  style={{ paddingRight: "6px", paddingBottom: "3px" }}
                  width="24"
                  height="22"
                  viewBox="0 0 32 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                    fill="#FFF"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3 className="title">
              <span className="mandatory">*</span>What are you looking for
            </h3>
            <div className="row g-2">
              {firstOptions.map((option, index) => (
                <div className="col-3" key={index}>
                  <div
                    className={`custom-box p-3 border  ${
                      selectedOptions.includes(option) ? "selected" : ""
                    } ${optionSelected ? "selected" : ""}`}
                    onClick={() => {
                      if (option === "Generate") {
                        handleOptionSelect(option);
                        setAppearDropdown(false);
                      }
                    }}
                    {...(option === "Generate"
                      ? {}
                      : {
                          disabled: true,
                          style: { backgroundColor: "#F7F7F8" },
                        })}
                  >
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {optionSelected && (
            <div>
              <h3 className="title">
                <span className="mandatory">*</span>Please Select the Genre
              </h3>
              <div className="container">
                <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                  {genreOptions.map((option, index) => (
                    <div className="col" key={index}>
                      <div
                        className={`custom-box custom-color p-3 border"
                          ${genreSelected === option ? "selected" : ""}`}
                        onClick={() => {
                          // handleOptionSelect(option);
                          setGenreSelected(option);
                          setAppearDropdown(true);
                        }}
                      >
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {appearDropdown && (
            <div className="d-flex justify-content-between">
              <div>
                <select
                  className="custom-box custom-select form-select"
                  aria-label="Default select example"
                  onChange={(e) => setNatureSelected(e.target.value)}
                >
                  <option selected>Nature of Article</option>
                  <option value="Political">Political</option>
                  <option value="Investigative">Investigative</option>
                  <option value="Reporting in-depth">Reporting in-depth</option>
                  <option value="Gossip">Gossip</option>
                  <option value="Humorous">Humorous</option>
                  <option value="Blog / Essay">Blog / Essay</option>
                  <option value="Personality / Profile">
                    Personality / Profile
                  </option>
                  <option value="Advice">Advice</option>
                  <option value="Editorial">Editorial</option>
                  <option value="Critical/Judgemental/Analysis">
                    Critical/Judgemental/Analysis
                  </option>
                  <option value="Review - Book or Movie">
                    Review - Book or Movie
                  </option>
                  <option value="Food Columns">Food Columns</option>
                  <option value="View / Counter-View (Point)">
                    View / Counter-View (Point)
                  </option>
                  <option value="Explanation or recommendation">
                    Explanation or recommendation
                  </option>
                  <option value="Quotation and facts">
                    Quotation and facts
                  </option>
                  <option value="Opening Remark/thesis">
                    Opening Remark/thesis
                  </option>
                  <option value="Objective explanation">
                    Objective explanation
                  </option>
                  <option value="Analogies/history/examples">
                    Analogies/history/examples
                  </option>
                  <option value="Set up example">Set up example</option>
                </select>
                <p className="custom-nature-message">
                  **This will be later adjusted as per genre selection{" "}
                </p>
              </div>
              <div>
                <select
                  className="custom-box  custom-color custom-select form-select"
                  aria-label="Default select example"
                  onChange={(e) => setEditorialSelected(e.target.value)}
                >
                  <option selected>Editorial Will</option>
                  <option value="Explain or Interpret">
                    Explain or Interpret
                  </option>
                  <option value="Critical Analysis or review">
                    Critical Analysis or review
                  </option>
                  <option value="Persuade or reform">Persuade or reform</option>
                  <option value="Recommend">Recommend</option>
                  <option value="Opinion">Opinion</option>
                  <option value="Elaborate">Elaborate </option>
                  <option value="Infer or deduce or conclude">
                    Infer or deduce or conclude
                  </option>
                  <option value="List ">List </option>
                  <option value="Narrow down focus">Narrow down focus</option>
                  <option value="Outline">Outline</option>
                  <option value="Predict">Predict</option>
                  <option value="Produce">Produce</option>
                  <option value="Propose">Propose</option>
                  <option value="Rephrase">Rephrase</option>
                  <option value="reword">reword</option>
                  <option value="Sum up">Sum up </option>
                  <option value="Summarise">Summarise</option>
                  <option value="Suggest ">Suggest </option>
                  <option value="Translate">Translate</option>
                  <option value="Argue">Argue</option>
                  <option value="combine">combine</option>
                  <option value="Compare">Compare</option>
                  <option value="Differentiate">Differentiate </option>
                  <option value="Discuss">Discuss </option>
                </select>
              </div>
              <div>
                <select
                  className="custom-box custom-select  form-select"
                  aria-label="Default select example"
                  onChange={(e) => setWritingStyleSelected(e.target.value)}
                >
                  <option selected>Preferred Writing Style</option>
                  <option value="Narrative">Narrative</option>
                  <option value="Descriptive">Descriptive</option>
                  <option value="Expository">Expository</option>
                  <option value="Persuasive">Persuasive</option>
                  <option value="Creative">Creative</option>
                  <option value="Objective">Objective</option>
                  <option value="Subjective">Subjective</option>
                  <option value="Review">Review</option>
                  <option value="Poetic">Poetic</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>
              <div>
                <select
                  className=" custom-box custom-select  form-select "
                  aria-label="Default select example"
                  onChange={(e) => setToneSelected(e.target.value)}
                >
                  <option selected>Tone of the Aricle</option>
                  <option value="Positve">Positve</option>
                  <option value="Negative">Negative</option>
                  <option value="Neutral">Neutral</option>
                </select>
              </div>
            </div>
          )}
          {/* --------------------------------------------------------------------------------------------- */}
          {/* Display the selected options and selected dropdown in a single line */}

          {/* --------------------------------------------------------------------------------------------- */}
          {optionSelected &&
            genreSelected &&
            writingStyleSelected &&
            natureSelected &&
            editorialSelected &&
            toneselected && (
              <div className="search-box d-flex">
                <div>
                  <textarea
                    className="custom-box custom-input form-control my-5"
                    type="text"
                    placeholder="Send A message"
                    aria-label="default input example"
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  ></textarea>
                </div>
                <button className="send-button" onClick={handleGenerateContent}>
                  <svg
                    style={{ paddingBottom: "2px" }}
                    width="24"
                    height="22"
                    viewBox="0 0 32 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                      fill="#FFF"
                    />
                  </svg>
                </button>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary custom-btn"
                    onClick={handlePalmGenerateContent}
                  >
                    {" "}
                    <svg
                      style={{ paddingRight: "6px", paddingBottom: "3px" }}
                      width="24"
                      height="22"
                      viewBox="0 0 32 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                        fill="#FFF"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  className="btn  custom-btn-claude"
                  onClick={handleClaudeGenerateContent}
                >
                  {" "}
                  <svg
                    style={{ paddingRight: "6px", paddingBottom: "3px" }}
                    width="24"
                    height="22"
                    viewBox="0 0 32 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                      fill="#FFF"
                    />
                  </svg>
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default OpenAI;
