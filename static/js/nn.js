const API_KEY = "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"
const MODEL = "xiaomi/mimo-v2-flash:free";

let messages = []

async function sendRequest() {
    let text = document.getElementById("userInput").value

    if (text == "") {
        alert("Введите текст")
        return
    }
    messages.push({
        role: "user",
        content: text
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Xiaomi",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: MODEL,
            messages: messages
        })
    })

    const result = await response.json()

    const answer = result.choices[0].message.content


    messages.push({
        role: "assistant",
        content: answer
    });

    const output = document.getElementById("output");
    if (output) {
        output.innerHTML += `<div><b>AI:</b> ${answer}</div>`;
    }

   
}
