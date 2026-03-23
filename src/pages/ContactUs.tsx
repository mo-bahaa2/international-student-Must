import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Paperclip, Send, MoreVertical, CheckCheck, Phone } from 'lucide-react';

export function ContactUs() {
  const [selectedAdvisor, setSelectedAdvisor] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'advisor',
      text: 'Hello! Welcome to Contact Us. How can we help you today?',
      time: 'Just now'
    }
  ]);
  const messagesEndRef = useRef(null);

  const advisors = [
  {
    id: 1,
    name: 'Mr. Tarek Hassan',
    role: 'Visa & Immigration',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: true,
    unread: 0
  },
  {
    id: 2,
    name: 'Ms. Sarah Ahmed',
    role: 'Academic Advisor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: false,
    unread: 2
  },
  {
    id: 3,
    name: 'Dr. Omar Sayed',
    role: 'Housing Support',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    online: true,
    unread: 0
  }];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'student',
        text: message,
        time: 'Now'
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate advisor response
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'advisor',
          text: 'Thank you for your message. We will review it and get back to you soon.',
          time: '1 min'
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const callAdvisor = () => {
    alert(`Calling ${advisors[selectedAdvisor].name}...`);
  };

  return (
    <div className="page-container h-[calc(100vh-80px)] py-6 flex flex-col">
      <div className="card flex-grow flex overflow-hidden bg-slate-900 shadow-none border-slate-700">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r border-slate-700 flex flex-col bg-slate-900">
          <div className="p-4 border-b border-slate-700 bg-slate-900">
            <h2 className="text-xl font-bold text-white mb-4">Contact Advisors</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search advisors..."
                className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400" />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {advisors.map((adv, idx) => (
              <div
                key={adv.id}
                onClick={() => setSelectedAdvisor(idx)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-slate-700 hover:bg-slate-800 ${idx === selectedAdvisor ? 'bg-slate-800 border-l-4 border-l-green-500' : ''}`}
              >
                <div className="relative">
                  <img
                    src={adv.avatar}
                    alt={adv.name}
                    className="w-12 h-12 rounded-full object-cover border-3 border-slate-900 shadow-md"
                  />
                  {adv.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-3 border-slate-900 shadow-sm"></div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-white">{adv.name}</h3>
                  <p className="text-xs text-gray-300 truncate">{adv.role}</p>
                </div>
                {adv.unread > 0 && (
                  <div className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg ml-2">
                    {adv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col bg-slate-900 text-white">
          {/* Header */}
          <div className="h-16 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={advisors[selectedAdvisor].avatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
                {advisors[selectedAdvisor].online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{advisors[selectedAdvisor].name}</h2>
                <p className="text-sm text-green-400 font-medium flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {advisors[selectedAdvisor].online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={callAdvisor} className="p-2 text-gray-400 hover:text-green-400 rounded-lg hover:bg-slate-800 transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-900" ref={messagesEndRef}>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-gray-400 bg-slate-800 px-4 py-2 rounded-full">
                Today, {new Date().toLocaleDateString()}
              </span>
            </div>

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-4 rounded-2xl shadow-lg ${
                  msg.sender === 'student'
                    ? 'bg-red-500 text-white rounded-br-none'
                    : 'bg-slate-800 text-white rounded-bl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`mt-2 flex items-center gap-1 text-xs text-gray-300`}>
                    <span>{msg.time}</span>
                    {msg.sender === 'student' && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-5 border-t border-slate-700 bg-slate-900 shrink-0">
            <div className="flex items-end gap-3 bg-slate-800 rounded-2xl p-3 shadow-lg">
              <button type="button" className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-slate-700 transition-all flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-transparent outline-none text-sm resize-none text-white placeholder-gray-400"
              />
              <button type="submit" className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex-shrink-0 min-w-[44px]">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Type /help for quick commands or press Esc to clear
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

