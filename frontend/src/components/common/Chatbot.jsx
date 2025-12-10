import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm AfyaBot, your HIV/AIDS education assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What is HIV?",
    "How is HIV transmitted?",
    "HIV prevention methods",
    "HIV testing information",
    "Treatment options"
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hiv') && (msg.includes('what') || msg.includes('define'))) {
      return "HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. If left untreated, it can lead to AIDS. However, with proper treatment, people with HIV can live long, healthy lives.";
    }
    if (msg.includes('transmit') || msg.includes('spread') || msg.includes('get')) {
      return "HIV is transmitted through: unprotected sexual contact, sharing needles, mother to child during pregnancy/birth, and blood transfusions. It's NOT transmitted through casual contact, hugging, or sharing food.";
    }
    if (msg.includes('prevent') || msg.includes('protection')) {
      return "HIV prevention methods include: using condoms, PrEP medication, not sharing needles, regular testing, and knowing your partner's status. Visit our Prevention Strategies course for more details!";
    }
    if (msg.includes('test') || msg.includes('testing')) {
      return "HIV testing is confidential and widely available. Tests include rapid tests (20 minutes), laboratory tests, and home testing kits. Early detection is crucial for effective treatment. Check our courses for more information!";
    }
    if (msg.includes('treatment') || msg.includes('cure') || msg.includes('medicine')) {
      return "While there's no cure for HIV, Antiretroviral Therapy (ART) is highly effective. It suppresses the virus, strengthens the immune system, and prevents transmission (U=U: Undetectable = Untransmittable). Learn more in our courses!";
    }
    if (msg.includes('course') || msg.includes('learn')) {
      return "We offer comprehensive courses on HIV/AIDS education! Browse our course catalog to learn about prevention, treatment, and living with HIV. Would you like me to guide you to our courses?";
    }
    if (msg.includes('help') || msg.includes('support')) {
      return "I'm here to help! You can ask me about HIV basics, prevention, testing, treatment, or our educational courses. What would you like to know?";
    }
    
    return "I'm here to help with HIV/AIDS education questions. You can ask me about transmission, prevention, testing, treatment, or browse our courses for detailed information. What would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = { text: getBotResponse(input), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleQuickReply = (reply) => {
    const userMessage = { text: reply, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = { text: getBotResponse(reply), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <h3>AfyaBot</h3>
              <p>HIV/AIDS Education Assistant</p>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply, idx) => (
              <button key={idx} onClick={() => handleQuickReply(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
