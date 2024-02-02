import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";

// import gptLogo from "../assets/chatgpt.svg";
import sendBtn from "../assets/send.svg";
import userIcon from "../assets/user-icon.png";
import gptImgLogo from "../assets/157352061.png";
import beans from "../assets/Beans-logos_black.png";

const Textgenerate = () => {
  const [inputText, setInputText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [inputAutoText, setInputAutoText] = useState("");
  const [taskSelected, setTaskSelected] = useState("Text Completion");
  const [showInputBox, setShowInputBox] = useState(false);
  const [genreSelected, setGenreSelected] = useState("");
  const [writingStyleSelected, setWritingStyleSelected] = useState("");
  const [natureSelected, setNatureSelected] = useState("");
  const [editorialSelected, setEditorialSelected] = useState("");
  const [toneselected, setToneSelected] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedEngine, setSelectedEngine] = useState("claud");
  const [characterLimit, setCharacterLimit] = useState("");
  const [source1, setSource1] = useState("");
  const [source2, setSource2] = useState("");
  const [source3, setSource3] = useState("");
  const [source4, setSource4] = useState("");
  const [source5, setSource5] = useState("");
  const [source6, setSource6] = useState("");
  const [checkedCheckboxes1, setCheckedCheckboxes1] = useState([]);
  const [checkedCheckboxes2, setCheckedCheckboxes2] = useState([]);
  const [checkedCheckboxes3, setCheckedCheckboxes3] = useState([]);
  const [checkedCheckboxes4, setCheckedCheckboxes4] = useState([]);
  const [checkedCheckboxes5, setCheckedCheckboxes5] = useState([]);
  const [checkedCheckboxes6, setCheckedCheckboxes6] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [claudLoading, setClaudLoading] = useState(false);
  const [palmLoading, setPalmLoading] = useState(false);
  const [gptLoading, setGptLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  const [responses, setResponses] = useState({
    claudResponse: null,
    generateResponse: null,
    palmResponse: null,
    summaryResponses: null,
    generateAutoResponse: null,
  });

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-rocket-fill icon"
      viewBox="0 0 16 16"
    >
      <path d="M10.175 1.991c.81 1.312 1.583 3.43 1.778 6.819l1.5 1.83A2.5 2.5 0 0 1 14 12.202V15.5a.5.5 0 0 1-.9.3l-1.125-1.5c-.166-.222-.42-.4-.752-.57-.214-.108-.414-.192-.627-.282l-.196-.083C9.7 13.793 8.85 14 8 14c-.85 0-1.7-.207-2.4-.635-.068.03-.133.057-.198.084-.211.089-.411.173-.625.281-.332.17-.586.348-.752.57L2.9 15.8a.5.5 0 0 1-.9-.3v-3.298a2.5 2.5 0 0 1 .548-1.562l.004-.005L4.049 8.81c.197-3.323.969-5.434 1.774-6.756.466-.767.94-1.262 1.31-1.57a3.67 3.67 0 0 1 .601-.41A.549.549 0 0 1 8 0c.101 0 .17.027.25.064.037.017.086.041.145.075.118.066.277.167.463.315.373.297.85.779 1.317 1.537ZM9.5 6c0-1.105-.672-2-1.5-2s-1.5.895-1.5 2S7.172 8 8 8s1.5-.895 1.5-2" />
      <path d="M8 14.5c.5 0 .999-.046 1.479-.139L8.4 15.8a.5.5 0 0 1-.8 0l-1.079-1.439c.48.093.98.139 1.479.139" />
    </svg>
  );
  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // const isDropdownDisabled = taskSelected === "Text Completion";
  const handleImage = async () => {
    const prompt = `Generate the image according to the given input: ${inputText}`;
    const requestData = { prompt };

    try {
      const response = await fetch("http://3.108.252.141:3001/image-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.image_url);
        setImageURL(data.image_url); // Assuming the API response has an "image_url" property
      } else {
        console.error("Error generating image");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleGenerateContent = async () => {
    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    if (characterLimit === "300" || characterLimit === "300-500") {
      // Add the additional line if the character limit is 300 or 300-500
      setPrompt(
        `${prompt} The word count of the output should not be greater than ${characterLimit}.`
      );
    } else {
      setPrompt(prompt);
    }
    const requestData = { prompt: prompt };
    try {
      setGptLoading(true);
      const response = await fetch("http://3.108.252.141:3001/generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setGptLoading(false);
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
                  checked={checkedCheckboxes3[index]}
                  onChange={() => handleCheckboxChange(3, index)}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        {
          /*setOutput(summaryWithCheckboxes); */
        }
        setResponses((prevResponses) => ({
          ...prevResponses,
          generateResponse: summaryWithCheckboxes,
        }));

        setSource3(summaryWithCheckboxes);
        return data.summary;
        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const handleAutoCompletion = async () => {
    const prompt = ` Autocomplete the given text and ensure that the completed response is grammatically correct . Expand upon the provided input to create a coherent and well-formed passage. Input Text:${inputAutoText}`;

    const requestData = { prompt: prompt };
    try {
      setAutoLoading(true);
      const response = await fetch("http://3.108.252.141:3001/autogenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAutoLoading(false);
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
                  checked={checkedCheckboxes5[index]}
                  onChange={() => handleCheckboxChange(5, index)}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        {
          /*setOutput(summaryWithCheckboxes); */
        }
        setResponses((prevResponses) => ({
          ...prevResponses,
          generateAutoResponse: summaryWithCheckboxes,
        }));
        setSource5(summaryWithCheckboxes);
        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTitleGeneration = async () => {
    const prompt = `  provide multiple title options for following input as well . Input Text:${inputAutoText}`;

    const requestData = { prompt: prompt };
    try {
      setAutoLoading(true);
      const response = await fetch("http://3.108.252.141:3001/titlegenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAutoLoading(false);
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
                  checked={checkedCheckboxes6[index]}
                  onChange={() => handleCheckboxChange(6, index)}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        {
          /*setOutput(summaryWithCheckboxes); */
        }
        setResponses((prevResponses) => ({
          ...prevResponses,
          generateAutoResponse: summaryWithCheckboxes,
        }));
        setSource6(summaryWithCheckboxes);
        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTextAutoCompletion = async () => {
    setLoading(true);

    await Promise.all([handleAutoCompletion(), handleTitleGeneration()])
      .then(() => {console.log("Sucessfully fetched response")
       setLoading(false);})
      .catch((error) => {
        // Handle error if needed
        console.error("Error:", error);
      })
      .finally(() => {
        
      });
  };

  // /////////////////////////////////////////////////////////////////////////
  const handlePalmGenerateContent = async () => {
    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    if (characterLimit === "300" || characterLimit === "300-500") {
      // Add the additional line if the character limit is 300 or 300-500
      setPrompt(
        `${prompt} The word count of the output should not be greater than ${characterLimit}.`
      );
    } else {
      setPrompt(prompt);
    }
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setPalmLoading(true);
      const response = await fetch("http://3.108.252.141:3001/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setPalmLoading(false);
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
                  checked={checkedCheckboxes2[index]}
                  onChange={() => handleCheckboxChange(2, index)}
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        {
          /* setOutput(summaryWithCheckboxes);*/
        }
        setResponses((prevResponses) => ({
          ...prevResponses,
          palmResponse: summaryWithCheckboxes,
        }));
        setSource2(summaryWithCheckboxes);
        return data.summary;

        // setOutput(data.summary);

        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  const handleClaudeGenerateContent = async () => {
    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    if (characterLimit === "300" || characterLimit === "300-500") {
      // Add the additional line if the character limit is 300 or 300-500
      setPrompt(
        `${prompt} The word count of the output should not be greater than ${characterLimit}.`
      );
    } else {
      setPrompt(prompt);
    }
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setClaudLoading(true);
      const response = await fetch("http://3.108.252.141:3001/invoke-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setClaudLoading(false);
        const data = await response.json();

        const paragraphs =
          typeof data.summary === "string"
            ? data.summary.split("\n").slice(1)
            : data.summary;
        const summaryWithCheckboxes = paragraphs.map((paragraph, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {paragraph.trim() && ( // Only render if the paragraph is not empty after trimming whitespace
              <>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox${index}`}
                  checked={checkedCheckboxes1[index]}
                  onChange={() => handleCheckboxChange(1, index)}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));
        {
          /* setOutput(summaryWithCheckboxes);*/
        }
        setResponses((prevResponses) => ({
          ...prevResponses,
          claudResponse: summaryWithCheckboxes,
        }));
        // setOutput(data.summary);
        setSource1(summaryWithCheckboxes);
        return data.summary;

        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const handleContent = async () => {
    try {
      setLoading(true);
      handleClaudeGenerateContent();
      handlePalmGenerateContent();
      handleGenerateContent();
      await handleImage();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("asd", source1, source2, source3);

    if ("" !== source1 && "" !== source2 && "" !== source3)
      handleSummary(
        `${JSON.stringify(source1)}${JSON.stringify(source2)}${JSON.stringify(
          source3
        )}`
      );
  }, [source1, source2, source3]);

  const handleSummary = async (allResponse) => {
    if (!allResponse) {
      console.log(allResponse);
      return "Please select the repsonse";
    }
    const prompt = `Article: ${allResponse}

    You will generate increasingly concise entity-dense summaries of the above article. Repeat the following 5 times.Don't use the word summary in response.
    Guidelines:
    The first summary should be long (4-5 sentences, ~80 words), yet highly non-specific, containing little information beyond the entities marked as missing. Use overly verbose language and fillers (e.g., “this article discusses”) to reach ~80 words.
    Make every word count. Rewrite the previous summary to improve flow and make space for additional entities.
    Make space with fusion, compression, and removal of uninformative phrases like “the article discusses”.
    The summaries should become highly dense and concise, yet self-contained, e.g., easily understood without the article.
    Missing entities can appear anywhere in the new summary.
    Never drop entities from the previous summary. If space cannot be made, add fewer new entities.
    Remember: Use the exact same number of words for each summary.`;

    // setPrompt(prompt);

    // setPrompt(prompt);
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setSummaryLoading(true);
      const response = await fetch("http://3.108.252.141:3001/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSummaryLoading(false);
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
                  checked={checkedCheckboxes4[index]}
                  onChange={() => handleCheckboxChange(4, index)}
                  value=""
                  aria-label="..."
                />
                <span style={{ marginLeft: "5px" }}>{paragraph}</span>
              </>
            )}
          </div>
        ));

        setResponses((prevResponses) => ({
          ...prevResponses,
          summaryResponses: summaryWithCheckboxes,
        }));
        // setOutput(data.summary);
        setSource4(summaryWithCheckboxes);
        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  const handleLinkClick = (engine) => {
    setSelectedEngine(engine);
  };

  const handleCheckboxChange = (sourceIndex, checkboxIndex) => {
    // Use the correct state variable based on the source index
    switch (sourceIndex) {
      case 1:
        setCheckedCheckboxes1((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 2:
        setCheckedCheckboxes2((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 3:
        setCheckedCheckboxes3((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 4:
        setCheckedCheckboxes4((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 5:
        setCheckedCheckboxes5((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 6:
        setCheckedCheckboxes6((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      default:
        break;
    }
  };

  const extractText = (element) => {
    if (typeof element === "string") {
      return element.trim();
    } else if (Array.isArray(element)) {
      return element.map(extractText).join(" ");
    } else if (element.props && element.props.children) {
      return extractText(element.props.children);
    } else {
      return "";
    }
  };
  const handleDownloadTextFile = () => {
    const selectedParagraphs = [
      source1,
      source2,
      source3,
      source4,
      source5,
      source6,
    ].map((source, index) =>
      source
        .filter((_, checkboxIndex) => {
          switch (index) {
            case 0:
              return checkedCheckboxes1[checkboxIndex];
            case 1:
              return checkedCheckboxes2[checkboxIndex];
            case 2:
              return checkedCheckboxes3[checkboxIndex];
            case 3:
              return checkedCheckboxes4[checkboxIndex];
            case 4:
              return checkedCheckboxes5[checkboxIndex];
            case 5:
              return checkedCheckboxes6[checkboxIndex];
            default:
              return false;
          }
        })
        .map((paragraph, index) => {
          // Process each paragraph as needed
          return typeof paragraph === "string"
            ? paragraph.trim()
            : extractText(paragraph).trim();
        })
    );

    const blob = new Blob([selectedParagraphs.flat().join("\n")], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_content.txt";
    link.click();

    // Reset selected checkboxes
    setCheckedCheckboxes1(Array(checkedCheckboxes1.length).fill(false));
    setCheckedCheckboxes2(Array(checkedCheckboxes2.length).fill(false));
    setCheckedCheckboxes3(Array(checkedCheckboxes3.length).fill(false));
    setCheckedCheckboxes4(Array(checkedCheckboxes4.length).fill(false));
    setCheckedCheckboxes5(Array(checkedCheckboxes5.length).fill(false));
    setCheckedCheckboxes6(Array(checkedCheckboxes6.length).fill(false));
    // Reset additional sources if needed
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      <div className={`sideBar ${sidebarVisible ? "visible" : "hidden"}`}>
        <div className="upperSide">
          <div className="upperSideTop d-flex">
            {/*<h1 style={{marginTop:"13px", fontSize:"30px", marginRight:"100px", color:"blue", fontWeight:"bold",}}>.ai</h1>*/}

            <img src={beans} alt="" className="logo"></img>
            <h1 className="heading-ai">.toi.ai</h1>
          </div>

          <div className="upperSideBottom">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <select
                    className="form-select  shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setTaskSelected(e.target.value);
                      setShowInputBox(e.target.value !== "Text Completion");
                    }}
                  >
                    <option
                      selected
                      value="Text Completion"
                      className="text-dark"
                    >
                      Text Completion
                    </option>
                    {/* <option disabled selected className="text-dark">
                      what are you looking for
                    </option> */}
                    <option value="Generate" className="text-dark">
                      Generate
                    </option>

                    <option value="Profanity Check" className="text-dark">
                      Profanity Check
                    </option>
                    <option
                      value="Jargon and Obscure Word"
                      className="text-dark"
                    >
                      Jargon and Obscure Word
                    </option>
                    <option value="Buzzwords and Clichés" className="text-dark">
                      Buzzwords and Clichés
                    </option>
                    <option value="Proof Read" className="text-dark">
                      Proof Read
                    </option>
                    <option
                      value="Reset the length of content"
                      className="text-dark"
                    >
                      Reset the length of content
                    </option>
                  </select>
                </div>
              </div>
              {/*---------------------------------------------------------*/}

              <div className="col-md-6">
                <div>
                  <select
                    className="form-select shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setGenreSelected(e.target.value);
                    }}
                    disabled={taskSelected === "Text Completion"}
                  >
                    <option disabled selected className="text-dark">
                      Genres
                    </option>
                    <option value="Current Events" className="text-dark">
                      Current Events
                    </option>
                    <option value="Policy and Governance" className="text-dark">
                      Policy and Governance
                    </option>
                    <option value="Technology" className="text-dark">
                      Technology
                    </option>
                    <option value="Health and Wellness" className="text-dark">
                      Health and Wellness
                    </option>
                    <option value="Education" className="text-dark">
                      Education
                    </option>
                    <option value="Environment" className="text-dark">
                      Environment
                    </option>
                    <option value="Culture and Arts" className="text-dark">
                      Culture and Arts
                    </option>
                    <option value="Social Issues" className="text-dark">
                      Social Issues
                    </option>
                    <option value="Sports" className="text-dark">
                      Sports
                    </option>
                  </select>
                </div>{" "}
              </div>
            </div>
            {/*---------------------------------------------------------*/}

            <div className="row">
              <div className="col-md-6">
                <div>
                  <select
                    className="form-select  shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => setNatureSelected(e.target.value)}
                    disabled={taskSelected === "Text Completion"}
                  >
                    <option disabled selected className="text-dark">
                      Nature of Article
                    </option>
                    <option value="Political" className="text-dark">
                      Political
                    </option>
                    <option value="Investigative" className="text-dark">
                      Investigative
                    </option>
                    <option value="Reporting in-depth" className="text-dark">
                      Reporting in-depth
                    </option>
                    <option value="Timeline" className="text-dark">
                      Timeline
                    </option>

                    <option value="Gossip" className="text-dark">
                      Gossip
                    </option>
                    <option value="Humorous" className="text-dark">
                      Humorous
                    </option>
                    <option value="Blog / Essay" className="text-dark">
                      Blog / Essay
                    </option>
                    <option value="Personality / Profile" className="text-dark">
                      Personality / Profile
                    </option>
                    <option value="Advice" className="text-dark">
                      Advice
                    </option>
                    <option value="Editorial" className="text-dark">
                      Editorial
                    </option>
                    <option
                      value="Critical/Judgemental/Analysis"
                      className="text-dark"
                    >
                      Critical/Judgemental/Analysis
                    </option>
                    <option
                      value="Review - Book or Movie"
                      className="text-dark"
                    >
                      Review - Book or Movie
                    </option>
                    <option value="Food Columns" className="text-dark">
                      Food Columns
                    </option>
                    <option
                      value="View / Counter-View (Point)"
                      className="text-dark"
                    >
                      View / Counter-View (Point)
                    </option>
                    <option
                      value="Explanation or recommendation"
                      className="text-dark"
                    >
                      Explanation or recommendation
                    </option>
                    <option value="Quotation and facts" className="text-dark">
                      Quotation and facts
                    </option>
                    <option value="Opening Remark/thesis" className="text-dark">
                      Opening Remark/thesis
                    </option>
                    <option value="Objective explanation" className="text-dark">
                      Objective explanation
                    </option>
                    <option
                      value="Analogies/history/examples"
                      className="text-dark"
                    >
                      Analogies/history/examples
                    </option>
                    <option value="Set up example" className="text-dark">
                      Set up example
                    </option>
                  </select>
                </div>
              </div>
              {/*--------------------------------------------------------*/}
              <div className="col-md-6">
                <div>
                  <select
                    className="form-select  shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => setEditorialSelected(e.target.value)}
                    disabled={taskSelected === "Text Completion"}
                  >
                    <option disabled selected className="text-dark ">
                      Editorial Will
                    </option>
                    <option value="Explain or Interpret" className="text-dark">
                      Explain or Interpret
                    </option>
                    <option
                      value="Critical Analysis or review"
                      className="text-dark"
                    >
                      Critical Analysis or review
                    </option>
                    <option value="Persuade or reform" className="text-dark">
                      Persuade or reform
                    </option>
                    <option value="Recommend" className="text-dark">
                      Recommend
                    </option>
                    <option value="Opinion" className="text-dark">
                      Opinion
                    </option>
                    <option value="Elaborate" className="text-dark">
                      Elaborate{" "}
                    </option>
                    <option
                      value="Infer or deduce or conclude"
                      className="text-dark"
                    >
                      Infer or deduce or conclude
                    </option>
                    <option value="List " className="text-dark">
                      List{" "}
                    </option>
                    <option value="Narrow down focus" className="text-dark">
                      Narrow down focus
                    </option>
                    <option value="Outline" className="text-dark">
                      Outline
                    </option>
                    <option value="Predict" className="text-dark">
                      Predict
                    </option>
                    <option value="Produce" className="text-dark">
                      Produce
                    </option>
                    <option value="Propose" className="text-dark">
                      Propose
                    </option>
                    <option value="Rephrase" className="text-dark">
                      Rephrase
                    </option>
                    <option value="reword" className="text-dark">
                      reword
                    </option>
                    <option value="Sum up" className="text-dark">
                      Sum up{" "}
                    </option>
                    <option value="Summarise" className="text-dark">
                      Summarise
                    </option>
                    <option value="Suggest " className="text-dark">
                      Suggest{" "}
                    </option>
                    <option value="Translate" className="text-dark">
                      Translate
                    </option>
                    <option value="Argue" className="text-dark">
                      Argue
                    </option>
                    <option value="combine" className="text-dark">
                      combine
                    </option>
                    <option value="Compare" className="text-dark">
                      Compare
                    </option>
                    <option value="Differentiate" className="text-dark">
                      Differentiate{" "}
                    </option>
                    <option value="Discuss" className="text-dark">
                      Discuss{" "}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/*---------------------------------------------------------*/}

            <div className="row">
              <div className="col-md-6">
                <div>
                  <select
                    className="form-select  shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => setWritingStyleSelected(e.target.value)}
                    disabled={taskSelected === "Text Completion"}
                  >
                    <option disabled selected className="text-dark">
                      Preferred Writing Style
                    </option>
                    <option value="Narrative" className="text-dark">
                      Narrative
                    </option>
                    <option value="Descriptive" className="text-dark">
                      Descriptive
                    </option>
                    <option value="Expository" className="text-dark">
                      Expository
                    </option>
                    <option value="Persuasive" className="text-dark">
                      Persuasive
                    </option>
                    <option value="Creative" className="text-dark">
                      Creative
                    </option>
                    <option value="Objective" className="text-dark">
                      Objective
                    </option>
                    <option value="Subjective" className="text-dark">
                      Subjective
                    </option>
                    <option value="Review" className="text-dark">
                      Review
                    </option>
                    <option value="Poetic" className="text-dark">
                      Poetic
                    </option>
                    <option value="Technical" className="text-dark">
                      Technical
                    </option>
                  </select>
                </div>
              </div>
              {/*---------------------------------------------------------*/}
              <div className="col-md-6">
                <div>
                  <select
                    className="form-select  shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => setToneSelected(e.target.value)}
                    disabled={taskSelected === "Text Completion"}
                  >
                    <option disabled selected className="text-dark">
                      Tone of the Aricle
                    </option>
                    <option value="Positve" className="text-dark">
                      Positve
                    </option>
                    <option value="Negative" className="text-dark">
                      Negative
                    </option>
                    <option value="Neutral" className="text-dark">
                      Neutral
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/*---------------------------------------------------------*/}

            <div className="row">
              <div className="col-md-6">
                <div>
                  <select
                    className="form-select  shadow bg-body"
                    aria-label="Default select example"
                    onChange={(e) => setCharacterLimit(e.target.value)}
                    disabled={taskSelected === "Text Completion"}
                  >
                    <option disabled selected className="text-dark">
                      Character limit
                    </option>
                    <option value="300" className="text-dark">
                      300
                    </option>
                    <option value="300-500" className="text-dark">
                      300-500
                    </option>
                    <option value="None" className="text-dark">
                      None
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------------------------*/}

        <div className="chatFooter  mt-5">
          <div className={`inputBox shadow ${taskSelected === "Text Completion" ? "bg-disabled" : "bg-body"}`}>
            <input
              type="text"
              placeholder="Enter your subject here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={taskSelected === "Text Completion"}
            />
          </div>
             <button className="send input-btn input-box-disabled" onClick={handleContent}>
              <img src={sendBtn} alt="Send"></img>
            </button>


          <div className="reset">
            <button
              type="button"
              className="btn-default btn-lg reset-btn"
              onClick={() => {
                window.location.reload();
              }}
              disabled={taskSelected === "Text Completion"}
            >
              R E S E T
            </button>
          </div>

          <p
            className="power-line"
            style={{
              color: "#333",
              marginTop: "60px",
              marginRight: "-130px",
              opacity: "75%",
            }}
          >
            *Powered by Claud(AWS).Vertex(Google).OpenAI(Microsoft)
          </p>
        </div>
      </div>

      {showInputBox && (
        <div
          className="main"
          style={{ marginLeft: sidebarVisible ? "" : "40%" }}
        >
          {/* <FontAwesomeIcon
          icon={faBars}
          size="2xl"
          // style={{ left: "310px", top: "10px", position: "absolute" }}
          style={{
            left: sidebarVisible ? "300px" : "2px",
            position: sidebarVisible ? "absolute" : "fixed",
            zIndex: "1000",
            top: sidebarVisible ? "0px" : "0px",
            cursor: "pointer",
          }}
          onClick={handleToggleSidebar}
        /> */}
          <div className="lowerSide">
            <div className="tab">
              <div className="output-button d-flex">
                <button
                  type="button"
                  class={`btn btn-outline-success text-dark option-btn ${
                    selectedEngine === "claud" && source1 ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("claud")}
                >
                  Suggestion1
                </button>
                <button
                  type="button"
                  class={`btn btn-outline-success text-dark option-btn ${
                    selectedEngine === "palm" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("palm")}
                >
                  Suggestion2
                </button>
                <button
                  type="button"
                  class={`btn btn-outline-success text-dark option-btn ${
                    selectedEngine === "generate" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("generate")}
                >
                  Suggestion3
                </button>
                <button
                  type="button"
                  class={`btn btn-outline-success text-dark option-btn ${
                    selectedEngine === "summary" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("summary")}
                >
                  Suggestion4
                </button>
              </div>
            </div>
          </div>

          {!claudLoading && selectedEngine === "claud" && !source1 && (
            <div className="banner">
              <h3>Hello editor! Welcome to BCCL AI console.</h3>
              <h3>Over to You...</h3>
            </div>
          )}
          <div className="chats">
            {claudLoading && selectedEngine === "claud" && (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="loader">
                      <div className="loader-inner box1"></div>
                      <div className="loader-inner box2"></div>
                      <div className="loader-inner box3"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!claudLoading && selectedEngine === "claud" && source1 && (
              <div className="chat bot">
                {/* <img className="chatImg" src={gptImgLogo} alt="text" /> */}
                <p className="txts">{source1}</p>
              </div>
            )}

            {gptLoading && selectedEngine === "generate" && (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="loader">
                      <div className="loader-inner box1"></div>
                      <div className="loader-inner box2"></div>
                      <div className="loader-inner box3"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!gptLoading && selectedEngine === "generate" && source3 && (
              <div className="chat bot">
                {/* <img className="chatImg" src={gptImgLogo} alt="text" /> */}
                <p className="txt">{source3}</p>
              </div>
            )}

            {palmLoading && selectedEngine === "palm" && (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="loader">
                      <div className="loader-inner box1"></div>
                      <div className="loader-inner box2"></div>
                      <div className="loader-inner box3"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!palmLoading && selectedEngine === "palm" && source2 && (
              <div className="chat bot">
                {/* <img className="chatImg" src={gptImgLogo} alt="text" /> */}
                <p className="txt">{source2}</p>
              </div>
            )}

            {summaryLoading && selectedEngine === "summary" && (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="loader">
                      <div className="loader-inner box1"></div>
                      <div className="loader-inner box2"></div>
                      <div className="loader-inner box3"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!summaryLoading && selectedEngine === "summary" && source4 && (
              <div className="chat bot">
                <div>
                  <div className="d-flex">
                    {/* <img className="chatImg" src={gptImgLogo} alt="text" /> */}
                    <p className="txt">{source4}</p>
                  </div>
                  <div className="ai-img">
                    <p>
                      --------------------------------------------------------------------------
                    </p>
                    <h3>AI-IMAGE</h3>
                    <img
                      src={imageURL}
                      alt="Generated "
                      className="ai-image"
                    />{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
          {source1 && source2 && source3 && source4 && (
            <div className="btn-copy">
              <button
                type="button"
                className="btn btn-lg"
                onClick={handleDownloadTextFile}
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      )}
      {!showInputBox && (
        <div className="right-side">
<div className=" text-dark"><h3>File Your Report Here</h3></div>
          <div class="input-group">
            <textarea
              class="text-completion-box"
              aria-label="With textarea"
              placeholder="Please ingest your inputs here"
              value={inputAutoText}
              onChange={(e) => setInputAutoText(e.target.value)}
            ></textarea>
            <div className="optm-btn">
              <button
                type="button"
                class="optimise-btn"
                onClick={handleTextAutoCompletion}
              >
                Generate
              </button>
            </div>
            <div className="clearfix"></div>
          </div>

          {autoLoading && (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div class="text-center">
                    <div
                      class="spinner-border  text-dark"
                      style={{ width: "3rem", height: "3rem" }}
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between">
            {!autoLoading && (source5 && source6) && (
               <>
                <div className="box">
                <h3 className="title-text">Generated Text</h3>
                <div className="chat-bot-text">
                  {/* <img className="chatImg" src={gptImgLogo} alt="text" /> */}
                  <p className="txt text-dark">{source5}</p>
                </div>
              </div>
              <div className="box">
                <h3 className="title-text">Title</h3>
                <div className="chat-bot mb-3">
                  {/* <img className="chatImg" src={gptImgLogo} alt="text" /> */}
                  <p className="txt">{source6}</p>
                </div>
              </div>
             </>
            )}
          </div>

          {/* {source5 && source6 && (
            <div className="btn-copy btn-copy-text">
              <button
                type="button"
                className="btn btn-lg"
                onClick={handleDownloadTextFile}
              >
                Copy to Clipboard
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Textgenerate;
