export default interface ISorters<T> {
  property: keyof T;
  isDescending: boolean;
}
