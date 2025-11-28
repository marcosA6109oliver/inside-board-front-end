import React, { useEffect, useRef } from 'react';
import Text from '@components/common/Text';
import CheckboxOption from '@components/common/CheckboxOption'; // Certifique-se de que o caminho está correto

interface ExportDadosProps {
    onClose: () => void; // Função para fechar o modal
}

const ExportDados: React.FC<ExportDadosProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscPress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscPress);
        };
    }, [onClose]);

    return (
        <div id="exportModal" className="modal">
            <div className="modal-content" ref={modalRef}>
                <div className="modal-header">
                    <Text tagType="span" className="close" onClick={onClose}>
                        &times;
                    </Text>
                    <Text
                        tagType="h3"
                        className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold"
                    >
                        Endomarketing
                    </Text>
                    <Text tagType="p" className="mg-t-8">Exportar dados do Board</Text>
                </div>
                <div className="modal-body">
                    <div className="checkbox-grid mg-t-16 pd-t-24">
                        <CheckboxOption id="checkbox0" label="Janeiro" monthIndex={0} />
                        <CheckboxOption id="checkbox1" label="Fevereiro" monthIndex={1} />
                        <CheckboxOption id="checkbox2" label="Março" monthIndex={2} />
                        <CheckboxOption id="checkbox3" label="Abril" monthIndex={3} />
                        <CheckboxOption id="checkbox4" label="Maio" monthIndex={4} />
                        <CheckboxOption id="checkbox5" label="Junho" monthIndex={5} />
                        <CheckboxOption id="checkbox6" label="Julho" monthIndex={6} />
                        <CheckboxOption id="checkbox7" label="Agosto" monthIndex={7} />
                        <CheckboxOption id="checkbox8" label="Setembro" monthIndex={8} />
                        <CheckboxOption id="checkbox9" label="Outubro" monthIndex={9} />
                        <CheckboxOption id="checkbox10" label="Novembro" monthIndex={10} />
                        <CheckboxOption id="checkbox11" label="Dezembro" monthIndex={11} />
                        <button type="button" className="btn btn-prima mg-t-16" id="exportDataBtn">
                            Exportar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportDados;