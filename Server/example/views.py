from rest_framework import viewsets
from example.serializers import ExampleSerializer
from example.models import Example



# class StandardResultsSetPagination(PageNumberPagination):
#     page_size_query_param = 'page_size'
#     max_page_size = 8


# class NumberInFilter(BaseInFilter, NumberFilter):
#     pass


# class ProductFilter(FilterSet):
#     id__in = NumberInFilter(name='id', lookup_expr='in')
#     name__startswith = CharFilter(name='name', lookup_expr='startswith')
#     price__lt = NumberFilter(name='price', lookup_expr='lt')

#     class Meta:
#         model = Example
#         fields = '__all__'


class ApiExampleListView(viewsets.ModelViewSet):
    '''
    retrieve:
        Vráti konkrétny záznam.

    list:
        Toto bude prepísané (existuje metoda create s dokumentáciou).

    create:
        Vytvorí nový záznam.

    delete:
        Vymaže konkrétny záznam.

    partial_update:
        Aktualizuje jeden alebo viac hodnôt v danom zázname.

    update:
        Aktualizuje záznam.
    '''

    # http_method_names = ['get', 'put', 'patch', 'head', 'options', 'post']
    serializer_class = ExampleSerializer
    model = Example
    # filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # pagination_class = StandardResultsSetPagination     # ?page_size=3
    # ordering_fields = ('id', 'name', 'code', 'price')   # ?ordering=-id,name
    # ordering = ('id',)                                  # default ordering
    # filter_class = ProductFilter                        # ?id__in=1,2,3,4
                                                        # ?base=True, ?price=1000
    # search_fields = ('name', '^code')                   # ?search=e
    # queryset = Example.objects.all()

    def get_queryset(self, *args, **kwargs):
        return Example.objects.all()

   
       