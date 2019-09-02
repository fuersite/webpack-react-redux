export const ADD_COUNT = 'ADD_COUNT'
export const SUB_COUNT = 'SUB_COUNT'

/*
 * action 创建函数
 */

export function addCount(params) {
    return { type: ADD_COUNT, params }
}
  
export function subCount(params) {
    return { type: SUB_COUNT, params }
}