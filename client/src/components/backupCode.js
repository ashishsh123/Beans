// import React, { useState } from "react";
// import "./openAI.css";

// const OpenAI = () => {
//   const [output, setOutput] = useState("");
//   const [inputText, setInputText] = useState("");
//   const [optionSelected, setOptionSelected] = useState(false);
//   const [appearDropdown, setAppearDropdown] = useState(false);
//   const [genreSelected, setGenreSelected] = useState(""); // State to track the selected genre
//   const [writingStyleSelected, setWritingStyleSelected] = useState(""); // State to track the selected writing style
//   const [natureSelected, setNatureSelected] = useState(""); // State to track the selected nature of the article
//   const [editorialSelected, setEditorialSelected] = useState(""); // State to track the selected editorial will
//   // const [toneSelected, setToneSelected] = useState(""); // State to track the selected tone

//   const handleGenerateContent = async () => {
//     // Create an object to send to the API

//     const requestData = {
//       optionSelected,
//       genreSelected,
//       writingStyleSelected,
//       natureSelected,
//       editorialSelected,
//       // toneSelected,
//       inputText,
//     };

//     // Make a POST request to your API with the requestData
//     const response = await fetch("http://localhost:3001/generation", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });
//     setInputText("");
//     if (response.ok) {
//       const data = await response.json();
//       // Set the output in the state
//       setOutput(data.summary);
//       setOptionSelected(true);
//     } else {
//       console.error("Error generating content");
//     }
//   };
//   return (
//     <div className="container">
//       <div>
//         <h3 className="title">What are you looking for</h3>
//         <div className="">
//           <div className="row g-2">
//             <div className="col-3">
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => setOptionSelected(true)}
//               >
//                 {" "}
//                 Generate
//               </div>
//             </div>
//             <div className=" col-3">
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => setOptionSelected(true)}
//               >
//                 Profanity Check
//               </div>
//             </div>
//             <div className="col-3">
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => setOptionSelected(true)}
//               >
//                 Jargon and Obscure Word
//               </div>
//             </div>
//             <div className="col-3">
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => setOptionSelected(true)}
//               >
//                 Buzzwords and Clichés
//               </div>
//             </div>
//             <div className="col-3">
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => setOptionSelected(true)}
//               >
//                 Proof Read
//               </div>
//             </div>
//             <div className="col-3">
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => setOptionSelected(true)}
//               >
//                 Reset the length of content
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* ------------------------------------------------------------------ */}
//       {optionSelected && (
//         <div>
//           <h3 className="title">Please Select the Genres</h3>
//           <div className="container">
//             <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Current Events" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Current Events");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Current Events
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Policy and Governance" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Policy and Governance");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Policy and Governance
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Technology" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Technology");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Technology
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Health and Wellness" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Health and Wellness");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Health and Wellness
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Education" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Education");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Education
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "nvironment" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Environment");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Environment
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Culture and Arts" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Culture and Arts");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Culture and Arts
//                 </div>
//               </div>
//               <div className="col">
//                 <div
//                   className={`custom-box p-3 border ${
//                     genreSelected === "Social Issues" ? "selected" : ""
//                   }`}
//                   onClick={() => {
//                     setGenreSelected("Social Issues");
//                     setAppearDropdown(true);
//                   }}
//                 >
//                   Social Issues
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {appearDropdown && (
//         <div className="d-flex justify-content-between">
//           <div>
//             <select
//               className="custom-box custom-select form-select"
//               aria-label="Default select example"
//               onChange={(e) => setEditorialSelected(e.target.value)}
//             >
//               <option selected>Editorial Will</option>
//               <option value="1">Explain or Interpret</option>
//               <option value="2">Critical Analysis or review</option>
//               <option value="3">Persuade or reform</option>
//               <option value="4">Recommend</option>
//               <option value="5">Opinion</option>
//               <option value="6">Elaborate </option>
//               <option value="7">Infer or deduce or conclude</option>
//               <option value="8">List </option>
//               <option value="9">Narrow down focus</option>
//               <option value="10">Outline</option>
//               <option value="11">Predict</option>
//               <option value="12">Produce</option>
//               <option value="13">Propose</option>
//               <option value="14">Rephrase</option>
//               <option value="15">reword</option>
//               <option value="16">Sum up </option>
//               <option value="17">Summarise</option>
//               <option value="18">Suggest </option>
//               <option value="19">Translate</option>
//               <option value="20">Argue</option>
//               <option value="21">combine</option>
//               <option value="22">Compare</option>
//               <option value="23">Differentiate </option>
//               <option value="23">Discuss </option>
//             </select>
//           </div>
//           <div>
//             <select
//               className="custom-box custom-select  form-select"
//               aria-label="Default select example"
//               onChange={(e) => setWritingStyleSelected(e.target.value)}
//             >
//               <option selected>Preferred Writing Style</option>
//               <option value="1">Narrative</option>
//               <option value="2">Descriptive</option>
//               <option value="3">Expository</option>
//               <option value="4">Persuasive</option>
//               <option value="5">Creative</option>
//               <option value="6">Objective</option>
//               <option value="7">Subjective</option>
//               <option value="8">Review</option>
//               <option value="9">Poetic</option>
//               <option value="10">Technical</option>
//             </select>
//           </div>
//           <div>
//             <select
//               className=" custom-box custom-select  form-select"
//               aria-label="Default select example"
//               onChange={(e) => setNatureSelected(e.target.value)}
//             >
//               <option selected>Nature of Article</option>
//               <option value="1">Political</option>
//               <option value="2">Investigative</option>
//               <option value="3">Reporting in-depth</option>
//               <option value="4">Gossip</option>
//               <option value="5">Humorous</option>
//               <option value="6">Blog / Essay</option>
//               <option value="7">Personality / Profile</option>
//               <option value="8">Advice</option>
//               <option value="9">Editorial</option>
//               <option value="10">Critical/Judgemental/Analysis</option>
//               <option value="11">Review - Book or Movie</option>
//               <option value="12">Food Columns</option>
//               <option value="13">View / Counter-View (Point)</option>
//               <option value="14">Explanation or recommendation</option>
//               <option value="15">Quotation and facts</option>
//               <option value="16">Opening Remark/thesis</option>
//               <option value="17">Objective explanation</option>
//               <option value="18">Analogies/history/examples</option>
//               <option value="19">Set up example</option>
//             </select>
//           </div>
//         </div>
//       )}
//       <div>
//         <p>{output}</p>
//       </div>

//       <div className=" search-box d-flex ">
//         <div>
//           {" "}
//           <textarea
//             className="custom-box custom-input form-control my-5"
//             type="text"
//             placeholder="Send A message"
//             aria-label="default input example"
//             rows={1}
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//           ></textarea>
//         </div>

//         <button className="send-button" onClick={handleGenerateContent}>
//           <svg
//             width="24"
//             height="22"
//             viewBox="0 0 32 34"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
//               fill="#838383"
//             />
//           </svg>
//         </button>
//       </div>
//       {/* <div>
//         <select
//           className=" custom-box form-select my-5 w-25"
//           aria-label="Default select example"
//         >
//           <option selected>Tone of the Aricle</option>
//           <option value="1">Positve</option>
//           <option value="2">Negative</option>
//           <option value="3">Neutral</option>
//         </select>
//       </div> */}
//     </div>
//   );
// };

// export default OpenAI;
////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import "./openAI.css";

// const OpenAI = () => {
//   const [output, setOutput] = useState("");
//   const [inputText, setInputText] = useState("");
//   const [optionSelected, setOptionSelected] = useState(false);
//   const [appearDropdown, setAppearDropdown] = useState(false);
//   const [genreSelected, setGenreSelected] = useState("");
//   const [writingStyleSelected, setWritingStyleSelected] = useState("");
//   const [natureSelected, setNatureSelected] = useState("");
//   const [editorialSelected, setEditorialSelected] = useState("");

//   const handleOptionSelect = (option) => {
//     setOptionSelected(true);
//     setGenreSelected(option);
//     setAppearDropdown(true);
//   };

//   const handleGenerateContent = async () => {
//     const requestData = {
//       optionSelected,
//       genreSelected,
//       writingStyleSelected,
//       natureSelected,
//       editorialSelected,
//       inputText,
//     };

//     const response = await fetch("http://localhost:3001/generation", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });

//     setInputText("");
//     if (response.ok) {
//       const data = await response.json();
//       setOutput(data.summary);
//       setOptionSelected(true);
//     } else {
//       console.error("Error generating content");
//     }
//   };

//   const firstDivOptions = [
//     "Generate",
//     "Profanity Check",
//     "Jargon and Obscure Word",
//     "Buzzwords and Clichés",
//     "Proof Read",
//     "Reset the length of content",
//   ];
//   const genreOptions = [
//     "Current Events",
//     "Policy and Governance",
//     "Technology",
//     "Health and Wellness",
//     "Education",
//     "Environment",
//     "Culture and Arts",
//     "Social Issues",
//   ];

//   return (
//     <div className="container">
//       <div>
//         <h3 className="title">What are you looking for</h3>
//         <div className="row g-2">
//           {firstDivOptions.map((option, index) => (
//             <div className="col-3" key={index}>
//               <div
//                 className={`custom-box p-3 border ${
//                   optionSelected ? "selected" : ""
//                 }`}
//                 onClick={() => {
//                   handleOptionSelect(option);
//                   setAppearDropdown(false);
//                 }}
//               >
//                 {option}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {optionSelected && (
//         <div>
//           <h3 className="title">Please Select the Genres</h3>
//           <div className="container">
//             <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
//               {genreOptions.map((option, index) => (
//                 <div className="col" key={index}>
//                   <div
//                     className={`custom-box p-3 border ${
//                       genreSelected === option ? "selected" : ""
//                     }`}
//                     onClick={() => {
//                       setGenreSelected(option);
//                       setAppearDropdown(true);
//                     }}
//                   >
//                     {option}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       {appearDropdown && (
//         <div className="d-flex justify-content-between">
//           <div>
//             <select
//               className="custom-box custom-select form-select"
//               aria-label="Default select example"
//               onChange={(e) => setEditorialSelected(e.target.value)}
//             >
//               <option selected>Editorial Will</option>
//               <option value="1">Explain or Interpret</option>
//               <option value="2">Critical Analysis or review</option>
//               <option value="3">Persuade or reform</option>
//               <option value="4">Recommend</option>
//               <option value="5">Opinion</option>
//               <option value="6">Elaborate</option>
//               {/* Add similar options */}
//             </select>
//           </div>
//           <div>
//             <select
//               className="custom-box custom-select  form-select"
//               aria-label="Default select example"
//               onChange={(e) => setWritingStyleSelected(e.target.value)}
//             >
//               <option selected>Preferred Writing Style</option>
//               <option value="1">Narrative</option>
//               <option value="2">Descriptive</option>
//               <option value="3">Expository</option>
//               <option value="4">Persuasive</option>
//               <option value="5">Creative</option>
//               <option value="6">Objective</option>
//               <option value="7">Subjective</option>
//               <option value="8">Review</option>
//               <option value="9">Poetic</option>
//               <option value="10">Technical</option>
//               {/* Add similar options */}
//             </select>
//           </div>
//           <div>
//             <select
//               className="custom-box custom-select form-select"
//               aria-label="Default select example"
//               onChange={(e) => setNatureSelected(e.target.value)}
//             >
//               <option selected>Nature of Article</option>
//               <option value="1">Political</option>
//               <option value="2">Investigative</option>
//               <option value="3">Reporting in-depth</option>
//               <option value="4">Gossip</option>
//               <option value="5">Humorous</option>
//               <option value="6">Blog / Essay</option>
//               <option value="7">Personality / Profile</option>
//               <option value="8">Advice</option>
//               <option value="9">Editorial</option>
//               <option value="10">Critical/Judgemental/Analysis</option>
//               <option value="11">Review - Book or Movie</option>
//               <option value="12">Food Columns</option>
//               <option value="13">View / Counter-View (Point)</option>
//               <option value="14">Explanation or recommendation</option>
//               <option value="15">Quotation and facts</option>
//               <option value="16">Opening Remark/thesis</option>
//               <option value="17">Objective explanation</option>
//               <option value="18">Analogies/history/examples</option>
//               <option value="19">Set up example</option>
//               {/* Add similar options */}
//             </select>
//           </div>
//         </div>
//       )}
//       <div>
//         <p>{output}</p>
//       </div>
//       <div className="search-box d-flex">
//         <div>
//           <textarea
//             className="custom-box custom-input form-control my-5"
//             type="text"
//             placeholder="Send A message"
//             aria-label="default input example"
//             rows={1}
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//           ></textarea>
//         </div>
//         <button className="send-button" onClick={handleGenerateContent}>
//           <svg
//             width="24"
//             height="22"
//             viewBox="0 0 32 34"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
//               fill="#838383"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OpenAI;
//////////////////////////////////////////////////////////////////////////////////////////////////

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
  const [isInputVisible, setInputVisibility] = useState(false);
  const [isOutputVisible, setOutputVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleOptionSelect = (option) => {
    setOptionSelected(true);
    setGenreSelected(option);
    setAppearDropdown(true);
    setSelectedOptions([option]);
  };

  const handleGenerateContent = async () => {
    setInputVisibility(true);
    setButtonClicked(true);
    const requestData = {
      optionSelected,
      genreSelected,
      writingStyleSelected,
      natureSelected,
      editorialSelected,
      inputText,
    };

    const response = await fetch("http://localhost:3001/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      setOutput(data.summary);
      setOptionSelected(true);
      setOutputVisible(true);
    } else {
      console.error("Error generating content");
    }
  };

  const firstDivOptions = [
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
                  <div className="message">{inputText}</div>
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
                  <div className="message">{output}</div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="search-box d-flex textarea-container">
              <div>
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
                className="send-button textarea"
                onClick={handleGenerateContent}
              >
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 32 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                    fill="#838383"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3 className="title">What are you looking for</h3>
            <div className="row g-2">
              {firstDivOptions.map((option, index) => (
                <div className="col-3" key={index}>
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
          </div>

          {optionSelected && (
            <div>
              <h3 className="title">Please Select the Genres</h3>
              <div className="container">
                <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                  {genreOptions.map((option, index) => (
                    <div className="col" key={index}>
                      <div
                        className={`custom-box custom-color p-3 border  ${
                          selectedOptions.includes(option) ? "selected" : ""
                        } ${genreSelected === option ? "selected" : ""}`}
                        onClick={() => {
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
                  className="custom-box  custom-color custom-select form-select"
                  aria-label="Default select example"
                  onChange={(e) => setEditorialSelected(e.target.value)}
                >
                  <option selected>Editorial Will</option>
                  <option value="1">Explain or Interpret</option>
                  <option value="2">Critical Analysis or review</option>
                  <option value="3">Persuade or reform</option>
                  <option value="4">Recommend</option>
                  <option value="5">Opinion</option>
                  <option value="6">Elaborate </option>
                  <option value="7">Infer or deduce or conclude</option>
                  <option value="8">List </option>
                  <option value="9">Narrow down focus</option>
                  <option value="10">Outline</option>
                  <option value="11">Predict</option>
                  <option value="12">Produce</option>
                  <option value="13">Propose</option>
                  <option value="14">Rephrase</option>
                  <option value="15">reword</option>
                  <option value="16">Sum up </option>
                  <option value="17">Summarise</option>
                  <option value="18">Suggest </option>
                  <option value="19">Translate</option>
                  <option value="20">Argue</option>
                  <option value="21">combine</option>
                  <option value="22">Compare</option>
                  <option value="23">Differentiate </option>
                  <option value="23">Discuss </option>
                </select>
              </div>
              <div>
                <select
                  className="custom-box custom-select  form-select"
                  aria-label="Default select example"
                  onChange={(e) => setWritingStyleSelected(e.target.value)}
                >
                  <option selected>Preferred Writing Style</option>
                  <option value="1">Narrative</option>
                  <option value="2">Descriptive</option>
                  <option value="3">Expository</option>
                  <option value="4">Persuasive</option>
                  <option value="5">Creative</option>
                  <option value="6">Objective</option>
                  <option value="7">Subjective</option>
                  <option value="8">Review</option>
                  <option value="9">Poetic</option>
                  <option value="10">Technical</option>
                </select>
              </div>
              <div>
                <select
                  className="custom-box custom-select form-select"
                  aria-label="Default select example"
                  onChange={(e) => setNatureSelected(e.target.value)}
                >
                  <option selected>Nature of Article</option>
                  <option value="1">Political</option>
                  <option value="2">Investigative</option>
                  <option value="3">Reporting in-depth</option>
                  <option value="4">Gossip</option>
                  <option value="5">Humorous</option>
                  <option value="6">Blog / Essay</option>
                  <option value="7">Personality / Profile</option>
                  <option value="8">Advice</option>
                  <option value="9">Editorial</option>
                  <option value="10">Critical/Judgemental/Analysis</option>
                  <option value="11">Review - Book or Movie</option>
                  <option value="12">Food Columns</option>
                  <option value="13">View / Counter-View (Point)</option>
                  <option value="14">Explanation or recommendation</option>
                  <option value="15">Quotation and facts</option>
                  <option value="16">Opening Remark/thesis</option>
                  <option value="17">Objective explanation</option>
                  <option value="18">Analogies/history/examples</option>
                  <option value="19">Set up example</option>
                </select>
              </div>
            </div>
          )}
          {/* --------------------------------------------------------------------------------------------- */}
          {/* Display the selected options and selected dropdown in a single line */}

          {/* --------------------------------------------------------------------------------------------- */}

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
                width="24"
                height="22"
                viewBox="0 0 32 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.8961 18.8991C31.2279 18.7225 31.5068 18.4512 31.7018 18.1157C31.8967 17.7802 32 17.3937 32 16.9994C32 16.6051 31.8967 16.2186 31.7018 15.8831C31.5068 15.5476 31.2279 15.2763 30.8961 15.0996L2.89505 0.224615C2.54786 0.0400454 2.15762 -0.0331805 1.77193 0.0138699C1.38624 0.0609203 1.02177 0.226213 0.72299 0.489584C0.42421 0.752956 0.204033 1.10302 0.0893154 1.49707C-0.0254021 1.89113 -0.0297013 2.31214 0.0769443 2.70874L2.93505 13.3337C3.0546 13.7778 3.30707 14.1684 3.65425 14.4464C4.00142 14.7244 4.42439 14.8746 4.85912 14.8744L14.0015 14.8744C14.5319 14.8744 15.0406 15.0983 15.4157 15.4968C15.7908 15.8953 16.0015 16.4358 16.0015 16.9994C16.0015 17.563 15.7908 18.1035 15.4157 18.502C15.0406 18.9005 14.5319 19.1244 14.0015 19.1244L4.85912 19.1244C4.42439 19.1241 4.00142 19.2744 3.65425 19.5523C3.30707 19.8303 3.0546 20.2209 2.93505 20.665L0.0789422 31.29C-0.027917 31.6865 -0.0238734 32.1074 0.0905732 32.5015C0.20502 32.8956 0.424928 33.2458 0.723473 33.5094C1.02202 33.7729 1.3863 33.9385 1.7719 33.9859C2.1575 34.0333 2.54775 33.9605 2.89505 33.7763L30.8961 18.9013L30.8961 18.8991Z"
                  fill="#838383"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenAI;
