const Loading = () => {
  const logoSrc = '/images/logo-icon.png';

  return (
    <div className='loading'>
      <div className='note-group'>
        <div className='note'>&#9835;</div>
        <div className='note'>&#9839;</div>
        <img className='note' src={logoSrc} alt='logo' />
        <div className='note'>&#119074;</div>
        <img className='note' src={logoSrc} alt='logo' />
        <div className='note'>&#9837;</div>
        <div className='note'>&#9833;</div>
        <img className='note' src={logoSrc} alt='logo' />
        <div className='note'>&#119070;</div>
        <div className='note'>&#9834;</div>
      </div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
