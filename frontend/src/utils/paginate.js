import _ from 'lodash'

// paginate data
export function paginate(itemsArray, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize
    return _(itemsArray)
    .slice(startIndex)
    .take(pageSize)
    .value()
   
}