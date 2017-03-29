

export const DATA: string = "DATA";
export function IntentParamModel<T>(param: T) {
    return { DATA: param };
}
