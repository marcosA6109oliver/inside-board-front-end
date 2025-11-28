import React from "react";
import Text from "@components/common/Text";
import Image from "@components/common/Image";

const Loading: React.FC = () => {
    return (
        <div className="loading">
            <div className="loading-container">
                <Image
                    src="./src/assets/img/figmails-loading-1.svg"
                    alt="Logo Inside Board"
                    width="48"
                    className="img"
                />
                <Text
                    tagType="p"
                    className="color-primary-white pd-t-16">
                    Aguarde, carregando...
                </Text>
            </div>
        </div>
    );
}

export default Loading;