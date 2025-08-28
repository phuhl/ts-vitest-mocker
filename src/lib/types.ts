import * as vitest from "vitest";
export type Class<T> = { new (...args: any[]): T };

type FunctionType = (...args: any[]) => any;
type FunctionReturnType<T> = T extends FunctionType ? ReturnType<T> : never;
type FunctionParametersType<T> = T extends FunctionType ? Parameters<T> : never;
type VitestMockType<T> = vitest.Mock<
  (...args: FunctionParametersType<T>) => FunctionReturnType<T>
>;

export type Mock<T> = T & {
  // all functions are converted to vitest.Mock with corresponding return type (generics passed to vitest.Mock)
  [P in keyof T as T[P] extends FunctionType ? P : never]: VitestMockType<T[P]>;
};

export { MockConfig, TsVitestMocker } from "./config";
