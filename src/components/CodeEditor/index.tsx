import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface ICodeEditorProps {}

const CodeEditor: React.FC<ICodeEditorProps> = (props) => {
	const [content, setContent] = useState<string | undefined>("");

	const handleChangeEditor = (value: string | undefined) => {
		setContent(value);
	};
	console.log("value", content);
	return (
		<Editor
			height="300px"
			width="500px"
            theme="vs-dark"
			defaultLanguage="javascript"
			defaultValue={content}
			onChange={(value: string | undefined) => handleChangeEditor(value)}
		/>
	);
};

export default CodeEditor;
