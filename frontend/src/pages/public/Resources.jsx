import { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiGlobe, FiClock, FiFilter } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { resourceAPI } from '../../services/api';
import Card from '../../components/common/Card';
import './Resources.css';

const Resources = () => {
  const [selectedType, setSelectedType] = useState('all');
  
  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', selectedType],
    queryFn: () => resourceAPI.getAll(selectedType === 'all' ? null : selectedType).then(res => res.data)
  });

  const resourceTypes = [
    { id: 'all', label: 'All Resources' },
    { id: 'testing_center', label: 'Testing Centers' },
    { id: 'support_service', label: 'Support Services' },
    { id: 'counseling', label: 'Counseling' }
  ];

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="resources">
      <div className="container">
        <div className="resources-header">
          <h1>Resource Directory</h1>
          <p>Find testing centers, support services, and counseling near you</p>
        </div>

        <div className="resources-filters">
          <FiFilter />
          <div className="filter-buttons">
            {resourceTypes.map(type => (
              <button
                key={type.id}
                className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="resources-grid">
          {resources?.map(resource => (
            <Card key={resource.id} hover>
              <div className="resource-card">
                <div className="resource-header">
                  <h3>{resource.name}</h3>
                  <span className={`resource-type ${resource.type}`}>
                    {resource.type.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-details">
                  <div className="resource-detail">
                    <FiMapPin />
                    <span>{resource.address}</span>
                  </div>
                  
                  <div className="resource-detail">
                    <FiPhone />
                    <a href={`tel:${resource.phone}`}>{resource.phone}</a>
                  </div>
                  
                  {resource.email && (
                    <div className="resource-detail">
                      <FiMail />
                      <a href={`mailto:${resource.email}`}>{resource.email}</a>
                    </div>
                  )}
                  
                  {resource.website && (
                    <div className="resource-detail">
                      <FiGlobe />
                      <a href={resource.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                  )}
                  
                  <div className="resource-detail">
                    <FiClock />
                    <span>{resource.hours}</span>
                  </div>
                </div>
                
                {resource.services && (
                  <div className="resource-services">
                    <h4>Services:</h4>
                    <p>{resource.services}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {resources?.length === 0 && (
          <Card>
            <div className="empty-state">
              <FiMapPin size={48} />
              <h3>No resources found</h3>
              <p>Try selecting a different category</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Resources;