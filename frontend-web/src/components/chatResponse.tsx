import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./form";

interface Prompt {
  id: number;
  text: string;
  response: string;
}

// const prompts: Prompt[] = [
//   {
//     id: 1,
//     text: "Provide tech stack solutions for IoT Home Automation development",
//     response: "Sure! Here are some tech stacks you can consider...",
//   },
//   {
//     id: 2,
//     text: "Suggest an Authentication solution and evaluate it on a High, Medium, or Low scale",
//     response:
//       "I can present tables in markdown format, which is commonly used in documentation and can\n be easily rendered in many platforms. Here's an example",
//   },
// ];

const ChatResponse: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [prompts, setPrompts] = useState([])

  const { id } = useParams<{ id?: string }>();

  const handleSubmit = async (query: string) => {
    console.log("Submitted query:", query);
    console.log(id);
    if(prompts){}
    // const newPromptResponse = await getChatBotResponse()
    const newPrompt = {

    }
    setSubmitted(true);
  };



  return (
    <div
      className={`flex flex-col p-2 overflow-auto`}
    >
      {prompts.length > 0 && prompts.map(prompt => (
        <>
          <div className="p-2 bg-[#F3F5F4] rounded-full mb-2 md:mt-2 ml-auto">
            {/* <div className="text-[16px] text-black mb-2">{prompt.text}</div> */}
          </div>

          <div className="p-4 bg-white mt-2 mx-auto max-w-4xl">
            <div className="text-black text-justify whitespace-pre-line py-2">
              {/* {prompt.response.length > 0 ? prompt.response : ""} */}
            </div>
          </div>
        </>
      ))}
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatResponse;
