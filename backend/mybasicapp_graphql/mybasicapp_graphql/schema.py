import graphene

import todo.schema

class Query(todo.schema.Query, graphene.ObjectType):
    # You can add more queries here if needed
    pass

class Mutation(todo.schema.Mutation, graphene.ObjectType):
    # You can add more mutations here if needed
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)