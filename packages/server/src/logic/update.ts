import { database } from "../database"



const todoSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have maxLength
        },
        name: {
            type: 'string'
        },
        done: {
            type: 'boolean'
        },
        timestamp: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['id', 'name', 'done', 'timestamp']
}

const update = () => {
    database.addCollections({
        todos: {
            schema: todoSchema
        }
    })
}
export { update }