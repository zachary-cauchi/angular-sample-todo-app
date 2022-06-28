export interface Todo {
    id: number,
    dateCreated: Date,
    text: string,
    tags: string[],
    isComplete: boolean
}
