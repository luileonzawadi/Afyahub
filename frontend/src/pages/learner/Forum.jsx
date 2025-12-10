import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiThumbsUp, FiPlus, FiSearch, FiUsers, FiHeart, FiBook } from 'react-icons/fi';
import { useForumTopics, useCreateTopic } from '../../hooks/useQuery';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './Forum.css';

const Forum = () => {
  const { user } = useAuth();
  const { data: topics, isLoading } = useForumTopics();
  const createTopic = useCreateTopic();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newTopic, setNewTopic] = useState({ title: '', content: '', category: 'general' });

  const categories = [
    { id: 'all', label: 'All Topics', icon: FiMessageSquare },
    { id: 'support', label: 'Support & Care', icon: FiHeart },
    { id: 'education', label: 'Education', icon: FiBook },
    { id: 'community', label: 'Community', icon: FiUsers }
  ];

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    try {
      const result = await createTopic.mutateAsync(newTopic);
      
      // Notify all users about new forum post
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      allUsers.forEach(userEmail => {
        if (userEmail !== user?.email) {
          const userKey = `notifications_${userEmail}`;
          const notifications = JSON.parse(localStorage.getItem(userKey) || '[]');
          const newNotification = {
            id: Date.now() + Math.random(),
            title: '💬 New Forum Discussion',
            message: `${user?.name} posted: "${newTopic.title}"`,
            time: new Date().toLocaleString(),
            read: false
          };
          notifications.unshift(newNotification);
          localStorage.setItem(userKey, JSON.stringify(notifications));
        }
      });
      
      setShowModal(false);
      setNewTopic({ title: '', content: '', category: 'general' });
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  const filteredTopics = topics?.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="forum">
      <div className="container">
        <div className="forum-header">
          <div>
            <h1>Community Forum</h1>
            <p>Connect, share experiences, and support each other</p>
          </div>
          {user && (
            <Button onClick={() => setShowModal(true)}>
              <FiPlus /> New Discussion
            </Button>
          )}
        </div>

        <div className="forum-filters">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <Icon />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="topics-list">
          {filteredTopics?.map(topic => {
            const topicData = JSON.parse(localStorage.getItem(`topic_${topic.id}`) || '{}');
            const likeCount = topicData.likeCount || 0;
            const commentsCount = topicData.comments?.length || 0;
            
            return (
              <Card key={topic.id} hover>
                <Link to={`/forum/${topic.id}`} className="topic-card">
                  <div className="topic-main">
                    <h3>{topic.title}</h3>
                    <p>{topic.excerpt}</p>
                    <div className="topic-meta">
                      <span>by {topic.author}</span>
                      <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="topic-stats">
                    <div className="stat">
                      <FiMessageSquare />
                      <span>{commentsCount}</span>
                    </div>
                    <div className="stat">
                      <FiThumbsUp />
                      <span>{likeCount}</span>
                    </div>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>

        {!isLoading && filteredTopics?.length === 0 && (
          <Card>
            <div className="empty-state">
              <FiMessageSquare size={48} />
              <h3>No discussions found</h3>
              <p>Be the first to start a conversation</p>
            </div>
          </Card>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Start a Discussion">
          <form onSubmit={handleCreateTopic}>
            <Input
              label="Title"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              placeholder="What's on your mind?"
              required
            />
            <div className="input-group">
              <label className="input-label">Category</label>
              <select
                className="input"
                value={newTopic.category}
                onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
              >
                <option value="general">General</option>
                <option value="support">Support & Care</option>
                <option value="education">Education</option>
                <option value="community">Community</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Content</label>
              <textarea
                className="input"
                rows="6"
                value={newTopic.content}
                onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                placeholder="Share your thoughts..."
                required
              />
            </div>
            <Button type="submit" disabled={createTopic.isPending}>
              {createTopic.isPending ? 'Creating...' : 'Create Discussion'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Forum;
