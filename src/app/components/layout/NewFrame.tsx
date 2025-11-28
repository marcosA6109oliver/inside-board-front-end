import React, { useState, ChangeEvent } from 'react';
import Text from "@components/common/Text";
import Search from "@components/common/Search";
import SearchUser from "@components/common/SearchUser";
import Select from "@components/common/Select";
import Icon from "@components/common/Icon";
import Input from "@components/common/Input";
import AlertMessage from '@components/common/AlertMessage';


interface NewFrameProps {
    onClose: () => void;
}


const NewFrame: React.FC<NewFrameProps> = ({ onClose }) => {
    const [value, setValue] = useState('');

    const optionBucket = [
        { value: "Em backlog", label: "Em backlog" },
        { value: "May Martins ou Bea Souza", label: "May Martins ou Bea Souza" },
        { value: "Tech ihouse [Roberto e Vini]", label: "Tech ihouse [Roberto e Vini]" },
        { value: "Financeiro e compras plugin", label: "Financeiro e compras plugin" },
        { value: "Pautar para o HUB Tech", label: "Pautar para o HUB Tech" },
        { value: "Gabriel Silverio", label: "Gabriel Silverio" },
        { value: "Orlando Libardi", label: "Orlando Libardi" },
        { value: "Com o HUB Design", label: "Com o HUB Design" },
        { value: "Com as squads", label: "Com as squads" },
        { value: "Em aprovação", label: "Em aprovação" },
        { value: "Concluído", label: "Concluído" },
    ];

    const optionStatus = [
        { value: "Em criação ihouse", label: "Em criação ihouse" },
        { value: "Em aprovação mkt/negócio", label: "Em aprovação mkt/negócio" },
        { value: "Em backlog", label: "Em backlog" },
        { value: "Concluído", label: "Concluído" },
        { value: "Aguardando infos itaú", label: "Aguardando infos itaú" },
        { value: "Aguardando infos squad", label: "Aguardando infos squad" },
        { value: "Aguardando infos HUB", label: "Aguardando infos HUB" },
        { value: "Planejamento", label: "Planejamento" },
        { value: "Pautar", label: "Pautar" },
        { value: "Cancelado", label: "Cancelado" },
        { value: "Stand by", label: "Stand by" },
        { value: "Em produção/hub", label: "Em produção/hub" },
    ];

    const exemplo: string[] = [
        "Marcos",
        "Gabriel",
        "Orlando",
        "Mayara",
    ];


    const [links, setLinks] = useState<{ [key: string]: string }>({
        "Iu Flow": "",
        "Share Point": "",
        "Bynder": "",
        "Figma": ""
    });

    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info'; show: boolean }>({
        message: '',
        type: 'success',
        show: false
    });

    const handleLinkChange = (title: string, value: string) => {
        setLinks(prevLinks => ({
            ...prevLinks,
            [title]: value
        }));
    };

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value)
            .then(() => showAlert('Link copiado com sucesso!', 'success'))
            .catch(err => showAlert('Falha ao copiar link.', 'error'));
    };

    const openLinkInNewTab = (value: string) => {
        if (value) {
            window.open(value, '_blank');
            showAlert('Link aberto em nova aba!', 'info');
        } else {
            showAlert('Link vazio ou inválido.', 'error');
        }
    };

    const clearLink = (title: string) => {
        setLinks(prevLinks => ({
            ...prevLinks,
            [title]: ""
        }));
        showAlert('Link limpo com sucesso!', 'info');
    };

    const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
        setAlert({ message, type, show: true });
        setTimeout(() => setAlert(prevAlert => ({ ...prevAlert, show: false })), 3500);
    };


    return (
        <div id="createCardModal" className="modal open">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="row">
                        <div className="col-md-12">
                            <Text
                                tagType="h3"
                                className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold" >
                                BUCHET
                            </Text>
                            <Text tagType="h2" className="font-family-montserrat font-size-base font-weight-light mg-t-8">
                                SP161_Ihouse_IUKit
                            </Text>
                        </div>
                    </div>
                    <Text tagType="span" className="close" onClick={onClose}>
                        &times;
                    </Text>
                </div>

                <div className="modal-body">
                    <div className="row inputs-task">
                        <div className="col-md-12">
                            <SearchUser />
                        </div>
                        <div className="col-md-4">
                            <div className="input-container color-primary-dark-1 font-caption-large">
                                <Text
                                    tagType="label"
                                    className="input-label bg-primary-white"
                                >
                                    Bucket
                                </Text>
                                <Select
                                    className="font-caption-large"
                                    options={optionBucket}
                                    placeholder="Escolha uma opção"
                                    rightIcon={{
                                        className: "icon-select",
                                        children: "expand_more"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container color-primary-dark-1 font-caption-large">
                                <Text
                                    tagType="label"
                                    className="input-label bg-primary-white"
                                >
                                    Status da tarefa
                                </Text>
                                <Select
                                    className="font-caption-large"
                                    options={optionStatus}
                                    placeholder="Escolha uma opção"
                                    rightIcon={{
                                        className: "icon-select",
                                        children: "expand_more"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container color-primary-dark-1 font-caption-large">
                                <Text
                                    tagType="label"
                                    className="input-label bg-primary-white"
                                >
                                    Data da tarefa
                                </Text>
                                <Input
                                    className="my-input"
                                    placeholder="dd/mm/aaaa"
                                    isDateInput={true}
                                    leftIcon={{ children: "calendar_today", className: "icon-class", onClick: () => { } }}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="input-container font-caption-large font-family-helvetica">
                                <Text
                                    tagType="label"
                                    className="input-label bg-primary-white"
                                >
                                    Descrição da tarefa
                                </Text>
                                <Input
                                    type="text"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="row inputs-details mg-t-48">
                        <div className="col-md-12 mg-b-8">
                            <Text tagType="h3" className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold" >
                                DETALHES
                            </Text>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">
                                    CA/BM
                                </Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Time</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "timer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Esteira</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "queue", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Produto</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Owner</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">GD</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Supcia centro de custo</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Supcia demandante</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container search-container font-caption-large">
                                <Text tagType="label" className="input-label bg-primary-white">Dupla criativa</Text>
                                <Search
                                    data={exemplo}
                                    className=" font-caption-large font-family-helvetica"
                                    inputClassName="color-primary-gray-dark"
                                    resultsContainerClassName="bg-primary-white bd-w-1 bd-w-t-0 bd-color-primary-gray-light-2 zindex-dropdown position-absolute w-100 z-1"
                                    resultItemClassName="pd-y-8 pd-x-12 result-item"
                                    onResultSelect={(item) => console.log(`Selected: ${item}`)}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Job novo/Paraquedas</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Mochila Pauta</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Sprint</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Briefing/feedback aceito ou recusado</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Frentes</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Frente Marina</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Esforço</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Tamanho (P,M ou G)</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Participantes</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "local_offer", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text tagType="label" className="input-label bg-primary-white">Esforço</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row inputs-format mg-t-48">
                        <div className="col-md-12 mg-b-8">
                            <Text className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold" tagType="h3">
                                FORMATOS
                            </Text>
                        </div>
                        <div className="col-md-3">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Formato</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "material-symbols-outlined color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Tipo de entrega</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "material-symbols-outlined color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Qtda. total</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "format_list_numbered_rtl", className: "material-symbols-outlined color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Qtda. templati.</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "format_list_numbered_rtl", className: "material-symbols-outlined color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Versionamento</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "material-symbols-outlined color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Status</Text>
                                <Input
                                    type="text"
                                    leftIcon={{ children: "rtt", className: "material-symbols-outlined color-primary-gray-dark" }}
                                    className="input-icon"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Data entrada briefing</Text>
                                <Input
                                    className="my-input"
                                    placeholder="dd/mm/aaaa"
                                    isDateInput={true}
                                    leftIcon={{ children: "calendar_today", className: "icon-class", onClick: () => { } }}
                                />
                                <button className="clearDate btn pd-4 corner-4 bg-feedback-red color-primary-white font-small" style={{ display: 'none' }}>
                                    <Icon>close</Icon>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Data entrada</Text>
                                <Input
                                    className="my-input"
                                    placeholder="dd/mm/aaaa"
                                    isDateInput={true}
                                    leftIcon={{ children: "calendar_today", className: "icon-class", onClick: () => { } }}
                                />
                                <button className="clearDate btn pd-4 corner-4 bg-feedback-red color-primary-white font-small" style={{ display: 'none' }}>
                                    <Icon>close</Icon>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                <Text className="input-label bg-primary-white" tagType="label">Data saída</Text>
                                <Input
                                    className="my-input"
                                    placeholder="dd/mm/aaaa"
                                    isDateInput={true}
                                    leftIcon={{ children: "calendar_today", className: "icon-class", onClick: () => { } }}
                                />
                                <button className="clearDate btn pd-4 corner-4 bg-feedback-red color-primary-white font-small" style={{ display: 'none' }}>
                                    <Icon>close</Icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row inputs-qtd-segment mg-t-48">
                            <div className="col-md-12 mg-b-8">
                                <Text className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold" tagType="h3">
                                    QUANTIDADE POR SEGMENTOS
                                </Text>
                            </div>
                            {['IA', 'IU', 'IP', 'PJ', 'IBBA', 'Private/Asset/Diso', 'íon', 'outras', 'não correntistas'].map((segmento, i) => (
                                <div className="col-md-4" key={i}>
                                    <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                        <Text className="input-label bg-primary-white" tagType="label">Qtda. de peças {segmento}</Text>
                                        <Input
                                            type="text"
                                            leftIcon={{ children: "format_list_numbered_rtl", className: "material-symbols-outlined color-primary-gray-dark" }}
                                            className="input-icon"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row inputs-qtd-total mg-t-48">
                            <div className="col-md-12 mg-b-8">
                                <Text className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold" tagType="h3">
                                    QUANTIDADE TOTAL
                                </Text>
                            </div>
                            {[1, 2, 3, 4, 5].map(label => (
                                <div className={`col-md-${label < 4 ? 4 : 6}`} key={`total-${label}`}>
                                    <div className="input-container font-caption-large font-family-helvetica bg-primary-white">
                                        <Text className="input-label bg-primary-white" tagType="label">Label</Text>
                                        <Input
                                            type="text"
                                            leftIcon={{ children: "rtt", className: "material-symbols-outlined color-primary-gray-dark" }}
                                            className="input-icon"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="row inputs-links mg-t-48">
                            <div className="col-md-12 mg-b-8">
                                <Text className="font-family-montserrat font-size-caption-large color-secondary-blue font-weight-bold" tagType="h3">
                                    LINKS
                                </Text>
                            </div>
                            {Object.keys(links).map((linkTitle, index) => (
                                <div className="col-md-12" key={index}>
                                    <div className="input-container interactive font-caption-large font-family-helvetica bg-primary-white">
                                        <Text className="input-label bg-primary-white" tagType="label">URL {linkTitle}</Text>
                                        <Input
                                            type="text"
                                            leftIcon={{ children: "insert_link", className: "material-symbols-outlined color-primary-gray-dark" }}
                                            className="input-icon"
                                            value={links[linkTitle]}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(linkTitle, e.target.value)}
                                        />
                                        <div className="button-links gap-4 pd-r-12" style={{ display: links[linkTitle] ? 'inline-flex' : 'none' }}>
                                            <button
                                                className="copy-btn btn pd-4 corner-4 bg-feedback-green color-primary-white font-small"
                                                onClick={() => copyToClipboard(links[linkTitle])}
                                            >
                                                <Icon>content_paste</Icon>
                                            </button>
                                            <button
                                                className="link-btn btn pd-4 corner-4 bg-secondary-blue color-primary-white font-small"
                                                onClick={() => openLinkInNewTab(links[linkTitle])}
                                            >
                                                <Icon>link</Icon>
                                            </button>
                                            <button
                                                className="close-btn btn pd-4 corner-4 bg-feedback-red color-primary-white font-small"
                                                onClick={() => clearLink(linkTitle)}
                                            >
                                                <Icon>close</Icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}
export default NewFrame;