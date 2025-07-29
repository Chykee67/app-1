import graphene

import todo.schema
import account.schema

class Query(account.schema.Query, todo.schema.Query, graphene.ObjectType):
    # You can add more queries here if needed
    pass

class Mutation(account.schema.Mutation, todo.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)