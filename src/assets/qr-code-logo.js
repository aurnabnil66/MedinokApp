import * as React from 'react';
import Svg, { Path, Mask, Defs, Pattern, Use, Image } from 'react-native-svg';
const QrCodeLogo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={225}
    height={228}
    fill="none"
    {...props}>
    <Path fill="url(#a)" d="M0 10h224.916v217.391H0z" />
    <Mask id="b" fill="#fff">
      <Path d="M0 5a5 5 0 0 1 5-5h54.83a5 5 0 0 1 5 5v55.407a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M-5 5C-5-.523-.523-5 5-5h49.83c5.523 0 10 4.477 10 10H-5Zm69.83 60.407H0h64.83Zm-59.83 0c-5.523 0-10-4.477-10-10V5C-5-.523-.523-5 5-5v70.407ZM64.83 0v65.407V0Z"
      mask="url(#b)"
    />
    <Mask id="c" fill="#fff">
      <Path d="M225 5a5 5 0 0 0-5-5h-54.831a5 5 0 0 0-5 5v55.407a5 5 0 0 0 5 5H220a5 5 0 0 0 5-5V5Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M230 5c0-5.523-4.477-10-10-10h-49.831c-5.522 0-10 4.477-10 10H230Zm-69.831 60.407H225h-64.831Zm59.831 0c5.523 0 10-4.477 10-10V5c0-5.523-4.477-10-10-10v70.407ZM160.169 0v65.407V0Z"
      mask="url(#c)"
    />
    <Mask id="d" fill="#fff">
      <Path d="M0 222a5 5 0 0 0 5 5h54.83a5 5 0 0 0 5-5v-55.407a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5V222Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M-5 222c0 5.523 4.477 10 10 10h49.83c5.523 0 10-4.477 10-10H-5Zm69.83-60.407H0h64.83Zm-59.83 0c-5.523 0-10 4.477-10 10V222c0 5.523 4.477 10 10 10v-70.407ZM64.83 227v-65.407V227Z"
      mask="url(#d)"
    />
    <Mask id="e" fill="#fff">
      <Path d="M225 222a5 5 0 0 1-5 5h-54.831a5 5 0 0 1-5-5v-55.407a5 5 0 0 1 5-5H220a5 5 0 0 1 5 5V222Z" />
    </Mask>
    <Path
      fill="#007AFF"
      d="M230 222c0 5.523-4.477 10-10 10h-49.831c-5.522 0-10-4.477-10-10H230Zm-69.831-60.407H225h-64.831Zm59.831 0c5.523 0 10 4.477 10 10V222c0 5.523-4.477 10-10 10v-70.407ZM160.169 227v-65.407V227Z"
      mask="url(#e)"
    />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#f" transform="matrix(.0125 0 0 .01293 0 -.017)" />
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
export default QrCodeLogo;
