import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiThumbsUp, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { useForumTopic } from '../../hooks/useQuery';
import { useAuth } from '../../context/AuthContext';
import { forumAPI } from '../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './ForumTopic.css';

const ForumTopic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: topic, isLoading, refetch } = useForumTopic(id);
  const [reply, setReply] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const topicData = JSON.parse(localStorage.getItem(`topic_${id}`) || '{}');
    setLiked(topicData.liked || false);
    setLikeCount(topicData.likeCount || 0);
    setComments(topicData.comments || []);
  }, [id]);

  const handleLike = () => {
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLiked(newLiked);
    setLikeCount(newCount);
    
    const topicData = JSON.parse(localStorage.getItem(`topic_${id}`) || '{}');
    topicData.liked = newLiked;
    topicData.likeCount = newCount;
    topicData.comments = comments;
    localStorage.setItem(`topic_${id}`, JSON.stringify(topicData));
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    
    const newComment = {
      id: Date.now(),
      content: reply,
      author: user?.name || 'Anonymous',
      createdAt: new Date().toISOString()
    };
    
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setReply('');
    
    const topicData = JSON.parse(localStorage.getItem(`topic_${id}`) || '{}');
    topicData.liked = liked;
    topicData.likeCount = likeCount;
    topicData.comments = updatedComments;
    localStorage.setItem(`topic_${id}`, JSON.stringify(topicData));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      try {
        await forumAPI.deleteTopic(id);
        localStorage.removeItem(`topic_${id}`);
        queryClient.invalidateQueries(['forumTopics']);
        navigate('/forum');
      } catch (error) {
        console.error('Failed to delete topic:', error);
        alert('Failed to delete discussion');
      }
    }
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (!topic) return <div className="container">Topic not found</div>;

  return (
    <div className="forum-topic">
      <div className="container">
        <Link to="/forum" className="back-link">
          <FiArrowLeft /> Back to Forum
        </Link>

        <Card>
          <div className="topic-header">
            <div className="topic-header-content">
              <h1>{topic.title}</h1>
              <div className="topic-meta">
                <span>by {topic.author}</span>
                <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {user && topic.author === user.name && (
              <button className="delete-topic-btn" onClick={handleDelete}>
                <FiTrash2 /> Delete
              </button>
            )}
          </div>
          <div className="topic-content">
            <p>{topic.content}</p>
          </div>
          <div className="topic-actions">
            <button 
              className={`action-btn ${liked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <FiThumbsUp /> {likeCount} Likes
            </button>
            <div className="stat">
              <FiMessageSquare /> {comments.length} Replies
            </div>
          </div>
        </Card>

        <div className="comments-section">
          <h2>Replies ({comments.length})</h2>
          
          {user && (
            <Card>
              <form onSubmit={handleReply} className="reply-form">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply..."
                  rows="4"
                  required
                />
                <Button type="submit">Post Reply</Button>
              </form>
            </Card>
          )}

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <strong>{comment.author}</strong>
                  <span>• {new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="comment-bubble">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <Card>
              <div className="empty-state">
                <FiMessageSquare size={48} />
                <p>No replies yet. Be the first to reply!</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumTopic;
