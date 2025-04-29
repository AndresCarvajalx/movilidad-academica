import { IRequestForm } from "../../../types";

export interface RequestStepsProp {
  form: IRequestForm;
  onHandleInput?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onHandleIndexedInput?: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onAddContactoEmergencia?: () => void;
}
