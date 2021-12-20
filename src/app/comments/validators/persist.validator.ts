import { AbstractControl } from '@angular/forms';

export function persist(persistValue: string) {
  return function (
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const controlValue = control.value as string;

    if(controlValue.length === persistValue.length) return { persist: true };

    if (controlValue.length < persistValue.length) {
      control.setValue(persistValue);
      return { persist: true };
    }

    return null;
  };
}
