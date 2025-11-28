import React from 'react';
import Input from '@components/common/Input';
import Text from '@components/common/Text';

interface FilterOptionProps {
    id: string;
    label: string;
}

const FilterOption: React.FC<FilterOptionProps> = ({ id, label }) => (
    <div className="filter-option">
        <div className="switch">
            {/* Componente Input deve seguir a estrutura HTML correta */}
            <input
                type="checkbox"
                id={id}
                className="switch-input"
            />
            <label
                htmlFor={id}
                className="switch-label">
                <span className="switch-slider"></span>
            </label>
        </div>
        <Text tagType="label" className="font-caption-large" htmlFor={id}>
            {label}
        </Text>
    </div>
);

const FilterView: React.FC = () => {
    return (
        <div className="filter-dropdown">
            <FilterOption id="filterBMEN" label="BM/EN" />
            <FilterOption id="filterTime" label="Time" />
            <FilterOption id="filterEsteira" label="Esteira" />
            <FilterOption id="filterProduto" label="Produto" />
            <FilterOption id="filterOwner" label="Owner" />
            <FilterOption id="filterGD" label="GD" />
            <FilterOption id="filterPrioridade" label="Prioridade" />
            <FilterOption id="filterDuplaCriativa" label="Dupla Criativa" />
            <FilterOption id="filterJobNovo" label="Job Novo / Paraquedas" />
            <FilterOption id="filterMochilaPauta" label="Mochila Pauta" />
        </div>
    );
};

export default FilterView;