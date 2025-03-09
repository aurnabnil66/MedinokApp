export interface IPrescriptionType {
  ImageFile: ImageFile[];
}

export interface ImageFile {
  originalPath: string;
  type: string;
  height: number;
  width: number;
  fileName: string;
  fileSize: number;
  uri: string;
}

export interface IImageAssets {
  assets: ImageFile[];
}
