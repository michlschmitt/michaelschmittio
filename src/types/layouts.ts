// layouts

export type SectionColorType =
  | 'gradient-horizontal'
  | 'black'
  | 'green'
  | 'gradient'
  | 'grey1'
  | 'grey2'
  | 'primary'
  | 'secondary'
  | 'white';

export enum SectionColorEnum {
  black = 'black',
  gradient = 'gradient',
  gradientHorizontal = 'gradient-horizontal',
  green = 'green',
  grey1 = 'grey1',
  grey2 = 'grey2',
  primary = 'primary',
  secondary = 'secondary',
}

export type SectionPaddingType = 'none' | 'small' | 'medium' | 'large';

export enum SectionPaddingEnum {
  none = 'none',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type RowWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';

export enum RowWrapEnum {
  nowrap = 'nowrap',
  wrap = 'wrap',
  wrapReverse = 'wrap-reverse',
}

export type GridDisplayType =
  | 'flex'
  | 'block'
  | 'grid'
  | 'inline'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid';

export enum GridDisplayEnum {
  flex = 'flex',
  block = 'block',
  grid = 'grid',
  inline = 'inline',
  inlineBlock = 'inline-block',
  inlineFlex = 'inline-flex',
  inlineGrid = 'inline-grid',
}

export type RowJustifyType =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export enum RowJustifyEnum {
  flexStart = 'flex-start',
  center = 'center',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

export type GridDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export enum GridDirectionEnum {
  row = 'row',
  rowReverse = 'row-reverse',
  column = 'column',
  columnReverse = 'column-reverse',
}

export type RowAlignItemsType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export enum RowAlignItemsEnum {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  stretch = 'stretch',
  baseline = 'baseline',
}

export type GridAlignContentType =
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export enum GridAlignContentEnum {
  stretch = 'stretch',
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
}

export type ColSpanType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ColOffsetType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
