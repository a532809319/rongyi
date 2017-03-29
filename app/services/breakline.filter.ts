
export function BreaklineFilter(str: String) {
    console.log("------------BreaklineFilter ");
    return str == null ? "" : str.replace("\r\n", "<br/>");
}