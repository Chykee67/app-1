import graphene
import planner.schema

class Query(planner.schema.Query, graphene.ObjectType):
    # You can add more queries here if needed
    pass

class Mutation(planner.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)