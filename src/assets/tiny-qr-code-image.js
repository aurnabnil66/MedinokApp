import * as React from 'react';
import Svg, { Path, Mask, Defs, Pattern, Use, Image } from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={61}
    height={61}
    fill="none"
    {...props}>
    <Path fill="url(#a)" d="M5.57 5.168h50.076v50.167H5.57z" />
    <Mask id="b" fill="#fff">
      <Path d="M.555 5.148a5 5 0 0 1 5-5h7.257a5 5 0 0 1 5 5v7.289a5 5 0 0 1-5 5H5.555a5 5 0 0 1-5-5V5.148Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M-4.445 5.148c0-5.522 4.477-10 10-10H7.81c5.523 0 10 4.478 10 10H-4.445ZM17.81 17.437H.555 17.81Zm-12.256 0c-5.523 0-10-4.478-10-10V5.148c0-5.522 4.477-10 10-10v22.289ZM17.81.148v17.289V.148Z"
      mask="url(#b)"
    />
    <Mask id="c" fill="#fff">
      <Path d="M60.445 5.148a5 5 0 0 0-5-5h-7.257a5 5 0 0 0-5 5v7.289a5 5 0 0 0 5 5h7.257a5 5 0 0 0 5-5V5.148Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M65.445 5.148c0-5.522-4.477-10-10-10h-2.257c-5.522 0-10 4.478-10 10H65.445ZM43.19 17.437h17.256-17.257Zm12.256 0c5.523 0 10-4.478 10-10V5.148c0-5.522-4.477-10-10-10v22.289ZM43.188.148v17.289V.148Z"
      mask="url(#c)"
    />
    <Mask id="d" fill="#fff">
      <Path d="M.555 55.148a5 5 0 0 0 5 5h7.257a5 5 0 0 0 5-5V47.86a5 5 0 0 0-5-5H5.555a5 5 0 0 0-5 5v7.288Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M-4.445 55.148c0 5.523 4.477 10 10 10H7.81c5.523 0 10-4.477 10-10H-4.445ZM17.81 42.86H.555 17.81Zm-12.256 0c-5.523 0-10 4.477-10 10v2.288c0 5.523 4.477 10 10 10V42.86ZM17.81 60.148V42.86v17.288Z"
      mask="url(#d)"
    />
    <Mask id="e" fill="#fff">
      <Path d="M60.445 55.148a5 5 0 0 1-5 5h-7.257a5 5 0 0 1-5-5V47.86a5 5 0 0 1 5-5h7.257a5 5 0 0 1 5 5v7.288Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M65.445 55.148c0 5.523-4.477 10-10 10h-2.257c-5.522 0-10-4.477-10-10H65.445ZM43.19 42.86h17.256-17.257Zm12.256 0c5.523 0 10 4.477 10 10v2.288c0 5.523-4.477 10-10 10V42.86ZM43.188 60.148V42.86v17.288Z"
      mask="url(#e)"
    />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#f" transform="matrix(.01252 0 0 .0125 0 0)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABW0lEQVR4nO2XQQ7CMAwE/f9PL2c4tIrWdkwyI+UENM5onZoIADgMFa9f3j5f/X53/dsLEAIDgSQw6lrYRWaLZrd4df3bCxACv0GgiUjgsxCZY0r1GPP2eXZ97QUIgYFAEhjntrCKW/z4O1AIDASSwMhr4VU07ErIrn97AULgMwg00e0JzF7dB66uf3sBQmAgkARGXgt3o8UCxx+oGyHQA4Em1wnMHnRVPOZk12uDQBMEmiBw+F85DVvLIDAQKBIY21t37NhSPYd177e9ICEwEEgCC1s4ewMl32nTf7+9ICHwGwSSwFlo8S0+bs7bjRDogUCT4wSqeL2RLWx1PxsEmiDQBIEm2XeCmi/93QFAYCAwSODJLVw9p2nYHVy+oRCIQJHAi1tYzQcs3w+BgcAnSOC/C5z2PJmDcPtLZNrzhMA1EHibwOy1SvoBq/dDYCDQgQSadF8ZAAAQl/IBVaeW6KBN/J8AAAAASUVORK5CYII="
        id="f"
        width={80}
        height={80}
      />
    </Defs>
  </Svg>
);
export default SvgComponent;
