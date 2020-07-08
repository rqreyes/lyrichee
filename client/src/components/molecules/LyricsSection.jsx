import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import LyricsLine from '../atoms/LyricsLine';

const LyricsSection = ({ section, learnLine, learnSection }) => {
  const [hideSection, setHideSection] = useState(false);
  const lyricsSectionRef = useRef();

  const learnSectionButtonClasses = learnSection ? '' : 'hide';
  const learnSectionButtonDisplay = hideSection ? (
    <FontAwesomeIcon icon={faMinusCircle} />
  ) : (
    <FontAwesomeIcon icon={faPlusCircle} />
  );

  if (!learnSection && lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = `${lyricsSectionRef.current.scrollHeight}px`;
  } else if (lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = hideSection
      ? `${lyricsSectionRef.current.scrollHeight}px`
      : '0px';
  }

  return (
    <div className='lyrics-section'>
      <button
        type='button'
        className={`section-button ${learnSectionButtonClasses}`}
        onClick={() => setHideSection((prev) => !prev)}
      >
        {learnSectionButtonDisplay}
      </button>
      <div className='lyrics-section-content' ref={lyricsSectionRef}>
        {section.split(/\n/).map((line, ind) => (
          <LyricsLine key={`line-${ind}`} line={line} learnLine={learnLine} />
        ))}
      </div>
    </div>
  );
};

export default LyricsSection;
