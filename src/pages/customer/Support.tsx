import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Send,
  FileText,
  Video,
  Book
} from 'lucide-react';

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');

  const supportTickets = [
    {
      id: 'TKT-001',
      subject: 'Temperature too high in composter',
      category: 'Technical Issue',
      status: 'resolved',
      priority: 'high',
      createdDate: '2024-01-10',
      resolvedDate: '2024-01-12',
      response: 'Issue resolved by adjusting ventilation. Temperature now normal at 45°C.'
    },
    {
      id: 'TKT-002',
      subject: 'Request for additional training',
      category: 'Training',
      status: 'in-progress',
      priority: 'medium',
      createdDate: '2024-01-15',
      resolvedDate: null,
      response: 'Training session scheduled for next week. Our expert will visit your location.'
    }
  ];

  const faqItems = [
    {
      question: 'What should I do if my composter smells bad?',
      answer: 'Bad smell usually indicates too much wet waste or poor ventilation. Add dry materials like leaves or paper, and ensure proper air circulation. Contact support if the issue persists.'
    },
    {
      question: 'How often should I harvest compost?',
      answer: 'Typically every 2-3 months, depending on usage. The compost is ready when it looks dark, crumbly, and earthy. Our staff will guide you on the best harvesting schedule.'
    },
    {
      question: 'Can I add cooked food to the composter?',
      answer: 'It\'s best to avoid cooked food, especially with oil or spices. Stick to raw vegetable peels, fruit waste, and garden trimmings for best results.'
    },
    {
      question: 'What if my composter stops working?',
      answer: 'First check if it\'s plugged in and the power switch is on. If the issue persists, contact our support team immediately for technical assistance.'
    },
    {
      question: 'How do I know if my compost is ready?',
      answer: 'Ready compost is dark brown, crumbly, and has an earthy smell. It should not smell bad or have visible food scraps. Our staff will help you identify when it\'s ready.'
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We will contact you within 24 hours.');
    setMessage('');
    setSelectedCategory('');
    setPriority('medium');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Support Center</h1>
          <p className="text-gray-600">Get help with your composter and services</p>
        </div>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Call Support</h3>
              <p className="text-green-600 font-medium">+91 98765 43210</p>
              <p className="text-sm text-gray-500">24/7 Emergency Support</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email Support</h3>
              <p className="text-blue-600 font-medium">support@stonesoup.com</p>
              <p className="text-sm text-gray-500">Response within 4 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Live Chat</h3>
              <p className="text-purple-600 font-medium">Start Chat</p>
              <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Support Ticket */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Submit Support Ticket</h3>
        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select category</option>
                <option value="technical">Technical Issue</option>
                <option value="maintenance">Maintenance Request</option>
                <option value="training">Training & Guidance</option>
                <option value="billing">Billing Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="low">Low - General inquiry</option>
                <option value="medium">Medium - Non-urgent issue</option>
                <option value="high">High - Urgent problem</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Describe your issue or question in detail..."
              required
            />
          </div>
          
          <button
            type="submit"
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Send className="h-5 w-5" />
            <span>Submit Ticket</span>
          </button>
        </form>
      </div>

      {/* My Support Tickets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Support Tickets</h3>
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{ticket.subject}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Ticket ID: {ticket.id} • Category: {ticket.category}</p>
                  <p className="text-sm text-gray-500">Created: {ticket.createdDate}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">Response:</p>
                <p className="text-gray-700">{ticket.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Helpful Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h4 className="font-medium text-gray-800">User Manual</h4>
              <p className="text-sm text-gray-600">Complete guide to your composter</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Video className="h-8 w-8 text-green-500" />
            <div>
              <h4 className="font-medium text-gray-800">Video Tutorials</h4>
              <p className="text-sm text-gray-600">Step-by-step video guides</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Book className="h-8 w-8 text-purple-500" />
            <div>
              <h4 className="font-medium text-gray-800">Best Practices</h4>
              <p className="text-sm text-gray-600">Tips for optimal composting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <div>
            <h3 className="font-semibold text-red-800">Emergency Support</h3>
            <p className="text-red-700">For urgent issues like equipment malfunction or safety concerns:</p>
            <p className="text-red-800 font-bold text-lg">📞 +91 98765 43210 (24/7)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;