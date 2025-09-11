import graphene
import graphql_jwt

from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from graphene_file_upload.scalars import Upload

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
        fields = ('user', 'bio', 'avatar')

    avatar_url = graphene.String()

    def resolve_avatar_url(self, info):
        if self.avatar and hasattr(self.avatar, 'url'):
            return info.context.build_absolute_uri(self.avatar.url)
        return None


class Query(graphene.ObjectType):
    user_detail = graphene.relay.Node.Field(UserNode)

    all_users = DjangoFilterConnectionField(UserNode)

    profile = graphene.Field(ProfileType)

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
    
    def resolve_profile(root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        try:
            return Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise Exception("Profile not found")
        

class UploadMutation(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    success = graphene.Boolean()

    def mutate(self, info, file, **kwargs):
        user = info.context.user

        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        
        user.profile.avatar.save(file.name, file, save=True)

        return UploadMutation(success=True)

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


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    revoke_token = graphql_jwt.relay.Revoke.Field()
    delete_token_cookie = graphql_jwt.relay.DeleteJSONWebTokenCookie.Field()
    delete_refresh_token_cookie = graphql_jwt.relay.DeleteRefreshTokenCookie.Field()
    create_user = CreateUser.Field()
    upload_file = UploadMutation.Field()


schema = graphene.Schema(mutation=Mutation, query=Query)