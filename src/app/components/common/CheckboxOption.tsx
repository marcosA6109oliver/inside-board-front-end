import React from 'react';
import Text from '@components/common/Text';

interface CheckboxOptionProps {
    id: string;
    label: string;
    monthIndex: number;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ id, label, monthIndex }) => {
    const currentMonthIndex = new Date().getMonth();
    const isFutureMonth = monthIndex > currentMonthIndex;

    return (
        <div className={`checkbox-container ${isFutureMonth ? 'disabled' : ''}`}>
            <input
                type="checkbox"
                id={id}
                className="custom-checkbox"
                disabled={isFutureMonth}
            />
            <Text tagType="label" htmlFor={id} className="checkbox-label font-caption-large">
                {label}
            </Text>
        </div>
    );
};

export default CheckboxOption;