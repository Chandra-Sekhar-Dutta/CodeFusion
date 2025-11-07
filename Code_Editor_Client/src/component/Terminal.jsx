const Terminal = ({ output, onClear }) => {
    return (
        <div className="flex flex-col bg-[#0d1117] border-t border-gray-700">
            {/* Header */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-gray-700 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-green-400 font-semibold text-sm">Terminal</span>
                    <span className="text-xs text-gray-500">Output</span>
                </div>
                <button
                    onClick={onClear}
                    className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-gray-700 transition"
                >
                    Clear
                </button>
            </div>

            {/* Output */}
            <div className="flex-1 bg-black text-green-400 font-mono text-sm overflow-y-auto p-4">
                <pre className="whitespace-pre-wrap leading-relaxed">
                    {output || "$ Run your code to see output..."}
                </pre>
            </div>
        </div>
    );
};

export default Terminal;
