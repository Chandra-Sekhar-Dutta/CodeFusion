import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { useState, useEffect } from "react";

const CodeEditor = ({ code, onRunTrigger }) => {
  const [localCode, setLocalCode] = useState(code);

  // Capture code updates locally
  const handleChange = (value) => {
    setLocalCode(value);
  };

  // Run when parent triggers the run event
  useEffect(() => {
    if (onRunTrigger) onRunTrigger(localCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRunTrigger]);

  return (
    <div className="overflow-hidden bg-[#0d1117] relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[#161b22] border-b border-gray-700 flex items-center px-4 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </span>
      </div>

      {/* CodeMirror Editor */}
      <div className="h-full pt-8 overflow-auto">
        <CodeMirror
          value={localCode}
          height="100%"
          theme={oneDark}
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
          className="text-base font-mono h-full"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
