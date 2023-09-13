import "./ChatMessage.css";

export default function ChatMessage({ text, role }: { text: string, role: string }) {
    return (
        <div className="chat-message">

            <div className={`chat-picture ${role}`} ></div>
            <p>{ text }</p>

        </div>
    )
}