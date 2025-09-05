import graphene
import graphql_jwt

from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Profile

User = get_user_model()


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            'username': ['exact', 'icontains'],
            'email': ['exact', 'icontains'],
            'first_name': ['exact', 'icontains'],
            'last_name': ['exact', 'icontains'],
        }
        interfaces = (graphene.relay.Node,)

class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = ('user', 'bio')

class CreateUser(graphene.relay.ClientIDMutation):
    
    user = graphene.Field(UserNode)
    profile = graphene.Field(ProfileType)

    class Input:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        bio = graphene.String()

    def mutate_and_get_payload(root, info, **input):
        user = User.objects.create_user(
            username=input.get('username'),
            email=input.get('email'),
            password=input.get('password'),
            first_name=input.get('first_name', ''),
            last_name=input.get('last_name', ''),
        )

        profile = Profile(
            user=user,
            bio=input.get('bio', ''),
        )
        profile.save()

        return CreateUser(user=user, profile=profile)


class Query(graphene.ObjectType):
    user_detail = graphene.relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)
    profile_by_username = graphene.Field(ProfileType, username=graphene.String(required=True))

    def resolve_user_detail(root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        return User.objects.get(id=user.id)
    
    def resolve_all_users(root, info, **kwargs):
        user = info.context.user
        if not user.is_superuser:
            raise Exception("Restricted access")
        return User.objects.all()
    
    def resolve_profile_by_username(root, info, username):
        try:
            return Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            return None


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    revoke_token = graphql_jwt.relay.Revoke.Field()
    delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()
    delete_refresh_token_cookie = graphql_jwt.relay.DeleteRefreshTokenCookie.Field()
    create_user = CreateUser.Field()


schema = graphene.Schema(mutation=Mutation, query=Query)