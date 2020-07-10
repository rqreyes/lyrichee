import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const LyricsLine = ({ line, learnLine }) => {
  const [hideLine, setHideLine] = useState(false);

  const learnLineClass = learnLine ? 'hide-line' : '';
  const learnLineTextClass = hideLine ? 'active' : '';
  const learnLineButtonDisplay =
    learnLine && !hideLine ? (
      <FontAwesomeIcon icon={faPlusCircle} />
    ) : (
      <FontAwesomeIcon icon={faMinusCircle} />
    );

  return (
    <div className={`lyrics-line ${learnLineClass} ${learnLineTextClass}`}>
      <button
        type='button'
        className='line-button'
        onClick={() => setHideLine((prev) => !prev)}
      >
        {learnLineButtonDisplay}
      </button>
      <p>{line}</p>
    </div>
  );
};

export default LyricsLine;
