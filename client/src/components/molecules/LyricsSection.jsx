import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const LyricsSection = ({ section, showSectionButtons }) => {
  const [hideSection, setHideSection] = useState(false);
  const lyricsSectionRef = useRef();

  const showSectionButtonsClasses = showSectionButtons ? '' : 'hide';
  const showSectionButtonsDisplay = hideSection ? (
    <FontAwesomeIcon icon={faMinusCircle} />
  ) : (
    <FontAwesomeIcon icon={faPlusCircle} />
  );

  if (lyricsSectionRef.current && !showSectionButtons) {
    lyricsSectionRef.current.style.maxHeight = `${lyricsSectionRef.current.scrollHeight}px`;
  } else if (lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = hideSection
      ? `${lyricsSectionRef.current.scrollHeight}px`
      : '0px';
  }

  return (
    <div>
      <button
        type='button'
        className={showSectionButtonsClasses}
        onClick={() => setHideSection((prev) => !prev)}
      >
        {showSectionButtonsDisplay}
      </button>
      <div className='lyrics-section' ref={lyricsSectionRef}>
        <div className='lyrics-section-content'>
          {section.split(/\n/).map((line, ind) => (
            <p key={`line-${ind}`}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LyricsSection;
