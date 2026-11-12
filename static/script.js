
const form = document.getElementById("assistantForm");
const generateBtn = document.getElementById("generateBtn");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const task = document.getElementById("task").value;
    const text = document.getElementById("text").value;
    const tone = document.getElementById("tone").value;
    const language = document.getElementById("language").value;

    if (!text.trim()) {
        alert("Please enter your text.");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";
    result.textContent = "AI is generating your content. Please wait...";

    try {

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: task,
                text: text,
                tone: tone,
                language: language
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        result.textContent = data.result;

    } catch (error) {

        result.textContent = "Error: " + error.message;

    } finally {

        generateBtn.disabled = false;
        generateBtn.textContent = "Generate with AI";

    }

});


copyBtn.addEventListener("click", async function () {

    const text = result.textContent;

    if (!text || text === "Your generated content will appear here...") {
        alert("Nothing to copy!");
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        alert("Result copied successfully!");
    } catch (error) {
        alert("Unable to copy. Please copy manually.");
    }

});
