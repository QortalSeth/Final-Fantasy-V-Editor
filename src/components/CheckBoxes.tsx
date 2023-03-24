import React, { useImperativeHandle, useRef, useState } from 'react';
import CSS from 'csstype';

export interface CheckBoxWithDefaultProps {
  labelStyle?: CSS.Properties;
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
export const CheckBoxWithDefault = React.forwardRef<CheckboxRef, CheckBoxWithDefaultProps>(
  ({ labelStyle = {}, labelText }: CheckBoxWithDefaultProps, ref) => {
    const [checked, setChecked] = useState(false);
    const [defaultChecked, setDefaultChecked] = useState(false);
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
          <input type='checkbox' id='varLength' checked={defaultChecked} ref={defaultRef} disabled />
          {labelText}
        </label>
      </div>
    );
  }
);
