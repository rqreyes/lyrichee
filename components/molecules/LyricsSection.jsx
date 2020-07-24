import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import LyricsLine from '../atoms/LyricsLine';

const LyricsSection = ({ section, learnLine, learnSection }) => {
  const [hideSection, setHideSection] = useState(false);
  const lyricsSectionRef = useRef();
  let learnSectionClass;
  let learnSectionButtonDisplay;

  const learnSectionButtonClass = learnSection ? '' : 'hide-section';

  if (hideSection) {
    learnSectionClass = 'active';
    learnSectionButtonDisplay = <FontAwesomeIcon icon={faMinusCircle} />;
  } else {
    learnSectionClass = '';
    learnSectionButtonDisplay = <FontAwesomeIcon icon={faPlusCircle} />;
  }

  if (!learnSection && lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = `${lyricsSectionRef.current.scrollHeight}px`;
  } else if (lyricsSectionRef.current) {
    lyricsSectionRef.current.style.maxHeight = hideSection
      ? `${lyricsSectionRef.current.scrollHeight}px`
      : '0px';
  }

  return (
    <div className={`lyrics-section ${learnSectionClass}`}>
      <button
        type='button'
        className={`section-button ${learnSectionButtonClass}`}
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
