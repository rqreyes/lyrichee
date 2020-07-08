import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const LyricsLine = ({ line, learnLine }) => {
  const [hideLine, setHideLine] = useState(false);

  const learnLineButtonClasses = learnLine ? '' : 'hide';
  let learnLineButtonDisplay;
  let learnLineClasses;

  if (learnLine && !hideLine) {
    learnLineButtonDisplay = <FontAwesomeIcon icon={faPlusCircle} />;
    learnLineClasses = 'hide';
  } else {
    learnLineButtonDisplay = <FontAwesomeIcon icon={faMinusCircle} />;
    learnLineClasses = '';
  }

  return (
    <div className='lyrics-line'>
      <button
        type='button'
        className={`line-button ${learnLineButtonClasses}`}
        onClick={() => setHideLine((prev) => !prev)}
      >
        {learnLineButtonDisplay}
      </button>
      <p className={learnLineClasses}>{line}</p>
    </div>
  );
};

export default LyricsLine;
