
from flask import Flask, render_template, request, jsonify
from groq_service import generate_ai_response
from prompts import SYSTEM_PROMPT, create_user_prompt

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    try:
        data = request.get_json()

        task = data.get("task", "Write Email")
        text = data.get("text", "")
        tone = data.get("tone", "Professional")
        language = data.get("language", "English")

        if not text.strip():
            return jsonify({
                "error": "Please enter your text."
            }), 400

        user_prompt = create_user_prompt(
            task, text, tone, language
        )

        final_prompt = SYSTEM_PROMPT + "\n\n" + user_prompt

        result = generate_ai_response(final_prompt)

        return jsonify({
            "success": True,
            "result": result
        })

    except Exception as error:
        return jsonify({
            "error": str(error)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
