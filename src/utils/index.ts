export const Objectify = (target: any) => {
    return JSON.parse(JSON.stringify(target))
}
