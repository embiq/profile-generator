class SerializerMixin:
    default_serializer_class = None
    serializer_classes = {}

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, self.default_serializer_class)
