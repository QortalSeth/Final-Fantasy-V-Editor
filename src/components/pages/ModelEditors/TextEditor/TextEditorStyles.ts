const col2Width = '72vw';
export const grid2ColumnStyle = {
  display: 'grid',
  gridTemplateColumns: '25% auto',
  gridGap: '0px',
  width: '100vw',
};
export const grid2ColumnGapStyle = { ...grid2ColumnStyle, gridGap: '0.25vh' };
const column2Style = {
  resize: 'none' as const,
  width: col2Width,
  gridColumnStart: 2,
  boxSizing: 'border-box' as const,
  padding: '0px',
};
export const labelStyle = { justifySelf: 'right', marginRight: '0.25vw', alignSelf: 'center' };
export const textAreaSmallStyle2ndC = {
  ...column2Style,
  height: '11vh',
  marginTop: '1vh',
};
export const textAreaMediumStyle2ndC = {
  ...column2Style,
  height: '15vh',
  marginTop: '1vh',
};

export const textAreaLarge2Col = {
  display: 'flex',
  resize: 'none' as const,
  width: '98vw',
  height: '40vh',
  justifySelf: 'center',
  marginLeft: '1vw',
  marginTop: '5px',
  boxSizing: 'border-box' as const,
};
export const buttonMediumStyle2ndC = {
  ...column2Style,
  height: '4vh',
  minHeight: '30px',
};

export const buttonHalf2ndColumnStyle = { ...column2Style, width: '50%', height: '4vh', minHeight: '30px' };
