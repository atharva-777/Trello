import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board:Board) => {
    const todos = formatTodosForAI(board);

    // this is the actual request going to openai 
    // It needs paid subscription of API for this

    // const res = await fetch("/api/generateSummary",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":'application/json',
    //     },
    //     body:JSON.stringify({todos}),
    // });
    // const GPTdata = await res.json();
    // const {content} = GPTdata;

    const content = `Hey Atharva Your task summary for today is ${todos.todo} tasks are ToDo , ${todos.inprogress} tasks are In Progress and ${todos.done} tasks are Done Have a Productive Day 🚀`;
    return content;
}

export default fetchSuggestion;