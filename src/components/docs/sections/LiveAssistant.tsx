import { FC, useState, useEffect } from "react";
import { MessageSquare, X, Mic, Send } from "lucide-react";

const LiveAssistant: FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { type: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getReply = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("deploy") || lower.includes("edge ai") || lower.includes("container")) {
      return `Olyxee is designed to make AI deployment effortless. You can take any model, and it automatically packages it into a container optimized for the target hardware. This means your AI can run on Raspberry Pi, Jetson boards, or even microcontrollers without you touching a single low-level setting. It also verifies performance and stability so you can trust your models in production.`;
    } else if (lower.includes("quantization") || lower.includes("optimization")) {
      return `When we talk about quantization and optimization, Olyxee reduces the model size and accelerates computation while keeping accuracy intact. Even low-power devices can run advanced AI models smoothly, which is critical if you want real-time inference on the edge. It's like squeezing maximum performance out of your hardware without any manual tuning.`;
    } else if (lower.includes("workflow") || lower.includes("pipeline")) {
      return `The deployment workflow is simple but powerful: Model → Containerize → Deploy → Verify → Run. Each stage is tracked, reproducible, and optimized for developers. You always know exactly what happened at each step and can tweak it if needed.`;
    } else if (lower.includes("edge devices") || lower.includes("hardware")) {
      return `Olyxee supports a wide range of devices from small boards like Raspberry Pi and Arduino to more powerful NVIDIA Jetson devices. The system automatically adapts your model to the hardware, handling compatibility, performance tuning, and verification behind the scenes.`;
    } else if (lower.includes("documentation") || lower.includes("learn")) {
      return `You can check out detailed guides and tutorials on our docs site to learn how to get started with deployment, containerization, and optimization. Everything is designed to make your life easier.`;
    } else {
      return `That's a great question! I might not have a full answer ready, but you can schedule a call with me directly to discuss in detail: https://calendly.com/scofieldx911/30min`;
    }
  };

  const typeMessage = (text: string) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      setIsTyping(true);
      const interval = setInterval(() => {
        if (i === text.length) {
          clearInterval(interval);
          setIsTyping(false);
          resolve();
        } else {
          setMessages((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.type === "assistant") {
              const updated = [...prev];
              updated[updated.length - 1] = { type: "assistant", text: lastMsg.text + text[i] };
              return updated;
            } else {
              return [...prev, { type: "assistant", text: text[i] }];
            }
          });
          i++;
        }
      }, 25); // typing speed in ms per character
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const replyText = getReply(input);
    setInput("");
    // start typing effect
    setMessages((prev) => [...prev, { type: "assistant", text: "" }]);
    await typeMessage(replyText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open ? (
        <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Olyxee Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 px-4 py-3 overflow-y-auto space-y-2 max-h-96">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm break-words ${msg.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl max-w-[80%] bg-gray-100 text-gray-900 text-sm animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="text"
              placeholder="Ask me about Olyxee..."
              className="flex-1 px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default LiveAssistant;
