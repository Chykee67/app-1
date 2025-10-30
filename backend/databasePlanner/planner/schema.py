import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Item, Card

class ItemNode(DjangoObjectType):
    class Meta:
        model = Item
        filter_fields = {
            'title': ['exact', 'icontains'],
            'card__title': ['exact', 'icontains'],
        }
        interfaces = (graphene.relay.Node,)

class CardNode(DjangoObjectType):
    class Meta:
        model = Card
        filter_fields = {
            'title': ['exact', 'icontains'],
        }
        interfaces = (graphene.relay.Node,)

class CreateItem(graphene.relay.ClientIDMutation):
    item = graphene.Field(ItemNode)

    class Input:
        title = graphene.String(required=True)
        card = graphene.String(required=True)

    def mutate_and_get_payload(root, info, **input):
        try:
            item = Item.objects.get(title=input.get("title"), card__title=input.get("card"))
            raise Exception(f"{item.title} already exists!")
        except Item.DoesNotExist:
            item = Item(
                title = input.get('title'),
                card = Card.objects.get(title=input.get('card'))
            )
            item.save()
            return CreateItem(item=item)
    
class DeleteItem(graphene.relay.ClientIDMutation):
    deleted = graphene.String()

    class Input:
        title = graphene.String(required=True)
        card = graphene.String(required=True)

    def mutate_and_get_payload(root, info, **input):
        try:
            item = Item.objects.get(title=input.get("title"), card__title=input.get("card"))
        except Item.DoesNotExist:
            raise Exception("No such item!")
        else:
            item.delete()
        return DeleteItem(deleted="deleted")
    
class CreateCard(graphene.relay.ClientIDMutation):

    card = graphene.Field(CardNode)

    class Input:
        title = graphene.String(required=True)

    def mutate_and_get_payload(root, info, **input):
        card = Card(
            title=input.get('title')
        )
        card.save()
        return CreateCard(card=card)
    
class DeleteCard(graphene.relay.ClientIDMutation):
    deleted = graphene.String()

    class Input:
        title = graphene.String(required=True)

    def mutate_and_get_payload(root, info, **input):
        try:
            card = Card.objects.get(title=input.get("title"))
        except Card.DoesNotExist:
            raise Exception("No such card!")
        else:
            card.delete()
        return DeleteCard(deleted="deleted")

    
class Mutation(graphene.ObjectType):
    create_card = CreateCard.Field()
    delete_card = DeleteCard.Field()
    create_item = CreateItem.Field()
    delete_item = DeleteItem.Field()


class Query(graphene.ObjectType):
    all_cards = DjangoFilterConnectionField(CardNode)
    all_items = DjangoFilterConnectionField(ItemNode)

    
    def resolve_all_cards(self, info, **kwargs):
        try:
            all_cards = Card.objects.all()
        except Card.DoesNotExist:
            return Card.objects.none()
        else:
            return all_cards

    def resolve_all_items(self, info, **kwargs):
        try:
            all_items = Item.objects.all()
        except Item.DoesNotExist:
            return Item.objects.none()
        else:
            return all_items