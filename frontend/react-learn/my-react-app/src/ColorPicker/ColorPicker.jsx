import { useState } from 'react';
import styles from './ColorPicker.module.css';

function ColorPicker(){
    const [color, setColor] = useState('#ffffff');

    return(
        <div className={styles.colorPicker}>
            <label htmlFor='colorPicker'>
                Select Background Color:
                <br />
                <input
                    type='color'
                    value={color}
                    onChange={
                        (e) => {
                            setColor(e.target.value);
                        }
                    }
                />
            </label>
        </div>
    );
}

export default ColorPicker;