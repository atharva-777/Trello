import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const {todos} = await request.json();
    console.log(todos)

    // communicate with openai
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      stream: false,
      n : 1,
      messages: [
        {
            role : 'system',
            content : 'when responding, always first welcome user with some qoute or funny joke and mention a name as hey buddy limit the response to 200 characters',
        },
        {
            role : 'user',
            content : `Hello there, provide a summary of the following todos . Count how many todos are in each category such as To Do,In Progress and Done. then tell the user to have a productive day Here is the data ${JSON.stringify(todos)}`
        },
      ],
    });

    const {data} = response;

    console.log("Data is : ",data)
    console.log(data.choices[0].message)

    return NextResponse.json(data.choices[0].message)
}