import React, { useImperativeHandle, useRef, useState } from 'react';
import { BaseTextfieldRef } from 'src/components/TextFields';
import CSS from 'csstype';

interface Props {
  labelStyle: CSS.Properties;
  labelText: string;
}

export type CheckboxRef = {
  getMainRef: () => React.RefObject<HTMLInputElement>;
  getDefaultRef: () => React.RefObject<HTMLInputElement>;
  getMainChecked: () => boolean;
  getDefaultChecked: () => boolean;
  setMainChecked: (check: boolean) => void;
  setDefaultChecked: (check: boolean) => void;
};
export const CheckBoxWithDefault = React.forwardRef<CheckboxRef, Props>(({ labelStyle = {}, labelText }: Props, ref) => {
  const [checked, setChecked] = useState(false);
  const mainRef = useRef<HTMLInputElement>(null);
  const defaultRef = useRef<HTMLInputElement>(null);

  const setValue = (checkedChange: boolean) => {
    setChecked(checkedChange);
  };
  const getMainRef = () => {
    return mainRef;
  };

  const getDefaultRef = () => {
    return defaultRef;
  };

  const getChecked = (usedRef: React.RefObject<HTMLInputElement>) => {
    const refCurrent = usedRef.current;
    if (refCurrent) return refCurrent.checked;
    return false;
  };

  const setNewChecked = (newChecked: boolean, usedRef: React.RefObject<HTMLInputElement>) => {
    const refCurrent = usedRef.current;
    if (refCurrent) refCurrent.checked = newChecked;
  };

  useImperativeHandle(ref, () => ({
    getMainRef,
    getDefaultRef,
    getMainChecked: () => getChecked(mainRef),
    getDefaultChecked: () => getChecked(defaultRef),
    setMainChecked: (newChecked) => setNewChecked(newChecked, mainRef),
    setDefaultChecked: (newChecked) => setNewChecked(newChecked, defaultRef),
  }));

  const defaultStyle: CSS.Properties = { fontSize: '16px' };

  return (
    <div>
      <label htmlFor='varLength' style={{ ...defaultStyle, ...labelStyle }}>
        <input type='checkbox' id='varLength' checked={checked} ref={mainRef} onChange={(e) => setChecked(!checked)} />
        {labelText}
      </label>
      <input type='checkbox' id='varLength' checked={checked} ref={defaultRef} disabled />
    </div>
  );
});
