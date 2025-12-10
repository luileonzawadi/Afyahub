import { useState } from 'react';
import { FiTrash2, FiEye, FiAlertCircle } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { forumAPI } from '../../services/api';
import Card from '../../components/common/Card';
import './ForumModeration.css';

const ForumModeration = () => {
  const queryClient = useQueryClient();
  const { data: topics, isLoading } = useQuery({
    queryKey: ['forumTopics'],
    queryFn: () => forumAPI.getTopics().then(res => res.data)
  });

  const handleDelete = (topicId, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const allTopics = JSON.parse(localStorage.getItem('forum_topics') || '[]');
      const filtered = allTopics.filter(t => t.id !== topicId);
      localStorage.setItem('forum_topics', JSON.stringify(filtered));
      localStorage.removeItem(`topic_${topicId}`);
      queryClient.invalidateQueries(['forumTopics']);
      window.location.reload();
    }
  };

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="forum-moderation">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Forum Moderation</h1>
            <p>Manage and moderate forum discussions</p>
          </div>
        </div>

        <Card>
          <div className="topics-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Replies</th>
                  <th>Likes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics?.map(topic => {
                  const topicData = JSON.parse(localStorage.getItem(`topic_${topic.id}`) || '{}');
                  const likeCount = topicData.likeCount || 0;
                  const commentsCount = topicData.comments?.length || 0;
                  
                  return (
                    <tr key={topic.id}>
                      <td>{topic.id}</td>
                      <td>{topic.title}</td>
                      <td>{topic.author}</td>
                      <td>
                        <span className="category-badge">{topic.category}</span>
                      </td>
                      <td>{new Date(topic.createdAt).toLocaleDateString()}</td>
                      <td>{commentsCount}</td>
                      <td>{likeCount}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="view-btn"
                            onClick={() => window.open(`/forum/${topic.id}`, '_blank')}
                          >
                            <FiEye />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(topic.id, topic.title)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {topics?.length === 0 && (
            <div className="empty-state">
              <FiAlertCircle size={48} />
              <p>No forum topics to moderate</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForumModeration;
