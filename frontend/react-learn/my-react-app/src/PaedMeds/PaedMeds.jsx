import { useState } from 'react';
import { Formulary } from './Formulary.jsx';
import styles from './PaedMeds.module.css';

export default function PaedMeds(){

    const [medication, setMedication] = useState('');
    const [weight, setWeight] = useState(0);
    const [severity, setSeverity] = useState("mild");

    function calculateDose() {
        const med = Formulary[medication];
        if (!med) return 'Medication not found';
        let dose = 0;
        if (severity === 'mild') {
            dose = med.min_dose * weight;
        }
        else if (severity === 'moderate') {
            dose = med.med_dose * weight;
        }
        else if (severity === 'severe') {
            dose = med.max_dose * weight;
        }
        return dose > 0 ? `${dose}mg (${dose/med.wpml} mls)` : 'Invalid weight or severity';
    }

    return (
        <div className={styles.calculator}>
            <h1>Paediatric Medication Dose Calculator</h1>
            <form>
                <label>
                    Medication<br />
                    <select name="medication" id="medication" onChange={(e) => {setMedication(e.target.value)}}>
                        <option value="">Select a Medication</option>
                        <option value="paracetamol">Paracetamol</option>
                        <option value="ibuprofen">Ibuprofen</option>
                        <option value="amoxicillin/clavulanate">Amoxicillin/Clavulanate</option>
                        <option value="salbutamol">Salbutamol</option>
                        <option value="prednisolone">Prednisolone</option>
                        <option value="metronidazole">Metronidazole</option>
                        <option value="ceftriaxone">Ceftriaxone</option>
                        <option value="loratadine">Loratadine</option>
                        <option value="hydrocortisone">Hydrocortisone</option>
                        <option value="dexamethasone">Dexamethasone</option>
                        <option value="gentamicin">Gentamicin</option>
                    </select><br />
                </label>
                <label>
                    Weight (kg)<br />
                    <input type="number" name="weight" id="weight" placeholder="Enter weight in kg" onChange={(e) => {setWeight(e.target.value)}} />
                </label><br />
                <label>
                    Illness Severity<br />
                    <select name="severity" id="severity" onChange={(e) => {setSeverity(e.target.value)}}>
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                    </select>
                </label>
            </form>

            <p>{medication && weight ? `The recommended dose of ${medication} for this ${weight} kg child is ${calculateDose()}` : 'Please select a medication and enter the weight.'}</p>
            <p>Note: This is a basic calculator and does not replace professional medical advice.</p>
            <p>&copy; 2025 Chikeluba </p>
        </div>
    )
}