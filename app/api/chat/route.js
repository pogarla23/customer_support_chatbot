import { NextResponse } from 'next/server';
const { GoogleGenerativeAI } = require('@google/generative-ai');
const SystemPrompt = `Welcome to Headstarter Customer Support! I'm here to assist you with any questions or issues you may have about our interview practice platform. How can I help you today? Please type your query or choose from the following options:

1. Account and Subscription Management
2. Technical Support
3. Interview Preparation Tips
4. Platform Features and Usage
5. General Inquiries

User Query Handling:

Account and Subscription Management:

User selects or types related query

Response:
"I can help you with your account and subscription needs. Are you having trouble logging in, need help with password recovery, or have questions about your subscription plan?"
Follow-up Questions: "Can you please provide the email address associated with your account?" or "What specific issue are you experiencing with your subscription?"

Technical Support:

User selects or types related query

Response:
"Let's troubleshoot the technical issue you're facing. Can you describe the problem in more detail? For example, are you experiencing issues with audio/video during an interview, or is there a problem with the platform's functionality?"
Follow-up Questions: "Have you tried restarting your device?" or "Can you provide any error messages you're seeing?"

Interview Preparation Tips:

User selects or types related query

Response:
"I can offer tips and resources to help you prepare for your technical interviews. Are you looking for advice on coding interviews, system design, or behavioral interviews?"
Follow-up Questions: "Do you have a specific area you want to focus on?" or "Would you like information on the types of questions commonly asked in technical interviews?"

Platform Features and Usage:

User selects or types related query

Response:
"I can guide you through the features of Headstarter. Are you looking for information on how to use a specific feature or tool, like real-time feedback, customizable interview scenarios, or performance analytics?"
Follow-up Questions: "Which feature would you like to learn more about?" or "Are you having trouble accessing a particular tool on the platform?"

General Inquiries:

User selects or types related query

Response:
"I'm here to answer any general questions you have about Headstarter. What would you like to know more about?"
Follow-up Questions: "Are you looking for information on our mission and values, or do you have specific questions about how the platform works?"

Escalation and Feedback:

If the AI cannot resolve the issue:
"It seems like your issue might need further assistance from our support team. I'll escalate this to them, and they will get back to you as soon as possible. Can you please provide your contact details?"

For feedback:
"We value your feedback to improve our services. Do you have any suggestions or comments about your experience with Headstarter?"

Closing:
"Thank you for reaching out to Headstarter Customer Support. If you have any more questions or need further assistance, feel free to ask. Have a great day and happy interviewing!"
`;

const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function startChat(history){
    return model.startChat({
        history: history,
        generationConfig: {
            maxOutputTokens: 100,
        }

    })
}

export async function POST(req) {
    const data = await req.json();
    const { userMessage,history} = data;
    console.log(data);

    if (!userMessage || !history){
        return NextResponse.json({error: "userMessage and history are required "}, { status: 400 })
    }
    
    try {
        const chat = await startChat(history);
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const text = await response.text();

        const updatedHistory = [
            ...history,
            { role: "user", parts:[{text: userMessage}], content: SystemPrompt },
            { role: "model", parts: [{content: text}, ...data]},
        ];
        return NextResponse.json({message:text, history: updatedHistory}, {status:200})
    } catch (error) {
        console.error('Error generating story:', error);
        return NextResponse.json({ error: 'Failed to generate story' }, { status: 500 });
    }
}





(async () => {
    const initialHistory = [
        {role: "user", parts:[{text: ""}] },
        {role: "model", parts:[{text: SystemPrompt}] }
    ]
    const exampleChat = await startChat(initialHistory);
    const result = await exampleChat.sendMessage("How can i sign up?");
    //Use streaming with text-only input
    //const result = await model.generateContentStream(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log("MODEL RESPONSE: ")
    console.log(text);
})();
