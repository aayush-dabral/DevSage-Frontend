import React from "react";

const OutputWindow = ({ outputDetails, output, consoleOption, consoleActivate }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            // compilation error
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {output}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-green-500">
                    {output !== null
                        ? `${output}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {output}
                </pre>
            );
        }
    };

    return (
        <>
            {/* <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                Output
            </h1> */}
            <div className={`w-full ${consoleOption === 'Console' ? 'block' : 'hidden'} ${consoleActivate ? 'h-[85%]' : 'h-[78%]'} bg-black rounded-md text-white font-normal text-sm overflow-y-auto`}>
                {outputDetails ? <>{getOutput()}</> : null}
            </div>
        </>
    );
};

export default OutputWindow;