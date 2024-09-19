import React, { useEffect, useState } from "react";
import { IonIcon, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { warning } from "ionicons/icons";
import "./MainHome.css";

const availableMetric = [
  {
      'name': 'Panjang',
      'units': [{
          'name': 'km',
          'scale': 1,
          'preprocess_value': 0 
      },
      {
          'name': 'hm',
          'scale': 1, 
          'preprocess_value': 0
      },
      {
          'name': 'dam',
          'scale': 1,
          'preprocess_value': 0 
      },
      {
          'name': 'm',
          'scale': 1,
          'preprocess_value': 0
      },
      {
          'name': 'dm',
          'scale': 1,
          'preprocess_value': 0
      },
      {
          'name': 'cm',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'mm',
          'scale': 1, 
          'preprocess_value': 0 
      }],
      'unit_factor': 10
  },
  {
      'name': 'Massa',
      'units': [{
          'name': 'kg',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'hg',
          'scale': 1, 
          'preprocess_value': 0
      },
      {
          'name': 'dag',
          'scale': 1,
          'preprocess_value': 0 
      },
      {
          'name': 'g',
          'scale': 1,
          'preprocess_value': 0
      },
      {
          'name': 'dg',
          'scale': 1,
          'preprocess_value': 0
      },
      {
          'name': 'cg',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'mg',
          'scale': 1, 
          'preprocess_value': 0 
      }],
      'unit_factor': 10
  },
  {
      'name': 'Waktu',
      'units': [{
          'name': 'jam',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'menit',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'detik',
          'scale': 1, 
          'preprocess_value': 0 
      }],
      'unit_factor': 60
  },
  {
      'name': 'Kuat Arus',
      'units': [{
          'name': 'kA',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'hA',
          'scale': 1, 
          'preprocess_value': 0
      },
      {
          'name': 'daA',
          'scale': 1,
          'preprocess_value': 0 
      },
      {
          'name': 'A',
          'scale': 1,
          'preprocess_value': 0
      },
      {
          'name': 'dA',
          'scale': 1,
          'preprocess_value': 0
      },
      {
          'name': 'cA',
          'scale': 1, 
          'preprocess_value': 0 
      },
      {
          'name': 'mA',
          'scale': 1, 
          'preprocess_value': 0 
      }],
      'unit_factor': 10
  },
  {
      'name': 'Suhu',
      'units': [{
          'name': 'C',
          'scale': 5,
          'preprocess_value': 0
      }, {
          'name': 'R',
          'scale': 4,
          'preprocess_value': 0
      }, {
          'name': 'K',
          'scale': 5,
          'preprocess_value': 273
      }, {
          'name': 'F',
          'scale': 9,
          'preprocess_value': 32
      }],
      'unit_factor': 1
  }
]

const SelectUnit = ({ label, isDisabled, placeholder, units, onChange }) => (
  <div className="dropdown_input_container">
    <IonSelect
      label={label}
      placeholder={placeholder}
      labelPlacement="stacked"
      disabled={isDisabled}
      onIonChange={onChange}
      className="select_input_ion"
    >
      {units?.map((unit, index) => (
        <IonSelectOption value={index} key={index}>
          {unit.name}
        </IonSelectOption>
      ))}
    </IonSelect>
  </div>
);
export function ContentContainer() {
  const [state, setState] = useState({
    isInputDisabled: true,
    selectedMetricIndex: -1,
    toIndex: 0,
    fromIndex: 0,
    inputNumber: 0,
    resultNumber: 0,
    isInvalidInput: false,
  });

  const updateState = (newState) => setState((prev) => ({ ...prev, ...newState }));

  const handleMetric = (event) => {
    const selectedMetricIndex = availableMetric.findIndex(
      (metric) => metric.name === event.target.value
    );
    updateState({ selectedMetricIndex, isInputDisabled: false });
  };

  const handleConversion = (type) => (event) => {
    updateState({ [type]: event.target.value });
  };

  const handleInputNumber = (event) => {
    const inputNumber = parseFloat(event.target.value);
    updateState({
      inputNumber: isNaN(inputNumber) ? -1 : inputNumber,
      isInvalidInput: isNaN(inputNumber),
    });
  };

  useEffect(() => {
    if (state.selectedMetricIndex === -1) return;

    const { units, unit_factor } = availableMetric[state.selectedMetricIndex];
    const { fromIndex, toIndex, inputNumber } = state;
    const fromUnit = units[fromIndex];
    const toUnit = units[toIndex];

    if (fromIndex === toIndex) {
      updateState({ resultNumber: inputNumber });
    } else {
      const conversionFactor = unit_factor ** (toIndex - fromIndex);
      let resultNumber =
        ((inputNumber - fromUnit.preprocess_value) *
          (toUnit.scale / fromUnit.scale) *
          conversionFactor) +
        toUnit.preprocess_value;
      
      // Round the result to a reasonable number of decimal places (e.g., 10)
      resultNumber = Number(resultNumber.toFixed(10));
      
      updateState({ resultNumber });
    }
  }, [state.selectedMetricIndex, state.fromIndex, state.toIndex, state.inputNumber]);

  return (
    <div className="content_container">
      <IonSelect
        label="Pilih Metrik"
        placeholder="Metrik"
        onIonChange={handleMetric}
      >
        {availableMetric.map((metric, index) => (
          <IonSelectOption value={metric.name} key={index}>
            {metric.name}
          </IonSelectOption>
        ))}
      </IonSelect>

      <div className="dropdown_container">
        <SelectUnit
          label="Dari"
          isDisabled={state.isInputDisabled}
          placeholder="-- Pilih Satuan"
          units={availableMetric[state.selectedMetricIndex]?.units}
          onChange={handleConversion('fromIndex')}
        />
        <SelectUnit
          label="Ke"
          isDisabled={state.isInputDisabled}
          placeholder="-- Pilih Satuan"
          units={availableMetric[state.selectedMetricIndex]?.units}
          onChange={handleConversion('toIndex')}
        />
      </div>

      <div className="input_container">
        <label htmlFor="input_element">Input</label>
        <input
          type="number"
          onChange={handleInputNumber}
          disabled={state.isInputDisabled}
          className="input_ion"
          required={true}
          id="input_element"
          placeholder="123"
          step="any"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Hasil Konversi</p>
        {!state.isInputDisabled && !state.isInvalidInput && !isNaN(state.resultNumber) && (
          <div className="result_container">
            <p style={{ textAlign: "center" }}>{state.resultNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}