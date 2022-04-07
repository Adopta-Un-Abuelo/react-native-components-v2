import * as React from "react";
import { Theme, THEMES } from "./Themes";
import Rings from "./Rings";
import PieFactory from "./PieFactory";
import { Svg, G } from "react-native-svg";
import { View, StyleSheet } from "react-native";
import styled from 'styled-components/native';

const BackgroundContainer = styled.View`
    position: absolute;
    flex: 1;
    border-radius: 100px;
    height: 100%;
    width: 100%;
    padding: 16px;
    align-items: center;
    justify-content: center;
`
const Background = styled.View`
    align-items: center;
    justify-content: center;
`

export type ProgressRingsData = ProgressRingData[];
export type ProgressRingData = {
    value: number;
    label?: string;
    color?: string;
    backgroundColor?: string;
};

export type ProgressRingConfig = {
    width: number;
    height: number;
    radius?: number;
    ringSize?: number;
};

type ProgressRingProps = {
    data: ProgressRingData[];
    config: ProgressRingConfig;
    theme?: Theme;
    children?: any;
};

const defaultCfg: ProgressRingConfig = {
    width: 150,
    height: 150,
    ringSize: 14,
    radius: 32
};

const ProgressRingBase = ({ data, config, theme, children }: ProgressRingProps) => {
    const cfg: ProgressRingConfig = { ...defaultCfg, ...config };
    const backPie = PieFactory.create(data, cfg.height, cfg.radius, [0.999, 0.001]);
    const frontPie = PieFactory.create(data, cfg.height, cfg.radius);
    const selectedTheme = THEMES[theme || "dark"];

    return (
        <View style={styles.layout}>
            <View style={{ width: cfg.width, height: cfg.height }}>
                <Svg width={cfg.width} height={cfg.height}>
                    <G x={cfg.width / 2} y={cfg.height / 2}>
                        <Rings size={cfg.ringSize} pie={backPie} data={data} theme={selectedTheme} opacity={true} />
                        <Rings size={cfg.ringSize} pie={frontPie} data={data} theme={selectedTheme} opacity={false} />
                    </G>
                </Svg>
            </View>
            <BackgroundContainer>
                <Background>
                    {children}
                </Background>
            </BackgroundContainer>
        </View>
    );
};

ProgressRingBase.defaultProps = {
    data: [],
    theme: "dark"
};

const styles = StyleSheet.create({
    layout: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

const ProgressRing = React.memo(ProgressRingBase);
export default ProgressRing;