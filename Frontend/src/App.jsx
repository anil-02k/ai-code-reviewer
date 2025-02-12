import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import axios from 'axios'
import Markdown from 'react-markdown'

const CodeEditor = () => {
  const [code, setCode] = useState(""); // Initialize with an empty string
  const [output, setOutput] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  async function reviewCode() {
    const response=await axios.post('http://localhost:3000/ai/get-review',{code})

    setOutput(response.data)
    
  }
  

  return (
    <div style={styles.container}>
      {/* Heading */}
      <h1 style={styles.heading}>AI-Powered Code Reviewer</h1>

      {/* Code Editor Panel */}
      <div style={styles.editorPanel}>
        <CodeMirror
          value={code}
          height="300px"
          extensions={[javascript()]}
          theme={dracula}
          onChange={(value) => setCode(value)}
        />
        <button
          onClick={reviewCode}
          style={{
            ...styles.button,
            ...(isHovered && styles.buttonHover),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Review
        </button>
      </div>

      {/* Output Panel */}
      <div style={styles.outputPanel}>
        <h3>Output:</h3>
        <pre style={styles.output}><Markdown>{output}</Markdown></pre>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Stack editor and output vertically on smaller screens
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#282a36",
    minHeight: "100vh",
    gap: "20px", // Adds space between child elements
  },
  heading: {
    color: "#f8f8f2", // Light text color to match the theme
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle text shadow
  },
  editorPanel: {
    width: "90%", // Take up 90% of the container width
    maxWidth: "800px", // Limit maximum width for better readability
    padding: "20px",
    border: "2px solid #50fa7b",
    borderRadius: "12px",
    backgroundColor: "#44475a",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
  },
  outputPanel: {
    width: "90%", // Take up 90% of the container width
    maxWidth: "800px", // Limit maximum width for better readability
    padding: "20px",
    border: "2px solid #ffb86c",
    borderRadius: "12px",
    color: "#f8f8f2",
    backgroundColor: "#44475a",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#50fa7b",
    color: "#282a36",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
  buttonHover: {
    backgroundColor: "#45e06b", // Slightly darker green on hover
  },
  output: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "14px",
    lineHeight: "1.5",
    backgroundColor: "#383a59", // Slightly darker background for output text
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
  },
};

export default CodeEditor;