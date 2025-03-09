import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={120}
    height={120}
    viewBox="0 0 32 32"
    {...props}>
    <G fill="none" stroke="#555555" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={2}>
      <Circle cx={16} cy={16} r={15} />
      <Path d="M26 27c0-5.523-4.477-10-10-10S6 21.477 6 27" />
      <Circle cx={16} cy={11} r={6} />
    </G>
  </Svg>
);
export default SvgComponent;
