import './ProgressBar.css';

const ProgressBar = ({ progress, showLabel = true }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && <span className="progress-label">{progress}%</span>}
    </div>
  );
};

export default ProgressBar;
