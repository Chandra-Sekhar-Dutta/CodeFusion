import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Split from "react-split";
import CodeEditor from "./CodeEditor.jsx";
import Terminal from "./Terminal.jsx";

const RightSideBar = () => {
  const [code, setCode] = useState(`// Write your code here`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  // Ref used to trigger code execution
  const runTriggerRef = useRef(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Compiling and running...\n");

    // Mark trigger for editor to pass current code
    runTriggerRef.current = (editorCode) => executeCode(editorCode);

    setTimeout(() => {
      // Trigger editor’s useEffect to send the latest code
      setIsRunning(false);
    }, 300);
  };

  const executeCode = (finalCode) => {
    try {
      let capturedOutput = "";
      const originalLog = console.log;
      console.log = (...args) => {
        capturedOutput += args.join(" ") + "\n";
      };

      // Evaluate the code safely
      // eslint-disable-next-line no-eval
      eval(finalCode);
      console.log = originalLog;

      setOutput(
        `====================\n` +
          `Compilation successful!\n` +
          `====================\n\n` +
          `Output:\n${capturedOutput || "No output"}\n` +
          `====================\n` +
          `Execution completed.\n`
      );
    } catch (error) {
      setOutput(
        `====================\n` +
          `Compilation Error!\n` +
          `====================\n\n` +
          `Error: ${error.message}\n` +
          `====================\n`
      );
    }
  };

  const handleEndRoom = () => {
    if (window.confirm("Are you sure you want to end this room?")) navigate("/");
  };

  const handleClear = () => setOutput("");

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-[#0d1117]">
      {/* Toolbar */}
      <motion.div
        className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-gray-700 flex-shrink-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div></div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-md text-sm font-semibold shadow-md flex items-center gap-2 ${
              isRunning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <span>Run</span>
            )}
          </motion.button>

          <motion.button
            onClick={handleEndRoom}
            className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 rounded-md text-sm font-semibold shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            End Room
          </motion.button>
        </div>
      </motion.div>

      {/* Editor + Terminal */}
      <Split
        className="flex-1 flex flex-col overflow-hidden"
        sizes={[65, 35]}
        direction="vertical"
        gutterSize={6}
        gutterStyle={() => ({
          backgroundColor: "#30363d",
          cursor: "row-resize",
          height: "6px",
        })}
      >
        <CodeEditor code={code} onRunTrigger={runTriggerRef.current} />
        <Terminal output={output} onClear={handleClear} />
      </Split>
    </div>
  );
};

export default RightSideBar;
