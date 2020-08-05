import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { StyledButton } from '../styles/Styles';

const LyricsLine = ({
  dataFavoriteItem,
  learnedIdxLine,
  line,
  learnLine,
  learnReset,
  sectionIdx,
  lineIdx,
  updateLearnedLyrics,
}) => {
  const [hideLine, setHideLine] = useState(false);
  const learnLineClass = learnLine ? 'hide-line' : '';
  const learnLineTextClass = hideLine ? 'active' : '';
  const learnLineButtonDisplay =
    learnLine && !hideLine ? (
      <FontAwesomeIcon icon={faPlusCircle} />
    ) : (
      <FontAwesomeIcon icon={faMinusCircle} />
    );

  const handleHideLine = () => {
    setHideLine((prev) => {
      if (Object.keys(dataFavoriteItem).length) {
        if (prev) updateLearnedLyrics(false, sectionIdx, lineIdx);
        else updateLearnedLyrics(true, sectionIdx, lineIdx);
      }

      return !prev;
    });
  };

  useEffect(() => {
    if (learnedIdxLine) {
      setHideLine(true);
    }
  }, [learnedIdxLine]);

  const regex = RegExp('^\\[');

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setHideLine(false);
  }, [learnReset]);

  if (regex.test(line)) {
    return <p className='lyrics-section-header'>{line}</p>;
  } else {
    return (
      <div className={`lyrics-line ${learnLineClass} ${learnLineTextClass}`}>
        <StyledButton
          type='button'
          className='line-button'
          onClick={handleHideLine}
        >
          {learnLineButtonDisplay}
        </StyledButton>
        <p>{line}</p>
      </div>
    );
  }
};

export default LyricsLine;
