import React from "react";
import Text from "@components/common/Text";

const Logo: React.FC = () => {
    return (
        <div className="logo">
            <Text
                tagType="h1"
                className="font-caption-large d-block d-lg-flex lh-lg"
            >
                <Text
                    tagType="span"
                    className="font-size-title-small logo-text">Hub de Tech</Text>

                <Text
                    tagType="span"
                    className="traco d-none d-lg-block" />
                <br className="d-block d-lg-none" />

                <Text
                    tagType="span"
                    className="font-size-small logo-text"
                >
                    Inside Board
                </Text>
            </Text>
        </div>
    );
}

export default Logo;