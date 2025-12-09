import React, { useState } from 'react';
import { Search, BookOpen, Video, FileText, Download, ExternalLink, ChevronRight } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 24 },
    { id: 'sop', name: 'Standard Operating Procedures', count: 8 },
    { id: 'troubleshooting', name: 'Troubleshooting', count: 6 },
    { id: 'maintenance', name: 'Maintenance Guides', count: 5 },
    { id: 'safety', name: 'Safety Protocols', count: 3 },
    { id: 'training', name: 'Training Materials', count: 2 }
  ];

  const knowledgeItems = [
    {
      id: '1',
      title: 'Daily Compost Health Check SOP',
      category: 'sop',
      type: 'document',
      description: 'Step-by-step procedure for conducting daily health checks on composters',
      lastUpdated: '2024-01-10',
      downloadUrl: '#',
      tags: ['daily-check', 'temperature', 'moisture']
    },
    {
      id: '2',
      title: 'Troubleshooting High Temperature Issues',
      category: 'troubleshooting',
      type: 'document',
      description: 'Guide to identify and resolve overheating problems in composters',
      lastUpdated: '2024-01-08',
      downloadUrl: '#',
      tags: ['temperature', 'cooling', 'ventilation']
    },
    {
      id: '3',
      title: 'Composter Maintenance Training Video',
      category: 'training',
      type: 'video',
      description: 'Complete video guide for routine maintenance procedures',
      lastUpdated: '2024-01-05',
      videoUrl: '#',
      duration: '15 min',
      tags: ['maintenance', 'training', 'video']
    },
    {
      id: '4',
      title: 'Safety Protocol for Chemical Handling',
      category: 'safety',
      type: 'document',
      description: 'Safety guidelines for handling compost activators and testing chemicals',
      lastUpdated: '2024-01-12',
      downloadUrl: '#',
      tags: ['safety', 'chemicals', 'ppe']
    },
    {
      id: '5',
      title: 'IoT Device Connectivity Issues',
      category: 'troubleshooting',
      type: 'document',
      description: 'Common connectivity problems and their solutions',
      lastUpdated: '2024-01-09',
      downloadUrl: '#',
      tags: ['iot', 'connectivity', 'troubleshooting']
    },
    {
      id: '6',
      title: 'Waste Collection Best Practices',
      category: 'sop',
      type: 'document',
      description: 'Guidelines for efficient and hygienic waste collection procedures',
      lastUpdated: '2024-01-07',
      downloadUrl: '#',
      tags: ['collection', 'hygiene', 'efficiency']
    },
    {
      id: '7',
      title: 'Monthly Maintenance Checklist',
      category: 'maintenance',
      type: 'document',
      description: 'Comprehensive checklist for monthly composter maintenance',
      lastUpdated: '2024-01-06',
      downloadUrl: '#',
      tags: ['maintenance', 'checklist', 'monthly']
    },
    {
      id: '8',
      title: 'Emergency Response Procedures',
      category: 'safety',
      type: 'document',
      description: 'Step-by-step emergency response for various scenarios',
      lastUpdated: '2024-01-11',
      downloadUrl: '#',
      tags: ['emergency', 'response', 'safety']
    }
  ];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const frequentlyAsked = [
    {
      question: "What should I do if the composter temperature exceeds 60°C?",
      answer: "Immediately check ventilation, reduce organic load, and add dry materials. Refer to the High Temperature Troubleshooting guide."
    },
    {
      question: "How often should I check the moisture levels?",
      answer: "Moisture levels should be checked daily during routine inspections. Optimal moisture content is 50-60%."
    },
    {
      question: "What PPE is required for chemical handling?",
      answer: "Always wear protective gloves, safety goggles, and ensure proper ventilation. Refer to the Chemical Safety Protocol."
    },
    {
      question: "How do I report IoT device malfunctions?",
      answer: "Use the service log to document the issue and immediately notify your supervisor through the app's alert system."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Knowledge Base</h1>
          <p className="text-gray-600">SOPs, troubleshooting guides, and training materials</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search knowledge base..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked</h3>
            <div className="space-y-4">
              {frequentlyAsked.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <p className="text-sm font-medium text-gray-800 mb-2">{faq.question}</p>
                  <p className="text-xs text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getTypeIcon(item.type)}
                      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                      {item.type === 'video' && item.duration && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Last updated: {item.lastUpdated}</p>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {item.type === 'video' ? (
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Video className="h-4 w-4" />
                        <span>Watch</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    ) : (
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span>View</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No resources found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;